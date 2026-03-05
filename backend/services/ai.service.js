import fetch from "node-fetch";

// Helper for listing models via HTTP
async function listModels(apiVersion = "v1") {
  const url = `https://generativelanguage.googleapis.com/${apiVersion}/models?key=${process.env.GEMINI_API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to list models (${apiVersion}): ${res.status} ${text}`);
  }
  return res.json();
}

export const generateAIResponse = async (patientData) => {
  try {
    // fetch available models. prefer stable v1, fall back to v1beta if necessary
    let modelList;
    let apiVersion = "v1";
    try {
      modelList = await listModels("v1");
    } catch (err) {
      apiVersion = "v1beta";
      modelList = await listModels(apiVersion);
    }

    console.log(`Available models (${apiVersion}):`, JSON.stringify(modelList, null, 2));

    const geminiEntry = (modelList.models || []).find((m) =>
      m.name.toLowerCase().includes("gemini")
    );
    if (!geminiEntry) {
      throw new Error("No Gemini model found in available models");
    }

    const chosenModel = geminiEntry.name; // e.g. "models/gemini-1.0"

    const prompt = `You are a clinical discharge summary assistant. Generate a comprehensive discharge summary based on the patient data provided.

PATIENT DATA:
${JSON.stringify(patientData, null, 2)}

Generate ONLY a valid JSON object (no markdown, no code blocks, no explanation) with the following structure and content:

{
  "patientInfo": {
    "age": <number>,
    "gender": <string>,
    "admission_date": "<date>",
    "discharge_date": "<date>"
  },
  "primaryDiagnosis": "<main diagnosis>",
  "secondaryDiagnoses": ["<diagnosis1>", "<diagnosis2>"],
  "vitals": {
    "bloodPressure": "<value>",
    "heartRate": <number>,
    "temperature": "<value>",
    "respiratoryRate": <number>,
    "oxygenSaturation": "<value>"
  },
  "labResults": {
    "<test_name>": "<value with unit>"
  },
  "hospitalCourse": "<detailed summary of hospital stay and treatment>",
  "clinicalFindings": "<key clinical observations and assessments>",
  "medicationsOnDischarge": ["<medication with dose and frequency>"],
  "followUpInstructions": [
    "<instruction 1 - specific appointment or action>",
    "<instruction 2 - medication management>",
    "<instruction 3 - symptom monitoring>",
    "<instruction 4 - lifestyle recommendations>"
  ],
  "warningSignsToWatch": ["<sign/symptom>", "<sign/symptom>"],
  "dietaryRecommendations": "<specific diet instructions>",
  "activityRestrictions": "<what patient should avoid>",
  "nextAppointment": "<when and with whom>"
}

Generate detailed, clinically appropriate content for every field based on the patient data. Make followUpInstructions specific and actionable.`;

    const generateUrl = `https://generativelanguage.googleapis.com/${apiVersion}/${chosenModel}:generateContent?key=${process.env.GEMINI_API_KEY}`;
    const generateBody = {
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        maxOutputTokens: 4000,
        temperature: 0,
      },
    };

    const genRes = await fetch(generateUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(generateBody),
    });

    if (!genRes.ok) {
      const text = await genRes.text();
      throw new Error(`generation failed: ${genRes.status} ${text}`);
    }

    const genJson = await genRes.json();
    let text = genJson?.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!text) {
      throw new Error("No text content in Gemini response");
    }
    
    console.log("====== RAW RESPONSE ======");
    console.log(text);
    console.log("====== END RAW RESPONSE ======");
    
    // Remove markdown if present
    text = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    
    // Extract the first valid JSON object
    const firstBrace = text.indexOf("{");
    const lastBrace = text.lastIndexOf("}");
    
    if (firstBrace === -1 || lastBrace === -1) {
      throw new Error("No JSON object found in response");
    }
    
    text = text.substring(firstBrace, lastBrace + 1).trim();
    
    console.log("====== EXTRACTED JSON ======");
    console.log(text);
    console.log("====== END EXTRACTED JSON ======");
    
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (parseErr) {
      console.error("JSON parse error:", parseErr.message);
      console.error("Attempting character-by-character fix...");
      
      // Remove any characters that might be breaking JSON
      let fixed = text
        .replace(/[\n\r\t]/g, " ")           // Replace whitespace with space
        .replace(/  +/g, " ")                // Collapse multiple spaces
        .replace(/,(\s*})/g, "$1")           // Remove trailing commas
        .replace(/,(\s*])/g, "$1")           // Remove trailing commas in arrays
        .replace(/:\s*'/g, ':\"')            // Fix single quotes to double quotes
        .replace(/'\s*,/g, '\",')            // Fix single quotes in values
        .replace(/'\s*}/g, '\"}')            // Fix single quotes at end
        .trim();
      
      console.log("====== FIXED JSON ======");
      console.log(fixed);
      console.log("====== END FIXED JSON ======");
      
      try {
        parsed = JSON.parse(fixed);
      } catch (finalErr) {
        console.error("Final parse failed:", finalErr.message);
        console.error("First 300 chars of text:", text.substring(0, 300));
        throw new Error(`Cannot parse Gemini response as JSON: ${finalErr.message}`);
      }
    }
    
    return parsed;
  } catch (error) {
    console.error("Gemini Error: ", error);
    throw error;
  }
};
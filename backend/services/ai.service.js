import { InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import { bedrockClient } from "../config/aws.config.js";

export const generateAIResponse = async (patientData) => {
  // Minimal prompt (very low token usage)
  const prompt = `
You are a clinical documentation assistant.

Patient:
Age: ${patientData.age}
Diagnosis: ${patientData.diagnosis}
BNP: ${patientData.bnp}

Return strictly valid JSON in this format:
{
  "summary": ""
}
`;

  const command = new InvokeModelCommand({
    modelId: "anthropic.claude-3-haiku-20240307-v1:0",
    contentType: "application/json",
    accept: "application/json",
    body: JSON.stringify({
      anthropic_version: "bedrock-2023-05-31",
      max_tokens: 200,     // very low
      temperature: 0.2,
      messages: [
        {
          role: "user",
          content: prompt
        }
      ]
    })
  });

  const response = await bedrockClient.send(command);

  const result = JSON.parse(
    new TextDecoder().decode(response.body)
  );

  const outputText = result.content[0].text;

  try {
    return JSON.parse(outputText);
  } catch (err) {
    throw new Error("Model did not return valid JSON");
  }
};
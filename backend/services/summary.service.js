export const generateSummary = async (patientData) => {

  // For now we ignore patientData
  // This will later be replaced with RAG + LLM

  return {
    clinicianSummary: {
      primaryDiagnosis: {
        text: "Acute decompensated heart failure (HFrEF).",
        citations: ["HF-01"]
      },
      hospitalCourse: {
        text: "Patient admitted with worsening dyspnea and edema.",
        citations: ["HF-02"]
      },
      medicationChanges: [
        {
          text: "Initiated Spironolactone 25mg daily",
          citations: ["HF-03"]
        }
      ],
      followUpPlan: {
        text: "HF clinic visit in 7 days. BMP test in 3 days.",
        citations: ["HF-04"]
      },
      uncertainty: "BNP trend requires further monitoring."
    },
    patientPlan: {
      whatHappened: "Your heart was not pumping effectively.",
      medications: [
        "Take Spironolactone 25mg every morning."
      ],
      warningSigns: [
        "Shortness of breath",
        "Sudden weight gain"
      ],
      followUpDate: "Clinic visit in 7 days."
    },
    confidenceScore: 0.92,
    generatedAt: new Date().toISOString()
  };
};

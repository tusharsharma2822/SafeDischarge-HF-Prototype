export const validateResponse = (data) => {
    if(!data.clinicianSummary || !data.patientPlan) {
        throw new Error("Invalid AI response structure");
    }

    if(!data.confidenceScore) {
        data.confidenceScore = 0.8;
    }

    return data;
};
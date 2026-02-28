import { generateAIResponse } from "../services/ai.service.js";
import { validateResponse } from "../services/validation.service.js";

export const generateSummaryController = async (req, res, next) => {
    try{
        const { patientData } = req.body;
        
        if(!patientData){
            return res.status(400).json({ error: "PatientData required"});
        }

        //const aiResult = await generateAIResponse(patientData);
        //const validated = validateResponse(aiResult);

        //res.json(validated);

        return res.json({
  clinicianSummary: {
    primaryDiagnosis: { text: "Acute Heart Failure", citations: [] },
    hospitalCourse: { text: "Patient stabilized with IV diuretics.", citations: [] },
    medicationChanges: ["Started Sacubitril/Valsartan"],
    followUpPlan: { text: "Follow up in 7 days.", citations: [] }
  },
  confidenceScore: "High"
});

    }catch(error){
        next(error)
    }
};
import { generateAIResponse } from "../services/ai.service.js";
import { validateResponse } from "../services/validation.service.js";

export const generateSummaryController = async (req, res, next) => {
    try{
        const { patientData } = req.body;
        
        if(!patientData){
            return res.status(400).json({ error: "PatientData required"});
        }

        const aiResult = await generateAIResponse(patientData);
        const validated = validateResponse(aiResult);

        res.json(validated);

    }catch(error){
        next(error)
    }
};
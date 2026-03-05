import { generateAIResponse } from "../services/ai.service.js";

export const generateSummaryController = async (req, res, next) => {
    try {

        const { patientData } = req.body;

        if(!patientData){
            return res.status(400).json({ error: "PatientData required"})
        }

        const result = await generateAIResponse(patientData); 
        
        res.json(result);
    } catch (error) {
        next(error);
    }
}
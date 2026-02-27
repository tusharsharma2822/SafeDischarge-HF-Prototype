import { generateSummary } from "../services/summary.service.js";

export const generateSummaryController = async (req, res, next) => {
    try{
        const { patientData } = req.body;

        if(!patientData){
            return res.status(400).json({
                error: "PatientData is required"
            });
        }

        const result = await generateSummary(patientData);

        res.status(200).json(result);
    }catch(err){
        next(err)
    }
};

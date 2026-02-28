const BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!BASE_URL) {
    throw new Error("VITE_API_BASE_URL is not defined in .env file");
}

export const generateSummary = async (patientData) => {
    try {
        const response = await fetch(`${BASE_URL}/generate`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },

            body: JSON.stringify({ patientData }) 
        });

        const data = await response.json();

        if(!response.ok){
            throw new Error("Failed to generate summary");
        }

        return data;
    } catch (error) {
        console.error("API Error: ", error);
        throw error;
    }
}
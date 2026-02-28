import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import PatientForm from "../components/patient/PatientForm";
import SummaryDisplay from "../components/summary/SummaryDisplay";
import ErrorAlert from "../components/ui/ErrorAlert";
import Loader from "../components/ui/Loader";
import { generateSummary } from "../services/api";

function Dashboard() {

    const [summary, setSummary] = useState(null);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handleGenerate = async (patientData) => {
        try {
            setLoading(true);
            setError("");
            setSummary(null)

            const data = await generateSummary(patientData);
            setSummary(data);
        }catch(err){
            setError(err.message);
        }finally{
            setLoading(false)
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-3xl mx-auto p-8">
                <PatientForm 
                    onGenerate={handleGenerate}
                />
                {loading && <Loader />}
                <ErrorAlert  message={error}/>
                <SummaryDisplay summary={summary} />
            </div>
        </div>
    );
}

export default Dashboard;
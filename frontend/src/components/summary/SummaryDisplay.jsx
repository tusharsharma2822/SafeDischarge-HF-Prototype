import SummarySection from "./SummarySection";
import Card from "../ui/Card";

function SummaryDisplay({ summary }) {
    if (!summary) {
        return null;
    }    

    return (
        <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
                Generate Clinical Summary
            </h2>
            <SummarySection 
                title="Primary Diagnosis"
                content={summary?.clinicianSummary?.primaryDiagnosis?.text}
            />

            <SummarySection 
                title="Hospital Course"
                content={summary?.clinicianSummary?.hospitalCourse?.text}
            />

            <SummarySection 
                title="Medication Changes"
                content={summary?.clinicianSummary?.medicationChanges?.join(", ")}
            />

            <SummarySection 
                title="Follow Up Plan"
                content={summary?.clinicianSummary?.followUpPlan?.text}
            />

            {summary?.confidenceScore && (
                <Card>
                    <h3 className="font-semibold text-gray-800">
                        confidence Score
                    </h3>
                    <p className="text-gray-700 mt-1">
                        {summary.confidenceScore}
                    </p>
                </Card>
            )}
        </div>
    );
}

export default SummaryDisplay;
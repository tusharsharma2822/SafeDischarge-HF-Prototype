import SummarySection from "./SummarySection";
import Card from "../ui/Card";

function SummaryDisplay({ summary }) {
    if (!summary) {
        return null;
    }    

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Clinical Discharge Summary
            </h2>

            {summary?.patientInfo && (
                <Card>
                    <h3 className="font-semibold text-gray-800 mb-2">Patient Information</h3>
                    <p className="text-gray-700">Age: {summary.patientInfo.age}, Gender: {summary.patientInfo.gender}</p>
                </Card>
            )}

            <SummarySection 
                title="Primary Diagnosis"
                content={summary?.primaryDiagnosis}
            />

            {summary?.secondaryDiagnoses && summary.secondaryDiagnoses.length > 0 && (
                <SummarySection 
                    title="Secondary Diagnoses"
                    content={summary.secondaryDiagnoses.join(", ")}
                />
            )}

            {summary?.vitals && (
                <Card>
                    <h3 className="font-semibold text-gray-800 mb-3">Vitals</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                        {Object.entries(summary.vitals).map(([key, val]) => (
                            <div key={key}><span className="font-medium">{key}:</span> {val}</div>
                        ))}
                    </div>
                </Card>
            )}

            {summary?.labResults && (
                <Card>
                    <h3 className="font-semibold text-gray-800 mb-3">Lab Results</h3>
                    <div className="space-y-1 text-sm text-gray-700">
                        {Object.entries(summary.labResults).map(([key, val]) => (
                            <div key={key}><span className="font-medium">{key}:</span> {val}</div>
                        ))}
                    </div>
                </Card>
            )}

            <SummarySection 
                title="Hospital Course"
                content={summary?.hospitalCourse}
            />

            <SummarySection 
                title="Clinical Findings"
                content={summary?.clinicalFindings}
            />

            {summary?.medicationsOnDischarge && summary.medicationsOnDischarge.length > 0 && (
                <SummarySection 
                    title="Medications on Discharge"
                    content={summary.medicationsOnDischarge.join("\n")}
                />
            )}

            {summary?.followUpInstructions && summary.followUpInstructions.length > 0 && (
                <Card>
                    <h3 className="font-semibold text-gray-800 mb-3">Follow Up Instructions</h3>
                    <ul className="space-y-2 text-gray-700 list-disc list-inside">
                        {summary.followUpInstructions.map((instruction, idx) => (
                            <li key={idx}>{instruction}</li>
                        ))}
                    </ul>
                </Card>
            )}

            {summary?.warningSignsToWatch && summary.warningSignsToWatch.length > 0 && (
                <Card>
                    <h3 className="font-semibold text-red-600 mb-3">⚠️ Warning Signs to Watch</h3>
                    <ul className="space-y-1 text-gray-700 list-disc list-inside">
                        {summary.warningSignsToWatch.map((sign, idx) => (
                            <li key={idx}>{sign}</li>
                        ))}
                    </ul>
                </Card>
            )}

            <SummarySection 
                title="Dietary Recommendations"
                content={summary?.dietaryRecommendations}
            />

            <SummarySection 
                title="Activity Restrictions"
                content={summary?.activityRestrictions}
            />

            <SummarySection 
                title="Next Appointment"
                content={summary?.nextAppointment}
            />
        </div>
    );
}

export default SummaryDisplay;
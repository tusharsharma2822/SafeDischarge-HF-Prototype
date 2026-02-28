import Card from "../ui/Card";

function SummarySection({ title, content}) {
    if(!content){
        return null;
    }

    return (
        <Card className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {title}
            </h3>
            <p className="text-gray-700 whitespace-pre-line">
                {content}
            </p>
        </Card>
    );
}

export default SummarySection;
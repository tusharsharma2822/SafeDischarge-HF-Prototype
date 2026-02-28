function ErrorAlert({ message }) {
    if(!message){
        return null;
    }

    return (
        <div className="bg-red-100 text-red-700 p-4 rounded-xl border border-red-300">{message}</div>
    );
}

export default ErrorAlert;
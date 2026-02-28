function Button({ children, onClick, loading = false }) {
    return (
        <button
            onClick={onClick}
            disabled={loading}
            className="bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 text-white px-8 py-3 rounded-xl font-semibold transition duration-200"
        >
            {loading ? "Generating..." : children}
        </button>
    );
}

export default Button;
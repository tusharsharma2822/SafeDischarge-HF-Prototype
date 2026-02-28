function Navbar() {
    return (
        <div className="bg-white shadow-sm border-b border-gray-200 px-8 py-4 flex justify-between items-center">
            <div>
                <h1 className="text-2xl font-bold text-gray-800">
                    SafeDischarge AI
                </h1>
                <p className="text-sm text-gray-500">
                    Clinical Documentation Assitant
                </p>
            </div>
            <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600 font-medium">
                    System Ready
                </span>
            </div>
        </div>
    );
}

export default Navbar;
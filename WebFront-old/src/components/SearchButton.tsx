const SearchButton = ({ onClick, className = '', visibleText }) => {
    // Basic text selection logic
    const getText = () => {
        return visibleText.default || '';
    };

    return (
        <button
            className={`w-[50px] h-[50px] flex items-center justify-center bg-black text-white rounded-lg shadow-md transition hover:bg-blue-600 ${className}`}
            onClick={onClick}
            aria-label="search"
        >
            <span>🔍</span>
            {getText()}
        </button>
    );
};

export default SearchButton;

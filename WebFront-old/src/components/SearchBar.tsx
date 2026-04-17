const SearchBar = (props) => {
    return (
        <form 
            className={`flex items-center p-1 border border-gray-300 rounded-lg ${props.width || 'w-full'}`}
            onSubmit={props.onSearchGo}
        >
            <input
                name="searchKeyword"
                className="ml-2 flex-grow p-2 outline-none"
                placeholder={props.placeholder}
                aria-label={props.placeholder}
                defaultValue={props.keyword}
            />
            <button type="submit" className="p-2 text-gray-500 hover:text-gray-700" aria-label="search">
                🔍
            </button>
        </form>
    );
};

export default SearchBar;

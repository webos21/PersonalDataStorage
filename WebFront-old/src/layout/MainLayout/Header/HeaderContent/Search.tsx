// ==============================|| HEADER CONTENT - SEARCH ||============================== //

const Search = () => (
    <div className="ml-0 w-full md:ml-1 md:w-56">
        <label htmlFor="header-search" className="relative block w-full">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">⌕</span>
            <input
                id="header-search"
                type="text"
                aria-label="search"
                placeholder="Ctrl + K"
                className="w-full rounded-md border border-gray-300 bg-white py-2 pl-9 pr-3 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
        </label>
    </div>
);

export default Search;

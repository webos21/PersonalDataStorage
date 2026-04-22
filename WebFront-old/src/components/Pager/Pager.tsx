type PagerProps = {
    totalItems: number;
    currentPage: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
};

const Pager = ({ totalItems = 0, currentPage = 1, itemsPerPage = 10, onPageChange }: PagerProps) => {
    const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
    const safePage = Math.min(Math.max(currentPage, 1), totalPages);

    const pages: number[] = [];
    const start = Math.max(1, safePage - 2);
    const end = Math.min(totalPages, safePage + 2);
    for (let p = start; p <= end; p += 1) {
        pages.push(p);
    }

    return (
        <div className="mt-4 flex items-center justify-center gap-2">
            <button
                type="button"
                className="rounded border px-2 py-1 text-sm disabled:opacity-40"
                disabled={safePage <= 1}
                onClick={() => onPageChange(safePage - 1)}
            >
                Prev
            </button>
            {pages.map((page) => (
                <button
                    key={page}
                    type="button"
                    className={`rounded px-3 py-1 text-sm ${page === safePage ? 'bg-blue-600 text-white' : 'border'}`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}
            <button
                type="button"
                className="rounded border px-2 py-1 text-sm disabled:opacity-40"
                disabled={safePage >= totalPages}
                onClick={() => onPageChange(safePage + 1)}
            >
                Next
            </button>
        </div>
    );
};

export default Pager;

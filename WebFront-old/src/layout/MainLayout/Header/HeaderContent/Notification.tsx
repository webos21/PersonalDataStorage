const Notification = () => {
    return (
        <button
            type="button"
            className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:bg-slate-50"
            aria-label="notifications"
        >
            <span className="text-base">🔔</span>
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-orange-500" />
        </button>
    );
};

export default Notification;

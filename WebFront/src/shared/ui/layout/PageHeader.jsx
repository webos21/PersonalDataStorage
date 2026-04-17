/**
 * PageHeader – 페이지 상단 헤더 바
 * icon + title + desc 를 표시하는 분리된 헤더
 */
export default function PageHeader({ icon: Icon, title, desc, count, iconClass = "bg-zinc-200 text-zinc-700" }) {
    return (
        <header className="flex-none bg-white border-b border-zinc-200 flex items-center px-8 py-4 mb-4 -mx-6 -mt-6 rounded-t-xl">
            <div className="flex items-center gap-3">
                {Icon && (
                    <div className={`p-2.5 rounded-xl flex items-center justify-center ${iconClass}`}>
                        <Icon size={24} />
                    </div>
                )}
                <div>
                    <div className="flex items-center gap-2">
                        <h1 className="text-xl font-bold text-zinc-900 leading-tight">{title}</h1>
                        {count != null && (
                            <span className="text-sm text-zinc-600 font-semibold tabular-nums">{count.toLocaleString()}건</span>
                        )}
                    </div>
                    {desc && <p className="text-[13px] text-zinc-600 mt-1.5">{desc}</p>}
                </div>
            </div>
        </header>
    )
}

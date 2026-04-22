/**
 * Common Card Component
 * @param {string} title - Card title
 * @param {React.ReactNode} children - Card content
 * @param {string} className - Additional classes
 * @param {React.ReactNode} footer - Optional footer content
 */
const Card = ({ title, children, className = '', footer }) => {
    return (
        <div className={`bg-white rounded-lg shadow-sm border border-zinc-200 overflow-hidden flex flex-col ${className}`}>
            {title && (
                <div className="px-6 py-4 border-b border-zinc-100 flex justify-between items-center">
                    <h3 className="font-semibold text-lg text-zinc-800">{title}</h3>
                </div>
            )}
            <div className="p-6 flex-1">
                {children}
            </div>
            {footer && (
                <div className="bg-zinc-50 px-6 py-3 border-t border-zinc-100 text-sm text-zinc-500">
                    {footer}
                </div>
            )}
        </div>
    );
};

export default Card;

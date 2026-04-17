import Card from './Card';

/**
 * Statistics Card Component
 * @param {string} label - Label text
 * @param {string|number} value - Main value
 * @param {React.ReactNode} icon - Icon component (Lucide)
 * @param {string} subText - Optional sub-text (e.g. trend)
 * @param {string} type - 'default' | 'primary' | 'success' | 'warning' | 'error'
 */
const StatsCard = ({ label, value, icon, subText, type = 'default' }) => {
    const typeColors = {
        default: 'text-zinc-600',
        primary: 'text-primary',
        success: 'text-status-running',
        warning: 'text-status-idle',
        error: 'text-status-alert',
    };

    const iconBgColors = {
        default: 'bg-zinc-100',
        primary: 'bg-blue-50',
        success: 'bg-green-50',
        warning: 'bg-amber-50',
        error: 'bg-red-50',
    };

    return (
        <Card className="h-full">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-semibold text-zinc-700 mb-1">{label}</p>
                    <h4 className="text-2xl font-bold text-zinc-900">{value}</h4>
                    {subText && <p className="text-xs text-zinc-500 mt-1">{subText}</p>}
                </div>
                {icon && (
                    <div className={`p-3 rounded-full ${iconBgColors[type] || iconBgColors.default} ${typeColors[type] || typeColors.default}`}>
                        {icon}
                    </div>
                )}
            </div>
        </Card>
    );
};

export default StatsCard;

import { createColumnHelper } from '@tanstack/react-table';
import Badge from '@/shared/ui/data-display/Badge';
import { formatDateCellValue } from '@/shared/utils/DateUtil';

const c = createColumnHelper<any>();
const WEATHER_META: Record<string, { emoji: string; label: string }> = {
    '1': { emoji: '☀️', label: '맑음' },
    '2': { emoji: '🌤️', label: '구름 조금' },
    '3': { emoji: '☁️', label: '흐림' },
    '4': { emoji: '🌦️', label: '소니기' },
    '5': { emoji: '🌧️', label: '비' },
    '6': { emoji: '🌤️', label: '비 온후 갬' },
    '7': { emoji: '❄️', label: '눈' },
    '8': { emoji: '🌨️', label: '비 또는 눈' },
    '9': { emoji: '⛈️', label: '천둥번개' }
};

const DiaryBoardColumns = (
    tableKeys: string[],
    labelByKey: Record<string, string>,
    onOpenForm: (mode: 'add' | 'edit' | 'delete', row?: any) => void
) => {
    const dataColumns = (tableKeys.length ? tableKeys : ['id']).map((key) =>
        c.accessor(key, {
            header: labelByKey[key] || key,
            size: 140,
            enableSorting: false,
            cell: (info) => {
                if (key === 'weather') {
                    const weatherKey = `${info.getValue?.() ?? ''}`;
                    const weather = WEATHER_META[weatherKey];
                    if (!weather) return <span className="text-sm text-zinc-800">{weatherKey || '-'}</span>;
                    return (
                        <span className="inline-flex items-center gap-1 text-sm text-zinc-800">
                            <span aria-hidden>{weather.emoji}</span>
                            <span>{weather.label}</span>
                        </span>
                    );
                }

                return <span className="text-sm text-zinc-800">{formatDateCellValue(key, info.getValue?.(), labelByKey[key] || key)}</span>;
            }
        })
    );

    dataColumns.push(
        c.display({
            id: 'actions',
            header: '작업',
            size: 140,
            cell: ({ row }) => (
                <div className="fms-actions justify-center gap-1.5">
                    <Badge variant="edit" onClick={() => onOpenForm('edit', row.original)}>
                        수정
                    </Badge>
                    <Badge variant="delete" onClick={() => onOpenForm('delete', row.original)}>
                        삭제
                    </Badge>
                </div>
            )
        })
    );

    return dataColumns;
};

export default DiaryBoardColumns;

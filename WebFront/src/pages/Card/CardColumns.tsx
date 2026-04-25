import { createColumnHelper } from '@tanstack/react-table';
import Badge from '@/shared/ui/data-display/Badge';

const c = createColumnHelper<any>();

const CardColumns = (
    tableKeys: string[],
    labelByKey: Record<string, string>,
    onOpenForm: (mode: 'add' | 'edit' | 'delete', row?: any) => void
) => {
    const dataColumns = (tableKeys.length ? tableKeys : ['id']).map((key) =>
        c.display({
            id: key,
            header: labelByKey[key] || key,
            size: 140,
            enableSorting: false,
            cell: ({ row }) => {
                const raw = row.original?.[key];

                if (key === 'validPeriod') {
                    const mmRaw = String(row.original?.validMonth ?? '').trim();
                    const yyRaw = String(row.original?.validYear ?? '').trim();
                    const mm = mmRaw ? mmRaw.padStart(2, '0') : '';
                    const yy = yyRaw ? (yyRaw.length >= 2 ? yyRaw.slice(-2) : yyRaw.padStart(2, '0')) : '';
                    const value = mm && yy ? `${mm}/${yy}` : '';
                    return <span className="text-sm text-zinc-800">{value}</span>;
                }

                if (key === 'notUsed') {
                    const value = `${raw ?? ''}` === '1' ? '미사용' : '사용중';
                    return <span className="text-sm text-zinc-800">{value}</span>;
                }

                return <span className="text-sm text-zinc-800">{`${raw ?? ''}`}</span>;
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

export default CardColumns;

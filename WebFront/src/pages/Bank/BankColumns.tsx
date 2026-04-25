import { createColumnHelper } from '@tanstack/react-table';
import Badge from '@/shared/ui/data-display/Badge';
import { formatDateCellValue } from '@/shared/utils/DateUtil';
import { formatDecimalByField } from '@/shared/utils/NumberUtil';

const c = createColumnHelper<any>();

const BankColumns = (
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
                const raw = info.getValue?.();
                if (key === 'accountPassword') {
                    const normalized = raw == null || raw === 'null' ? '' : raw;
                    return <span className="text-sm text-zinc-800">{`${normalized}`}</span>;
                }
                const money = formatDecimalByField(key, raw, labelByKey[key] || key);
                if (money !== null) return <span className="text-sm text-zinc-800">{money}</span>;
                return <span className="text-sm text-zinc-800">{formatDateCellValue(key, raw, labelByKey[key] || key)}</span>;
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

export default BankColumns;

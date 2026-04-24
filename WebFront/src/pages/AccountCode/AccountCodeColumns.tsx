// library
import { createColumnHelper } from '@tanstack/react-table';

// in-project
import Badge from '@/shared/ui/data-display/Badge';

const c = createColumnHelper<any>();

const AccountCodeColumns = (
    tableKeys: string[],
    labelByKey: Record<string, string>,
    onOpenForm: (mode: 'add' | 'edit' | 'delete', row?: any) => void
) => {
    const dataColumns = (tableKeys.length ? tableKeys : ['id', 'accountCode', 'title']).map((key) =>
        c.accessor(key, {
            header: labelByKey[key] || key,
            size: 140,
            enableSorting: false,
            cell: (info) => <span className="text-sm text-zinc-800">{`${info.getValue?.() ?? '-'}`}</span>
        })
    );

    dataColumns.push(
        c.display({
            id: 'actions',
            header: '작업',
            size: 100,
            enableSorting: false,
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

export default AccountCodeColumns;

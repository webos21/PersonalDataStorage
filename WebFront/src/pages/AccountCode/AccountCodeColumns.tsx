// library
import { createColumnHelper } from '@tanstack/react-table';

// in-project
import Badge from '@/shared/ui/data-display/Badge';

const c = createColumnHelper();

const AccountCodeColumns = (onEdit: (e: any) => void, onDelete: (e: any) => void) => [
    c.accessor('id', {
        header: 'ID',
        size: 80,
        enableSorting: false,
        cell: (info) => <span className="text-sm text-zinc-800">{info.getValue() ?? '-'}</span>
    }),
    c.accessor('accountCode', {
        header: '계정코드',
        size: 120,
        enableSorting: false,
        cell: (info) => <span className="text-sm text-zinc-800">{info.getValue() ?? '-'}</span>
    }),
    c.accessor('title', {
        header: '코드명',
        size: 180,
        enableSorting: false,
        cell: (info) => <span className="text-sm text-zinc-800">{info.getValue() ?? '-'}</span>
    }),
    c.display({
        id: '_actions',
        header: '작업',
        size: 100,
        enableSorting: false,
        cell: ({ row }) => (
            <div className="fms-actions justify-center gap-1.5">
                <Badge variant="edit" onClick={() => onEdit(row.original)}>
                    수정
                </Badge>
                <Badge variant="delete" onClick={() => onDelete(row.original)}>
                    삭제
                </Badge>
            </div>
        )
    })
];

export default AccountCodeColumns;

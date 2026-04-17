// library
import { createColumnHelper } from '@tanstack/react-table';

// in-project
import Badge from '@/shared/ui/data-display/Badge';

const c = createColumnHelper();

const AccountClassColumns = (onEdit: (e: any) => void, onDelete: (e: any) => void) => [
    c.accessor('id', {
        header: '계정 분류',
        size: 100,
        enableSorting: false,
        cell: (info) => <span className="text-sm text-zinc-800">{info.getValue() ?? '-'}</span>
    }),
    c.accessor('title', {
        header: '분류 명칭',
        size: 100,
        enableSorting: false,
        cell: (info) => <span className="text-sm text-zinc-800">{info.getValue() ?? '-'}</span>
    }),
    c.display({
        id: '_actions',
        header: '',
        size: 100,
        enableSorting: false,
        cell: ({ row }) => {
            return (
                <div className="fms-actions justify-end pr-2 gap-1.5">
                    <Badge variant="edit" onClick={() => onEdit(row.original)}>
                        수정
                    </Badge>
                    <Badge variant="delete" onClick={() => onDelete(row.original)}>
                        삭제
                    </Badge>
                </div>
            );
        }
    })
];

export default AccountClassColumns;

import {
    ClipboardType,
    BookType,
    PiggyBank,
    Banknote,
    DollarSign,
    CreditCard,
    ScanHeart,
    MapPinHouse,
    RefreshCcw,
    ChartLine,
    NotepadText,
    BookUser,
    Calendar1,
    Notebook,
    Vault,
    CalendarClock,
    FolderOpen,
    FlaskConical
} from 'lucide-react';

interface MenuItem {
    id: string;
    label: string;
    path: string;
    icon: any; // Lucide icon component
    requiredRole?: string[];
    disabled?: boolean;
}

interface MenuGroup {
    id: string;
    label: string;
    items: MenuItem[];
}

export const MENU_CONFIG: MenuGroup[] = [
    {
        id: 'account',
        label: '계정코드 (Account)',
        items: [
            { id: 'account-class', label: '계정분류', path: '/account/account-class', icon: ClipboardType },
            { id: 'account-code', label: '계정코드', path: '/account/account-code', icon: BookType }
        ]
    },
    {
        id: 'household',
        label: '가계부 (Household)',
        items: [
            { id: 'bank', label: '계좌', path: '/household/bank', icon: PiggyBank },
            { id: 'bank-record', label: '계좌기록', path: '/household/bank-record', icon: Banknote },
            { id: 'budget', label: '예산', path: '/household/budget', icon: DollarSign },
            { id: 'card', label: '카드', path: '/household/card', icon: CreditCard },
            { id: 'card-record', label: '카드기록', path: '/household/card-record', icon: CreditCard },
            { id: 'insurance', label: '보험', path: '/household/insurance', icon: ScanHeart },
            { id: 'insurance-record', label: '보험기록', path: '/household/insurance-record', icon: ScanHeart },
            { id: 'realestate', label: '부동산', path: '/household/realestate', icon: MapPinHouse },
            { id: 'realestate-record', label: '부동산기록', path: '/household/realestate-record', icon: MapPinHouse },
            { id: 'regular', label: '정기결제', path: '/household/regular', icon: RefreshCcw },
            { id: 'regular-record', label: '정기결제기록', path: '/household/regular-record', icon: RefreshCcw },
            { id: 'stock', label: '주식', path: '/household/stock', icon: ChartLine },
            { id: 'stock-record', label: '주식기록', path: '/household/stock-record', icon: ChartLine },
            { id: 'record', label: '거래기록', path: '/household/record', icon: NotepadText }
        ]
    },
    {
        id: 'management',
        label: '개인관리 (Management)',
        items: [
            { id: 'address', label: '주소록', path: '/management/address', icon: BookUser },
            { id: 'anniversary', label: '기념일', path: '/management/anniversary', icon: Calendar1 },
            { id: 'diary-board', label: '일기장', path: '/management/diary-board', icon: Notebook },
            { id: 'diary-calendar', label: '일기장(달력)', path: '/management/diary-calendar', icon: Notebook },
            { id: 'memo', label: '메모', path: '/management/memo', icon: Notebook },
            { id: 'password', label: '비밀번호', path: '/management/password', icon: Vault },
            { id: 'schedule', label: '일정', path: '/management/schedule', icon: CalendarClock }
        ]
    },
    {
        id: 'utils',
        label: '편의기능 (Utils)',
        items: [
            { id: 'filesystem', label: '파일탐색', path: '/utils/filesystem', icon: FolderOpen },
            { id: 'test', label: 'Test', path: '/utils/test', icon: FlaskConical }
        ]
    }
];
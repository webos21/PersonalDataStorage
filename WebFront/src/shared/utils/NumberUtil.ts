function formatCurrency(n: number | null | undefined): string | number {
    if (!n) {
        return 0;
    }
    return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(n);
}

function formatDecimal(n: number | null | undefined): string | number {
    if (!n) {
        return 0;
    }
    return new Intl.NumberFormat('ko-KR', { style: 'decimal' }).format(n);
}

const MONEY_KEYWORDS = [
    'price',
    'amount',
    'deposit',
    'withdrawal',
    'commission',
    'premium',
    'balance',
    'loan',
    'estimate',
    'limit',
    'cashadvance',
    'remainder'
];

const MONEY_LABEL_PATTERN = /(금액|가격|대출|한도|잔액|입금|출금|수수료|보험료)/;
const DATE_LABEL_PATTERN = /(월|일|일자)$/;

function isDateLikeField(fieldName: string, label?: string): boolean {
    const lower = fieldName.toLowerCase();
    if (lower.includes('date') || lower.includes('time')) return true;
    return DATE_LABEL_PATTERN.test((label || '').trim());
}

function isMoneyLikeField(fieldName: string, label?: string): boolean {
    if (isDateLikeField(fieldName, label)) return false;
    const lower = fieldName.toLowerCase();
    if (MONEY_KEYWORDS.some((token) => lower.includes(token))) return true;
    return MONEY_LABEL_PATTERN.test((label || '').trim());
}

function formatDecimalByField(fieldName: string, value: unknown, label?: string): string | null {
    if (!isMoneyLikeField(fieldName, label)) return null;
    if (value == null || value === '') return '';

    if (typeof value === 'number' && Number.isFinite(value)) {
        return String(formatDecimal(value));
    }

    if (typeof value === 'string') {
        const trimmed = value.trim();
        if (!trimmed) return '';
        const parsed = Number(trimmed.replace(/,/g, ''));
        if (Number.isFinite(parsed)) return String(formatDecimal(parsed));
        return trimmed;
    }

    return `${value}`;
}

export { formatCurrency, formatDecimal, formatDecimalByField };

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
    'remainder',
    'budget'
];

const MONEY_LABEL_PATTERN = /(금액|가격|대출|한도|잔액|예산|입금|출금|수수료|보험료)/;

function isMoneyLikeField(fieldName: string, label?: string): boolean {
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

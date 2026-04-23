import { dateFormat, datetimeFormat, monthFormat } from './DateUtil';

type DateInputType = 'date' | 'datetime-local' | 'month';

const toDateFromUnknown = (raw: unknown): Date | null => {
    if (raw == null || raw === '') return null;

    if (raw instanceof Date) {
        return Number.isNaN(raw.getTime()) ? null : raw;
    }

    if (typeof raw === 'number' && Number.isFinite(raw)) {
        const millis = Math.abs(raw) < 1_000_000_000_000 ? raw * 1000 : raw;
        const date = new Date(millis);
        return Number.isNaN(date.getTime()) ? null : date;
    }

    if (typeof raw === 'string') {
        const trimmed = raw.trim();
        if (!trimmed) return null;

        if (/^-?\d+$/.test(trimmed)) {
            const parsed = Number(trimmed);
            if (Number.isFinite(parsed)) {
                const millis = Math.abs(parsed) < 1_000_000_000_000 ? parsed * 1000 : parsed;
                const date = new Date(millis);
                if (!Number.isNaN(date.getTime())) return date;
            }
        }

        const date = new Date(trimmed);
        return Number.isNaN(date.getTime()) ? null : date;
    }

    return null;
};

const isDateLikeField = (fieldName: string) => {
    const lower = fieldName.toLowerCase();
    return lower.includes('date') || lower.includes('time');
};

const formatDateCellValue = (fieldName: string, value: unknown, label?: string): string => {
    if (value == null) return '';
    if (!isDateLikeField(fieldName)) return `${value}`;

    const date = toDateFromUnknown(value);
    if (!date) return `${value}`;

    const normalizedLabel = (label || '').trim();
    if (normalizedLabel.endsWith('월')) {
        return monthFormat(date);
    }
    if (normalizedLabel.endsWith('일')) {
        return dateFormat(date);
    }

    const lower = fieldName.toLowerCase();
    if (lower.includes('time') || lower.includes('transaction')) {
        return datetimeFormat(date).replace('T', ' ');
    }

    return dateFormat(date);
};

const normalizeDateInputValue = (fieldType: string | undefined, raw: unknown): string => {
    if (raw == null) return '';
    if (fieldType !== 'date' && fieldType !== 'datetime-local' && fieldType !== 'month') return String(raw);

    const date = toDateFromUnknown(raw);
    if (!date) return String(raw);

    if (fieldType === 'datetime-local') return datetimeFormat(date);
    if (fieldType === 'month') return monthFormat(date);
    return dateFormat(date);
};

const normalizeDatePayloadValue = (fieldType: string | undefined, value: string): string => {
    if (!value) return '';
    if (fieldType !== 'date' && fieldType !== 'datetime-local' && fieldType !== 'month') return value;

    const date = toDateFromUnknown(value);
    if (!date) return value;

    // Keep compatibility with Java backend date parsing (epoch millis).
    return String(date.getTime());
};

export { toDateFromUnknown, formatDateCellValue, normalizeDateInputValue, normalizeDatePayloadValue };
export type { DateInputType };

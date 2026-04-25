interface LunarDate {
    year: number;
    month: number;
    day: number;
    isYunMonth: boolean;
}

interface LunarResult extends LunarDate {
    ymdTxt: string;
    mdTxt: string;
    ymdNo: string;
    mdNo: string;
}

interface TransData {
    MonthTable: number[];
    LunarTable: string[];
    lunarDate: LunarDate;
    temp: number;
}

type DateInputType = 'date' | 'datetime-local' | 'month';

const transData: TransData = {
    MonthTable: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    LunarTable: [
        '1212122322121', '1212121221220', '1121121222120', '2112132122122', '2112112121220', '2121211212120',
        '2212321121212', '2122121121210', '2122121212120', '1232122121212', '1212121221220', '1121123221222',
        '1121121212220', '1212112121220', '2121231212121', '2221211212120', '1221212121210', '2123221212121',
        '2121212212120', '1211212232212', '1211212122210', '2121121212220', '1212132112212', '2212112112210',
        '2212211212120', '1221412121212', '1212122121210', '2112212122120', '1231212122212', '1211212122210',
        '2121123122122', '2121121122120', '2212112112120', '2212231212112', '2122121212120', '1212122121210',
        '2132122122121', '2112121222120', '1211212322122', '1211211221220', '2121121121220', '2122132112122',
        '1221212121120', '2121221212110', '2122321221212', '1121212212210', '2112121221220', '1231211221222',
        '1211211212220', '1221123121221', '2221121121210', '2221212112120', '1221241212112', '1212212212120',
        '1121212212210', '2114121212221', '2112112122210', '2211211412212', '2211211212120', '2212121121210',
        '2212214112121', '2122122121120', '1212122122120', '1121412122122', '1121121222120', '2112112122120',
        '2231211212122', '2121211212120', '2212121321212', '2122121121210', '2122121212120', '1212142121212',
        '1211221221220', '1121121221220', '2114112121222', '1212112121220', '2121211232122', '1221211212120',
        '1221212121210', '2121223212121', '2121212212120', '1211212212210', '2121321212221', '2121121212220',
        '1212112112220', '1223211211221', '2212211212120', '1221212321212', '1212122121210', '2112212122120',
        '1211232122212', '1211212122210', '2121121122210', '2212312112212', '2212112112120', '2212121232112',
        '2122121212110', '2212122121210', '2112124122121', '2112121221220', '1211211221220', '2121321122122',
        '2121121121220', '2122112112322', '1221212112120', '1221221212110', '2122123221212', '1121212212210',
        '2112121221220', '1211231221222', '1211211212220', '1221121121220', '1223212112121', '2221212112120',
        '1221221232112', '1212212122120', '1121212212210', '2112132212221', '2112112122210', '2211211212210',
        '2221321121212', '2212121121210', '2212212112120', '1232212121212', '1212122122110', '2121212322122',
        '1121121222120', '2112112122120', '2211231212122', '2121211212120', '2122121121210', '2124212112121',
        '2122121212120', '1212121223212', '1211212221210', '2121121221220', '1212132121222', '1212112121220',
        '2121211212120', '2122321121212', '1221212121210', '2121221212120', '1232121221212', '1211212212210',
        '2121123212221', '2121121212220', '1212112112220', '1221231211221', '2212211211220', '1212212121210',
        '2123212212121', '2112122122120', '1211212122232', '1211212122210', '2121121122120', '2212114112212',
        '2212112112120', '2212121211210', '2212232121211', '2122122121210', '2112122122120', '1231212122122',
        '1211211221220', '2121121321222', '2121121121220', '2122112112120', '2122141211212', '1221221212110',
        '2121221221210', '2114121221221'
    ],
    lunarDate: {
        year: 1,
        month: 0,
        day: 1,
        isYunMonth: false
    },
    temp: 1
};

function totalDays(solarDate: Date): number {
    if ((solarDate.getFullYear() % 4 === 0 && solarDate.getFullYear() % 100 !== 0) || solarDate.getFullYear() % 400 === 0) {
        transData.MonthTable[1] = 29;
    } else {
        transData.MonthTable[1] = 28;
    }

    let sum = 0;
    for (let i = 0; i < solarDate.getMonth(); i++) {
        sum += transData.MonthTable[i];
    }

    const nYears366 =
        Math.floor((solarDate.getFullYear() - 1) / 4) -
        Math.floor((solarDate.getFullYear() - 1) / 100) +
        Math.floor((solarDate.getFullYear() - 1) / 400);

    return (solarDate.getFullYear() - 1) * 365 + sum + nYears366 + solarDate.getDate() - 1;
}

function nDaysYear(year: number): number {
    let sum = 0;
    for (let i = 0; i < 13; i++) {
        const char = transData.LunarTable[year - 1881].charAt(i);
        if (char && Number.parseInt(char, 10)) {
            sum += 29 + ((Number.parseInt(char, 10) + 1) % 2);
        }
    }
    return sum;
}

function yunMonth(year: number): number {
    let yun = 0;
    do {
        const char = transData.LunarTable[year - 1881].charAt(yun);
        if (char && Number.parseInt(char, 10) > 2) {
            break;
        }
        yun++;
    } while (yun <= 12);
    return yun - 1;
}

function nDaysMonth(lunarDate: LunarDate): number {
    let yun = 0;
    if (!(lunarDate.month <= yunMonth(lunarDate.year) && !lunarDate.isYunMonth)) {
        yun = 1;
    }
    const char = transData.LunarTable[lunarDate.year - 1881].charAt(lunarDate.month + yun);
    return 29 + ((Number.parseInt(char, 10) + 1) % 2);
}

function solarToLunar(solarDate: Date): LunarDate {
    let nDays = totalDays(solarDate) - 686685;
    let tmp = 0;

    transData.lunarDate.year = 1881;
    transData.lunarDate.month = 0;
    transData.lunarDate.day = 1;
    transData.lunarDate.isYunMonth = false;

    do {
        tmp = nDays;
        nDays -= nDaysYear(transData.lunarDate.year);
        if (nDays < 0) {
            nDays = tmp;
            break;
        }
        transData.lunarDate.year++;
    } while (nDays > 0);

    do {
        tmp = nDays;
        nDays -= nDaysMonth(transData.lunarDate);
        if (nDays < 0) {
            nDays = tmp;
            break;
        }

        if (transData.lunarDate.month === yunMonth(transData.lunarDate.year) && !transData.lunarDate.isYunMonth) {
            transData.lunarDate.isYunMonth = true;
        } else {
            transData.lunarDate.month++;
            transData.lunarDate.isYunMonth = false;
        }
    } while (nDays > 0);

    transData.lunarDate.day = nDays + 1;
    return transData.lunarDate;
}

function solar2lunar(date: Date): LunarResult {
    const lunar = solarToLunar(date);
    const mon = lunar.month + 1;
    const day = lunar.day;
    const mdTxt = `${mon < 10 ? `0${mon}` : mon}-${day < 10 ? `0${day}` : day}`;
    const ymdTxt = `${lunar.year}-${mdTxt}`;

    return {
        year: lunar.year,
        month: lunar.month,
        day: lunar.day,
        isYunMonth: lunar.isYunMonth,
        ymdTxt,
        mdTxt,
        ymdNo: ymdTxt.replaceAll('-', ''),
        mdNo: mdTxt.replaceAll('-', '')
    };
}

function monthFormat(dateObj: Date): string {
    const year = dateObj.getFullYear();
    const month = `${dateObj.getMonth() + 1}`.padStart(2, '0');
    return `${year}-${month}`;
}

function dateFormat(dateObj: Date): string {
    const year = dateObj.getFullYear();
    const month = `${dateObj.getMonth() + 1}`.padStart(2, '0');
    const day = `${dateObj.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function datetimeFormat(dateObj: Date): string {
    const year = dateObj.getFullYear();
    const month = `${dateObj.getMonth() + 1}`.padStart(2, '0');
    const day = `${dateObj.getDate()}`.padStart(2, '0');
    const hour = `${dateObj.getHours()}`.padStart(2, '0');
    const min = `${dateObj.getMinutes()}`.padStart(2, '0');
    return `${year}-${month}-${day}T${hour}:${min}`;
}

const toDateFromUnknown = (raw: unknown): Date | null => {
    if (raw == null || raw === '') return null;

    if (raw instanceof Date) {
        return Number.isNaN(raw.getTime()) ? null : raw;
    }

    if (typeof raw === 'number' && Number.isFinite(raw)) {
        // Epoch seconds are typically 10 digits (~1.7e9 at 2026).
        // Epoch milliseconds are 13 digits and can be < 1e12 for old dates (e.g. 1999),
        // so 1e12 threshold is unsafe. Use 1e10 to distinguish sec vs ms.
        const millis = Math.abs(raw) < 10_000_000_000 ? raw * 1000 : raw;
        const date = new Date(millis);
        return Number.isNaN(date.getTime()) ? null : date;
    }

    if (typeof raw === 'string') {
        const trimmed = raw.trim();
        if (!trimmed) return null;

        if (/^-?\d+$/.test(trimmed)) {
            const parsed = Number(trimmed);
            if (Number.isFinite(parsed)) {
                const millis = Math.abs(parsed) < 10_000_000_000 ? parsed * 1000 : parsed;
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
    if (normalizedLabel.endsWith('월')) return monthFormat(date);
    if (normalizedLabel.endsWith('일')) return dateFormat(date);

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

    if (fieldType === 'datetime-local') return datetimeFormat(date);
    if (fieldType === 'month') return monthFormat(date);
    return dateFormat(date);
};

export {
    solar2lunar,
    dateFormat,
    monthFormat,
    datetimeFormat,
    toDateFromUnknown,
    formatDateCellValue,
    normalizeDateInputValue,
    normalizeDatePayloadValue
};

export type { LunarDate, LunarResult, DateInputType };

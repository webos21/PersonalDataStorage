function formatDateToYMDhm(dateVal: Date): string {
    const yyyy = dateVal.getFullYear();
    const MM = String(dateVal.getMonth() + 1).padStart(2, '0');
    const dd = String(dateVal.getDate()).padStart(2, '0');
    const HH = String(dateVal.getHours()).padStart(2, '0');
    const mm = String(dateVal.getMinutes()).padStart(2, '0');
    const dateStr = yyyy + '-' + MM + '-' + dd + ' ' + HH + ':' + mm;

    return dateStr;
}

function formatDateToYMDhms(dateVal: Date): string {
    const yyyy = dateVal.getFullYear();
    const MM = String(dateVal.getMonth() + 1).padStart(2, '0');
    const dd = String(dateVal.getDate()).padStart(2, '0');
    const HH = String(dateVal.getHours()).padStart(2, '0');
    const mm = String(dateVal.getMinutes()).padStart(2, '0');
    const ss = String(dateVal.getSeconds()).padStart(2, '0');
    const dateStr = yyyy + '-' + MM + '-' + dd + ' ' + HH + ':' + mm + ':' + ss;

    return dateStr;
}

function formatDateToYMD(dateVal: Date): string {
    const yyyy = dateVal.getFullYear();
    const mm = String(dateVal.getMonth() + 1).padStart(2, '0');
    const dd = String(dateVal.getDate()).padStart(2, '0');
    const dateStr = yyyy + '-' + mm + '-' + dd;

    return dateStr;
}

function formatMilliToYMDhm(longVal: number): string {
    const dateVal = new Date(longVal);
    return formatDateToYMDhm(dateVal);
}

function formatMilliToYMDhms(longVal: number): string {
    const dateVal = new Date(longVal);
    return formatDateToYMDhms(dateVal);
}

function formatMilliToYMD(longVal: number): string {
    const dateVal = new Date(longVal);
    return formatDateToYMD(dateVal);
}

export interface TimeUtilType {
    formatDateToYMDhm: (dateVal: Date) => string;
    formatDateToYMDhms: (dateVal: Date) => string;
    formatDateToYMD: (dateVal: Date) => string;
    formatMilliToYMDhm: (longVal: number) => string;
    formatMilliToYMDhms: (longVal: number) => string;
    formatMilliToYMD: (longVal: number) => string;
}

const TimeUtil: TimeUtilType = {
    formatDateToYMDhm,
    formatDateToYMDhms,
    formatDateToYMD,

    formatMilliToYMDhm,
    formatMilliToYMDhms,
    formatMilliToYMD
};

export default TimeUtil;

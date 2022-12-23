function formatDateToYMDhm(dateVal) {
    let yyyy = dateVal.getFullYear();
    let MM = String(dateVal.getMonth() + 1).padStart(2, '0');
    let dd = String(dateVal.getDate()).padStart(2, '0');
    let HH = String(dateVal.getHours()).padStart(2, '0');
    let mm = String(dateVal.getMinutes()).padStart(2, '0');
    let dateStr = yyyy + '-' + MM + '-' + dd + ' ' + HH + ':' + mm;

    return dateStr;
}

function formatDateToYMDhms(dateVal) {
    let yyyy = dateVal.getFullYear();
    let MM = String(dateVal.getMonth() + 1).padStart(2, '0');
    let dd = String(dateVal.getDate()).padStart(2, '0');
    let HH = String(dateVal.getHours()).padStart(2, '0');
    let mm = String(dateVal.getMinutes()).padStart(2, '0');
    let ss = String(dateVal.getSeconds()).padStart(2, '0');
    let dateStr = yyyy + '-' + MM + '-' + dd + ' ' + HH + ':' + mm + ':' + ss;

    return dateStr;
}

function formatDateToYMD(dateVal) {
    let yyyy = dateVal.getFullYear();
    let mm = String(dateVal.getMonth() + 1).padStart(2, '0');
    let dd = String(dateVal.getDate()).padStart(2, '0');
    let dateStr = yyyy + '-' + mm + '-' + dd;

    return dateStr;
}

function formatMilliToYMDhm(longVal) {
    let dateVal = new Date(longVal);
    return formatDateToYMDhm(dateVal);
}

function formatMilliToYMDhms(longVal) {
    let dateVal = new Date(longVal);
    return formatDateToYMDhms(dateVal);
}

function formatMilliToYMD(longVal) {
    let dateVal = new Date(longVal);
    return formatDateToYMD(dateVal);
}

const TimeUtil = {
    formatDateToYMDhm,
    formatDateToYMDhms,
    formatDateToYMD,

    formatMilliToYMDhm,
    formatMilliToYMDhms,
    formatMilliToYMD
};

export default TimeUtil;

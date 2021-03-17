
function dateFormat(dateObj) {
    var year = dateObj.getFullYear();
    var month = dateObj.getMonth() + 1;
    if (month < 10) {
        month = '0' + month;
    }
    var date = dateObj.getDate();
    if (date < 10) {
        date = '0' + date;
    }
    return year + "-" + month + "-" + date
}

export {
    dateFormat,
}

function formatCurrency(n) {
    if (!n) {
        return 0;
    }
    return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(n);
}

function formatDecimal(n) {
    if (!n) {
        return 0;
    }
    return new Intl.NumberFormat('ko-KR', { style: 'decimal' }).format(n);
}

export { formatCurrency, formatDecimal };

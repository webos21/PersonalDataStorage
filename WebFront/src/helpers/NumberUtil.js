function formatCurrency(n) {
    return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(n);
}

function formatDecimal(n) {
    return new Intl.NumberFormat('ko-KR', { style: 'decimal' }).format(n);
}

export {
    formatCurrency,
    formatDecimal,
}

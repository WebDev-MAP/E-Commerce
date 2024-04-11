const CURRENCY_FORMATTER = new Intl.NumberFormat('en-US', {
    currency: 'USD',
    style: 'currency',
    currencyDisplay: "narrowSymbol",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,

})

const FRACTION_FORMATTER = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
})

export function formatCurrency(price) {
    if (price % 1 === 0) {
        price = CURRENCY_FORMATTER.format(price);
    } else {
        price = FRACTION_FORMATTER.format(price);
    }
    return price
}
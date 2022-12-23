import AllActions from '../actions'

const initialState = {
    dataSync: (localStorage.getItem('stockData') ? true : false),
    pending: false,
    stocks: JSON.parse(localStorage.getItem('stockData')),
    error: null
}

const StockReducer = (state = initialState, { type, ...rest }) => {
    switch (type) {
        case AllActions.stock.STOCK_CLEAR:
            localStorage.removeItem('stockData')
            return {
                dataSync: false,
                pending: false,
                stocks: null,
                error: null
            };
        case AllActions.stock.STOCK_FETCH_REQ:
            return {
                ...state,
                pending: true
            };
        case AllActions.stock.STOCK_FETCH_OK:
            localStorage.setItem('stockData', JSON.stringify(rest.stocks));
            return {
                ...state,
                dataSync: true,
                pending: false,
                ...rest
            };
        case AllActions.stock.STOCK_FETCH_FAIL:
            return {
                ...state,
                dataSync: false,
                pending: false,
                ...rest
            };
        default:
            // console.warn("stock: unknown event", state, type);
            return state;
    }
}

export default StockReducer;

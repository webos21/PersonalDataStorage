import Helper from '../helpers'

const StockDebugLog = (args) => { };
// const StockDebugLog = console.log;

const STOCK_CLEAR = 'STOCK_CLEAR';

const STOCK_FETCH_REQ = 'STOCK_FETCH_REQ';
const STOCK_FETCH_OK = 'STOCK_FETCH_OK';
const STOCK_FETCH_FAIL = 'STOCK_FETCH_FAIL';

const stockClear = () => {
    return {
        type: STOCK_CLEAR,
    }
}

const stockFetchReq = () => {
    return {
        type: STOCK_FETCH_REQ,
    }
}

const stockFetchOk = (data) => {
    return {
        type: STOCK_FETCH_OK,
        stocks: data,
    }
}

const stockFetchFail = (err) => {
    return {
        type: STOCK_FETCH_FAIL,
        error: err,
    }
}

const stockFetch = () => {
    return dispatch => {
        const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/stock' : '/pds/v1/stock';

        dispatch(stockFetchReq());
        return fetch(REQ_URI, {
            method: 'GET',
            headers: Helper.auth.makeAuthHeader(),
        })
            .then(res => {
                StockDebugLog(res);
                if (!res.ok) {
                    let err = {
                        type: "ServerResponse",
                        message: "서버응답 : " + res.statusText + "(" + res.status + ")"
                    }
                    dispatch(stockFetchFail(err));
                    return {};
                }
                return res.json();
            })
            .then(resJson => {
                if (resJson && resJson.data) {
                    StockDebugLog(resJson.data);
                    dispatch(stockFetchOk(resJson.data));
                }
            })
            .catch(error => {
                console.warn(error);
                dispatch(stockFetchFail(error));
            })
    }
}

const getStocks = state => state.stock.stocks;

export {
    STOCK_CLEAR,
    STOCK_FETCH_REQ,
    STOCK_FETCH_OK,
    STOCK_FETCH_FAIL,
    stockClear,
    stockFetchReq,
    stockFetchOk,
    stockFetchFail,
    stockFetch,
    getStocks,
}

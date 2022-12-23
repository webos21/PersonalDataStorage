import Helper from '../helpers'

const BankDebugLog = (args) => { };
// const BankDebugLog = console.log;

const BANK_CLEAR = 'BANK_CLEAR';

const BANK_FETCH_REQ = 'BANK_FETCH_REQ';
const BANK_FETCH_OK = 'BANK_FETCH_OK';
const BANK_FETCH_FAIL = 'BANK_FETCH_FAIL';

const bankClear = () => {
    return {
        type: BANK_CLEAR,
    }
}

const bankFetchReq = () => {
    return {
        type: BANK_FETCH_REQ,
    }
}

const bankFetchOk = (data) => {
    return {
        type: BANK_FETCH_OK,
        banks: data,
    }
}

const bankFetchFail = (err) => {
    return {
        type: BANK_FETCH_FAIL,
        error: err,
    }
}

const bankFetch = () => {
    return dispatch => {
        const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/bank' : '/pds/v1/bank';

        dispatch(bankFetchReq());
        return fetch(REQ_URI, {
            method: 'GET',
            headers: Helper.auth.makeAuthHeader(),
        })
            .then(res => {
                BankDebugLog(res);
                if (!res.ok) {
                    let err = {
                        type: "ServerResponse",
                        message: "서버응답 : " + res.statusText + "(" + res.status + ")"
                    }
                    dispatch(bankFetchFail(err));
                    return {};
                }
                return res.json();
            })
            .then(resJson => {
                if (resJson && resJson.data) {
                    BankDebugLog(resJson.data);
                    dispatch(bankFetchOk(resJson.data));
                }
            })
            .catch(error => {
                console.warn(error);
                dispatch(bankFetchFail(error));
            })
    }
}

const getBanks = state => state.bank.banks;

export {
    BANK_CLEAR,
    BANK_FETCH_REQ,
    BANK_FETCH_OK,
    BANK_FETCH_FAIL,
    bankClear,
    bankFetchReq,
    bankFetchOk,
    bankFetchFail,
    bankFetch,
    getBanks,
}

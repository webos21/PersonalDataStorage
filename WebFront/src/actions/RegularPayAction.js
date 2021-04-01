import Helper from '../helpers'

const RpayDebugLog = (args) => { };
// const RpayDebugLog = console.log;

const RPAY_CLEAR = 'RPAY_CLEAR';

const RPAY_FETCH_REQ = 'RPAY_FETCH_REQ';
const RPAY_FETCH_OK = 'RPAY_FETCH_OK';
const RPAY_FETCH_FAIL = 'RPAY_FETCH_FAIL';

const rpayClear = () => {
    return {
        type: RPAY_CLEAR,
    }
}

const rpayFetchReq = () => {
    return {
        type: RPAY_FETCH_REQ,
    }
}

const rpayFetchOk = (data) => {
    return {
        type: RPAY_FETCH_OK,
        rpays: data,
    }
}

const rpayFetchFail = (err) => {
    return {
        type: RPAY_FETCH_FAIL,
        error: err,
    }
}

const rpayFetch = () => {
    return dispatch => {
        const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/regularPay' : '/pds/v1/regularPay';

        dispatch(rpayFetchReq());
        return fetch(REQ_URI, {
            method: 'GET',
            headers: Helper.auth.makeAuthHeader(),
        })
            .then(res => {
                RpayDebugLog(res);
                if (!res.ok) {
                    let err = {
                        type: "ServerResponse",
                        message: "서버응답 : " + res.statusText + "(" + res.status + ")"
                    }
                    dispatch(rpayFetchFail(err));
                    return {};
                }
                return res.json();
            })
            .then(resJson => {
                if (resJson && resJson.data) {
                    RpayDebugLog(resJson.data);
                    dispatch(rpayFetchOk(resJson.data));
                }
            })
            .catch(error => {
                console.warn(error);
                dispatch(rpayFetchFail(error));
            })
    }
}

const getRegularPay = state => state.rpay.rpays;

export {
    RPAY_CLEAR,
    RPAY_FETCH_REQ,
    RPAY_FETCH_OK,
    RPAY_FETCH_FAIL,
    rpayClear,
    rpayFetchReq,
    rpayFetchOk,
    rpayFetchFail,
    rpayFetch,
    getRegularPay,
}

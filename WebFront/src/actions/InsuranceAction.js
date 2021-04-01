import Helper from '../helpers'

const InsureDebugLog = (args) => { };
// const InsureDebugLog = console.log;

const INSURANCE_CLEAR = 'INSURANCE_CLEAR';

const INSURANCE_FETCH_REQ = 'INSURANCE_FETCH_REQ';
const INSURANCE_FETCH_OK = 'INSURANCE_FETCH_OK';
const INSURANCE_FETCH_FAIL = 'INSURANCE_FETCH_FAIL';

const insureClear = () => {
    return {
        type: INSURANCE_CLEAR,
    }
}

const insureFetchReq = () => {
    return {
        type: INSURANCE_FETCH_REQ,
    }
}

const insureFetchOk = (data) => {
    return {
        type: INSURANCE_FETCH_OK,
        insures: data,
    }
}

const insureFetchFail = (err) => {
    return {
        type: INSURANCE_FETCH_FAIL,
        error: err,
    }
}

const insureFetch = () => {
    return dispatch => {
        const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/insurance' : '/pds/v1/insurance';

        dispatch(insureFetchReq());
        return fetch(REQ_URI, {
            method: 'GET',
            headers: Helper.auth.makeAuthHeader(),
        })
            .then(res => {
                InsureDebugLog(res);
                if (!res.ok) {
                    let err = {
                        type: "ServerResponse",
                        message: "서버응답 : " + res.statusText + "(" + res.status + ")"
                    }
                    dispatch(insureFetchFail(err));
                    return {};
                }
                return res.json();
            })
            .then(resJson => {
                if (resJson && resJson.data) {
                    InsureDebugLog(resJson.data);
                    dispatch(insureFetchOk(resJson.data));
                }
            })
            .catch(error => {
                console.warn(error);
                dispatch(insureFetchFail(error));
            })
    }
}

const getInsurances = state => state.insure.insures;

export {
    INSURANCE_CLEAR,
    INSURANCE_FETCH_REQ,
    INSURANCE_FETCH_OK,
    INSURANCE_FETCH_FAIL,
    insureClear,
    insureFetchReq,
    insureFetchOk,
    insureFetchFail,
    insureFetch,
    getInsurances,
}

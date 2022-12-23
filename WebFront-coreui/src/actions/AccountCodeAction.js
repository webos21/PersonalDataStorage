import Helper from '../helpers'


const AcodeDebugLog = (args) => { };
// const AcodeDebugLog = console.log;


const ACODE_CLEAR = 'ACODE_CLEAR';

const ACODE_FETCH_REQ = 'ACODE_FETCH_REQ';
const ACODE_FETCH_OK = 'ACODE_FETCH_OK';
const ACODE_FETCH_FAIL = 'ACODE_FETCH_FAIL';

const acodeClear = () => {
    return {
        type: ACODE_CLEAR,
    }
}

const acodeFetchReq = () => {
    return {
        type: ACODE_FETCH_REQ,
    }
}

const acodeFetchOk = (data) => {
    return {
        type: ACODE_FETCH_OK,
        acodes: data,
    }
}

const acodeFetchFail = (err) => {
    return {
        type: ACODE_FETCH_FAIL,
        error: err,
    }
}

const acodeFetch = () => {
    return dispatch => {
        const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/accountCode' : '/pds/v1/accountCode';

        dispatch(acodeFetchReq());
        return fetch(REQ_URI, {
            method: 'GET',
            headers: Helper.auth.makeAuthHeader(),
        })
            .then(res => {
                AcodeDebugLog(res);
                if (!res.ok) {
                    let err = {
                        type: "ServerResponse",
                        message: "서버응답 : " + res.statusText + "(" + res.status + ")"
                    }
                    dispatch(acodeFetchFail(err));
                    return {};
                }
                return res.json();
            })
            .then(resJson => {
                if (resJson && resJson.data) {
                    AcodeDebugLog(resJson.data);
                    dispatch(acodeFetchOk(resJson.data));
                }
            })
            .catch(error => {
                console.warn(error);
                dispatch(acodeFetchFail(error));
            })
    }
}

export {
    ACODE_CLEAR,
    ACODE_FETCH_REQ,
    ACODE_FETCH_OK,
    ACODE_FETCH_FAIL,
    acodeClear,
    acodeFetchReq,
    acodeFetchOk,
    acodeFetchFail,
    acodeFetch,
}

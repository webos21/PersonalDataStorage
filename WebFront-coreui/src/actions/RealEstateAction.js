import Helper from '../helpers'

const RestateDebugLog = (args) => { };
// const RestateDebugLog = console.log;

const REALESTATE_CLEAR = 'REALESTATE_CLEAR';

const REALESTATE_FETCH_REQ = 'REALESTATE_FETCH_REQ';
const REALESTATE_FETCH_OK = 'REALESTATE_FETCH_OK';
const REALESTATE_FETCH_FAIL = 'REALESTATE_FETCH_FAIL';

const restateClear = () => {
    return {
        type: REALESTATE_CLEAR,
    }
}

const restateFetchReq = () => {
    return {
        type: REALESTATE_FETCH_REQ,
    }
}

const restateFetchOk = (data) => {
    return {
        type: REALESTATE_FETCH_OK,
        restates: data,
    }
}

const restateFetchFail = (err) => {
    return {
        type: REALESTATE_FETCH_FAIL,
        error: err,
    }
}

const restateFetch = () => {
    return dispatch => {
        const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/realestate' : '/pds/v1/realestate';

        dispatch(restateFetchReq());
        return fetch(REQ_URI, {
            method: 'GET',
            headers: Helper.auth.makeAuthHeader(),
        })
            .then(res => {
                RestateDebugLog(res);
                if (!res.ok) {
                    let err = {
                        type: "ServerResponse",
                        message: "서버응답 : " + res.statusText + "(" + res.status + ")"
                    }
                    dispatch(restateFetchFail(err));
                    return {};
                }
                return res.json();
            })
            .then(resJson => {
                if (resJson && resJson.data) {
                    RestateDebugLog(resJson.data);
                    dispatch(restateFetchOk(resJson.data));
                }
            })
            .catch(error => {
                console.warn(error);
                dispatch(restateFetchFail(error));
            })
    }
}

const getRealEstates = state => state.restate.restates;

export {
    REALESTATE_CLEAR,
    REALESTATE_FETCH_REQ,
    REALESTATE_FETCH_OK,
    REALESTATE_FETCH_FAIL,
    restateClear,
    restateFetchReq,
    restateFetchOk,
    restateFetchFail,
    restateFetch,
    getRealEstates,
}

import Helper from '../helpers'

const ANNI_CLEAR = 'ANNI_CLEAR';

const ANNI_FETCH_REQ = 'ANNI_FETCH_REQ';
const ANNI_FETCH_OK = 'ANNI_FETCH_OK';
const ANNI_FETCH_FAIL = 'ANNI_FETCH_FAIL';

const anniClear = () => {
    return {
        type: ANNI_CLEAR,
    }
}

const anniFetchReq = () => {
    return {
        type: ANNI_FETCH_REQ,
    }
}

const anniFetchOk = (data) => {
    return {
        type: ANNI_FETCH_OK,
        annis: data,
    }
}

const anniFetchFail = (err) => {
    return {
        type: ANNI_FETCH_FAIL,
        error: err,
    }
}

const anniFetch = () => {
    return dispatch => {
        const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/anniversary' : '/pds/v1/anniversary';

        dispatch(anniFetchReq());
        return fetch(REQ_URI, {
            method: 'GET',
            headers: Helper.auth.makeAuthHeader(),
        })
            .then(res => {
                console.log(res);
                if (!res.ok) {
                    let err = {
                        type: "ServerResponse",
                        message: "서버응답 : " + res.statusText + "(" + res.status + ")"
                    }
                    dispatch(anniFetchFail(err));
                    return {};
                }
                return res.json();
            })
            .then(resJson => {
                if (resJson && resJson.data) {
                    console.log(resJson.data);
                    dispatch(anniFetchOk(resJson.data));
                }
            })
            .catch(error => {
                console.log(error);
                dispatch(anniFetchFail(error));
            })
    }
}

export {
    ANNI_CLEAR,
    ANNI_FETCH_REQ,
    ANNI_FETCH_OK,
    ANNI_FETCH_FAIL,
    anniClear,
    anniFetchReq,
    anniFetchOk,
    anniFetchFail,
    anniFetch,
}

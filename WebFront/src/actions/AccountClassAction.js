import Helper from '../helpers'

const AclassDebugLog = (args) => { };
// const AclassDebugLog = console.log;

const ACLASS_CLEAR = 'ACLASS_CLEAR';

const ACLASS_FETCH_REQ = 'ACLASS_FETCH_REQ';
const ACLASS_FETCH_OK = 'ACLASS_FETCH_OK';
const ACLASS_FETCH_FAIL = 'ACLASS_FETCH_FAIL';

const aclassClear = () => {
    return {
        type: ACLASS_CLEAR,
    }
}

const aclassFetchReq = () => {
    return {
        type: ACLASS_FETCH_REQ,
    }
}

const aclassFetchOk = (data) => {
    return {
        type: ACLASS_FETCH_OK,
        aclasses: data,
    }
}

const aclassFetchFail = (err) => {
    return {
        type: ACLASS_FETCH_FAIL,
        error: err,
    }
}

const aclassFetch = () => {
    return dispatch => {
        const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/accountClass' : '/pds/v1/accountClass';

        dispatch(aclassFetchReq());
        return fetch(REQ_URI, {
            method: 'GET',
            headers: Helper.auth.makeAuthHeader(),
        })
            .then(res => {
                AclassDebugLog(res);
                if (!res.ok) {
                    let err = {
                        type: "ServerResponse",
                        message: "서버응답 : " + res.statusText + "(" + res.status + ")"
                    }
                    dispatch(aclassFetchFail(err));
                    return {};
                }
                return res.json();
            })
            .then(resJson => {
                if (resJson && resJson.data) {
                    AclassDebugLog(resJson.data);
                    dispatch(aclassFetchOk(resJson.data));
                }
            })
            .catch(error => {
                console.warn(error);
                dispatch(aclassFetchFail(error));
            })
    }
}

export {
    ACLASS_CLEAR,
    ACLASS_FETCH_REQ,
    ACLASS_FETCH_OK,
    ACLASS_FETCH_FAIL,
    aclassClear,
    aclassFetchReq,
    aclassFetchOk,
    aclassFetchFail,
    aclassFetch,
}

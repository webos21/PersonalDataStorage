const AUTH_RESET = 'AUTH_RESET'
const AUTH_LOGIN_REQ = 'AUTH_LOGIN_REQ';
const AUTH_LOGIN_OK = 'AUTH_LOGIN_OK';
const AUTH_LOGIN_FAIL = 'AUTH_LOGIN_FAIL';
const AUTH_LOGOUT = 'AUTH_LOGOUT';

const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/auth' : '/pds/v1/auth';

const authRequest = (formData) => {
    return {
        type: AUTH_LOGIN_REQ,
        formData: formData
    }
}

const authSuccess = (jsonObj) => {
    return {
        type: AUTH_LOGIN_OK,
        authKey: jsonObj.auth.ckey,
        authVal: jsonObj.auth.cval
    }
}

const authFailure = (errorObj) => {
    return {
        type: AUTH_LOGIN_FAIL,
        error: errorObj
    }
}

const authReset = () => {
    return {
        type: AUTH_RESET,
    }
}

const authLogin = pbpwd => {
    return dispatch => {
        const crypto = require('crypto');

        let iv = Buffer.from("PasswordBook1234");
        let sha256 = crypto.createHash('sha256');
        sha256.update('PasswordBook');

        let aesCipher = crypto.createCipheriv('aes-256-cbc', sha256.digest(), iv);
        aesCipher.update(pbpwd);
        let cryptBytes = aesCipher.final();
        let base64Result = cryptBytes.toString('base64');

        const formData = new FormData();
        formData.append("pbpwd", base64Result);

        dispatch(authRequest(formData));

        fetch(REQ_URI, {
            method: 'POST',
            body: formData,
            credentials: "include"
        }).then(res => {
            if (!res.ok) {
                let err = {
                    type: "ServerResponse",
                    message: "서버응답 : " + res.statusText + "(" + res.status + ")"
                }
                dispatch(authFailure(err));
                return {};
            }
            return res.json();
        }).then(resJson => {
            console.log(resJson.result);
            if (resJson.auth && resJson.auth.ckey && resJson.auth.cval) {
                dispatch(authSuccess(resJson));
                window.location.href = '/';
            }
        }).catch(error => {
            console.log(error);
            dispatch(authFailure(error));
        });
    }

}

const authLogout = () => {
    return {
        type: AUTH_LOGOUT,
    }
}

const getAuthStatus = state => state.auth.authStatus;
const getAuthError = state => state.auth.authError;

export {
    AUTH_RESET,
    AUTH_LOGIN_REQ,
    AUTH_LOGIN_OK,
    AUTH_LOGIN_FAIL,
    AUTH_LOGOUT,
    authRequest,
    authSuccess,
    authFailure,
    authLogin,
    authReset,
    authLogout,
    getAuthStatus,
    getAuthError,
}

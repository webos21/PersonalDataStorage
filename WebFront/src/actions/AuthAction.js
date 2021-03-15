
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const AUTH_LOGIN_REQ = 'AUTH_LOGIN_REQ';
const AUTH_LOGIN_OK = 'AUTH_LOGIN_OK';
const AUTH_LOGIN_FAIL = 'AUTH_LOGIN_FAIL';
const AUTH_LOGOUT = 'AUTH_LOGOUT';

const authLogin = (formData) => {
    return dispatch => {
        const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/auth' : '/pds/v1/auth';

        dispatch(() => { return { type: AUTH_LOGIN_REQ, formData } });
        fetch(REQ_URI, {
            method: 'POST',
            body: formData,
            credentials: "include"
        }).then(function (res) {
            if (!res.ok) {
                throw Error("서버응답 : " + res.statusText + "(" + res.status + ")");
            }
            return res.json();
        }).then(function (resJson) {
            console.log(resJson.result);
            if (resJson.auth && resJson.auth.ckey && resJson.auth.cval) {
                dispatch((resJson) => { return { type: AUTH_LOGIN_OK, authKey: resJson.auth.ckey, authVal: resJson.auth.cval } });
                // localStorage.setItem(resJson.auth.ckey, resJson.auth.cval);
                history.push('/');
            }
        }).catch(function (error) {
            console.log(error);
            dispatch((error) => { return { type: AUTH_LOGIN_FAIL, error: error.toString() } });
            // setError("pbpwd", { type: "manual", message: error.message });
        });
    }
}

const authLogout = () => {
    return dispatch => {
        dispatch(() => { return { type: AUTH_LOGOUT } });
    }
}

export {
    AUTH_LOGIN_REQ,
    AUTH_LOGIN_OK,
    AUTH_LOGIN_FAIL,
    AUTH_LOGOUT,
    authLogin,
    authLogout,
}

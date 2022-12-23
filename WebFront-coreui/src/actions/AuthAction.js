import * as AclassAction from './AccountClassAction'
import * as AcodeAction from './AccountCodeAction'
import * as AnniAction from './AnniversaryAction'
import * as BankAction from './BankAction'
import * as CardAction from './CardAction'
import * as InsureAction from './InsuranceAction'
import * as RestateAction from './RealEstateAction'
import * as RpayAction from './RegularPayAction'
import * as StockAction from './StockAction'

import Cipher from '../cipher'

const AuthDebugLog = (args) => { };
// const AuthDebugLog = console.log;

const AUTH_RESET = 'AUTH_RESET'
const AUTH_LOGIN_REQ = 'AUTH_LOGIN_REQ';
const AUTH_LOGIN_OK = 'AUTH_LOGIN_OK';
const AUTH_LOGIN_FAIL = 'AUTH_LOGIN_FAIL';
const AUTH_LOGOUT = 'AUTH_LOGOUT';
const AUTH_HOME = 'AUTH_HOME';


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

const authHome = () => {
    return {
        type: AUTH_HOME,
    }
}

const authLogin = pwdValue => {
    return dispatch => {
        const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/auth' : '/pds/v1/auth';

        let base64Result = Cipher.encrypt(pwdValue);

        const formData = new FormData();
        formData.append("pbpwd", base64Result);

        dispatch(authRequest(formData));

        return fetch(REQ_URI, {
            method: 'POST',
            body: formData,
            credentials: "include"
        }).then(res => {
            if (!res.ok) {
                AuthDebugLog("Result is NOK!!!");
                let err = {
                    type: "ServerResponse",
                    message: "서버응답 : " + res.statusText + "(" + res.status + ")"
                }
                dispatch(authFailure(err));
                return {};
            }
            AuthDebugLog("Result is OK!!!");
            return res.json();
        }).then(resJson => {
            AuthDebugLog(resJson.result);
            if (resJson.auth && resJson.auth.ckey && resJson.auth.cval) {
                dispatch(authSuccess(resJson));

                // Sequence is not guaranted, and the operation is stopped
                dispatch(AclassAction.aclassFetch()).then(() =>
                    dispatch(AcodeAction.acodeFetch()).then(() =>
                        dispatch(AnniAction.anniFetch()).then(() =>
                            dispatch(BankAction.bankFetch()).then(() =>
                                dispatch(CardAction.cardFetch()).then(() =>
                                    dispatch(InsureAction.insureFetch()).then(() =>
                                        dispatch(RestateAction.restateFetch()).then(() =>
                                            dispatch(RpayAction.rpayFetch()).then(() =>
                                                dispatch(StockAction.stockFetch()).then(() =>
                                                    dispatch(authHome())
                                                )))))))));

                // Promise.all([
                //     dispatch(AclassAction.aclassFetch()),
                //     dispatch(AcodeAction.acodeFetch()),
                //     dispatch(AnniAction.anniFetch()),
                //     dispatch(BankAction.bankFetch()),
                // ]).then(() => console.log("DONE!!!", new Date()));

                // Promise.all([
                //     dispatch(AclassAction.aclassFetch()),
                //     dispatch(AcodeAction.acodeFetch()),
                //     dispatch(AnniAction.anniFetch()),
                //     dispatch(BankAction.bankFetch()),
                // ]).then(() => dispatch(authHome()));

                // dispatch(AclassAction.aclassFetch());
                // dispatch(AcodeAction.acodeFetch());
                // dispatch(AnniAction.anniFetch());
                // dispatch(BankAction.bankFetch());
                // dispatch(authHome());

            }
        }).catch(error => {
            console.warn("Auth Exception", error);
            dispatch(authFailure(error));
        });
    }

}

const authLogout = () => {
    return {
        type: AUTH_LOGOUT,
    }
}

const getAuthStatus = state => state.auth.status;
const getAuthError = state => state.auth.error;

export {
    AUTH_RESET,
    AUTH_LOGIN_REQ,
    AUTH_LOGIN_OK,
    AUTH_LOGIN_FAIL,
    AUTH_LOGOUT,
    AUTH_HOME,
    authRequest,
    authSuccess,
    authFailure,
    authLogin,
    authReset,
    authHome,
    authLogout,
    getAuthStatus,
    getAuthError,
}

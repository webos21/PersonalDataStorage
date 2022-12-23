import AllActions from '../actions'


const initialState = {
    logOn: ((localStorage.getItem('authKey') && localStorage.getItem('authVal')) ? true : false),
    status: null,
    error: null,
    authKey: localStorage.getItem('authKey'),
    authVal: localStorage.getItem('authVal')
}

const AuthReducer = (state = initialState, { type, ...rest }) => {
    switch (type) {
        case AllActions.auth.AUTH_RESET:
            return {
                logOn: (localStorage.getItem('authVal') ? true : false),
                status: null,
                error: null,
                authKey: localStorage.getItem('authKey'),
                authVal: localStorage.getItem('authVal')
            };
        case AllActions.auth.AUTH_LOGIN_REQ:
            return {
                ...state,
                status: AllActions.auth.AUTH_LOGIN_REQ
            };
        case AllActions.auth.AUTH_LOGIN_OK:
            localStorage.setItem('authKey', rest.authKey);
            localStorage.setItem('authVal', rest.authVal);
            return {
                logOn: true,
                status: AllActions.auth.AUTH_LOGIN_OK,
                error: null,
                authKey: rest.authKey,
                authVal: rest.authVal,
            };
        case AllActions.auth.AUTH_LOGIN_FAIL:
            localStorage.removeItem('authKey');
            localStorage.removeItem('authVal');
            return {
                logOn: false,
                status: AllActions.auth.AUTH_LOGIN_FAIL,
                error: rest.error,
                authKey: localStorage.getItem('authKey'),
                authVal: localStorage.getItem('authVal'),
            };
        case AllActions.auth.AUTH_HOME:
            window.location.href = '/#/dashboard';
            return state;
        case AllActions.auth.AUTH_LOGOUT:
            localStorage.removeItem('authKey');
            localStorage.removeItem('authVal');
            return {
                logOn: (localStorage.getItem('authVal') ? true : false),
                status: null,
                error: null,
                authKey: null,
                authVal: null,
            }
        default:
            return state;
    }
}

export default AuthReducer;

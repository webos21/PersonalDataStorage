import AllActions from '../actions'


const initialState = {
    status: null,
    error: null,
    authKey: localStorage.getItem('authKey'),
    authVal: localStorage.getItem('authVal')
}

const AuthReducer = (state = initialState, { type, ...rest }) => {
    switch (type) {
        case AllActions.auth.AUTH_RESET:
            console.log(AllActions.auth.AUTH_RESET, state, type, rest);
            return {
                status: null,
                error: null,
                authKey: localStorage.getItem('authKey'),
                authVal: localStorage.getItem('authVal')
            };
        case AllActions.auth.AUTH_LOGIN_REQ:
            console.log(AllActions.auth.AUTH_LOGIN_REQ, state, type, rest);
            return {
                ...state,
                status: AllActions.auth.AUTH_LOGIN_REQ
            };
        case AllActions.auth.AUTH_LOGIN_OK:
            console.log(AllActions.auth.AUTH_LOGIN_OK, state, type, rest);
            localStorage.setItem('authKey', rest.authKey);
            localStorage.setItem('authVal', rest.authVal);
            return {
                status: AllActions.auth.AUTH_LOGIN_OK,
                authKey: rest.authKey,
                authVal: rest.authVal,
            };
        case AllActions.auth.AUTH_LOGIN_FAIL:
            console.log(AllActions.auth.AUTH_LOGIN_FAIL, state, type, rest);
            localStorage.removeItem('authKey');
            localStorage.removeItem('authVal');
            return {
                status: AllActions.auth.AUTH_LOGIN_FAIL,
                authKey: localStorage.getItem('authKey'),
                authVal: localStorage.getItem('authVal'),
                error: rest.error
            };
        case AllActions.auth.AUTH_LOGOUT:
            return {
                status: null,
                error: null,
                authKey: null,
                authVal: null,
            }
        default:
            // console.warn("Bank: unknown event", state, type);
            return state;
    }
}

export default AuthReducer;

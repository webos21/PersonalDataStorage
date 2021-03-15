import AllActions from '../actions'


const initialState = {
    status: '',
    error: '',
    authKey: localStorage.getItem('authKey'),
    authVal: localStorage.getItem('authVal')
}

const AuthReducer = (state = initialState, { type, ...rest }) => {
    switch (type) {
        case AllActions.auth.AUTH_LOGIN_REQ:
            console.log(AllActions.auth.AUTH_LOGIN_REQ, state, type, rest);
            return {
                ...state,
                status: AllActions.auth.AUTH_LOGIN_REQ
            };
        case AllActions.auth.AUTH_LOGIN_OK:
            console.log(AllActions.auth.AUTH_LOGIN_OK, state, type, rest);
            return {
                status: AllActions.auth.AUTH_LOGIN_OK,
                authKey: rest.authKey,
                authVal: rest.authVal,
            };
        case AllActions.auth.AUTH_LOGIN_FAIL:
            console.log(AllActions.auth.AUTH_LOGIN_FAIL, state, type, rest);
            return {
                status: AllActions.auth.AUTH_LOGIN_FAIL,
                authKey: '',
                authVal: '',
                error: rest.error
            };
        default:
            // console.warn("Bank: unknown event", state, type);
            return state;
    }
}

export default AuthReducer;

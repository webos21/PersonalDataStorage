import AllActions from '../actions'

const initialState = {
    dataSync: (localStorage.getItem('acodeData') ? true : false),
    pending: false,
    acodes: JSON.parse(localStorage.getItem('acodeData')),
    error: null
}

const AccountCodeReducer = (state = initialState, { type, ...rest }) => {
    switch (type) {
        case AllActions.acode.ACODE_CLEAR:
            localStorage.removeItem('acodeData')
            return {
                dataSync: false,
                pending: false,
                aclasses: null,
                error: null
            };
        case AllActions.acode.ACODE_FETCH_REQ:
            return {
                ...state,
                pending: true
            };
        case AllActions.acode.ACODE_FETCH_OK:
            localStorage.setItem('acodeData', JSON.stringify(rest.acodes));
            return {
                ...state,
                dataSync: true,
                pending: false,
                ...rest
            };
        case AllActions.acode.ACODE_FETCH_FAIL:
            return {
                ...state,
                dataSync: false,
                pending: false,
                ...rest
            };
        default:
            // console.warn("Bank: unknown event", state, type);
            return state;
    }
}

export default AccountCodeReducer;

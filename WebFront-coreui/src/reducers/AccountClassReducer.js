import AllActions from '../actions'

const initialState = {
    dataSync: (localStorage.getItem('aclassData') ? true : false),
    pending: false,
    aclasses: JSON.parse(localStorage.getItem('aclassData')),
    error: null
}

const AccountClassReducer = (state = initialState, { type, ...rest }) => {
    switch (type) {
        case AllActions.aclass.ACLASS_CLEAR:
            localStorage.removeItem('aclassData')
            return {
                dataSync: false,
                pending: false,
                aclasses: null,
                error: null
            };
        case AllActions.aclass.ACLASS_FETCH_REQ:
            return {
                ...state,
                pending: true
            };
        case AllActions.aclass.ACLASS_FETCH_OK:
            localStorage.setItem('aclassData', JSON.stringify(rest.aclasses));
            return {
                ...state,
                dataSync: true,
                pending: false,
                ...rest
            };
        case AllActions.aclass.ACLASS_FETCH_FAIL:
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

export default AccountClassReducer;

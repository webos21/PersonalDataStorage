import AllActions from '../actions'

const initialState = {
    dataSync: (localStorage.getItem('bankData') ? true : false),
    pending: false,
    banks: JSON.parse(localStorage.getItem('bankData')),
    error: null
}

const BankReducer = (state = initialState, { type, ...rest }) => {
    switch (type) {
        case AllActions.bank.BANK_CLEAR:
            localStorage.removeItem('bankData')
            return {
                dataSync: false,
                pending: false,
                banks: null,
                error: null
            };
        case AllActions.bank.BANK_FETCH_REQ:
            return {
                ...state,
                pending: true
            };
        case AllActions.bank.BANK_FETCH_OK:
            localStorage.setItem('bankData', JSON.stringify(rest.banks));
            return {
                ...state,
                dataSync: true,
                pending: false,
                ...rest
            };
        case AllActions.bank.BANK_FETCH_FAIL:
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

export default BankReducer;

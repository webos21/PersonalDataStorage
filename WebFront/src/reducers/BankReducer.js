import AllActions from '../actions'

const initialState = {
    pending: false,
    banks: [],
    error: null
}

const BankReducer = (state = initialState, { type, ...rest }) => {
    switch (type) {
        case AllActions.bank.FETCH_BANKS_PENDING:
            console.log("Banks", state, type);
            return {
                ...state,
                pending: true
            };
        case AllActions.bank.FETCH_BANKS_SUCCESS:
            console.log("Banks", state, type);
            return {
                ...state,
                pending: false,
                ...rest
            };
        case AllActions.bank.FETCH_BANKS_ERROR:
            console.log("Banks", state, type);
            return {
                ...state,
                pending: false,
                ...rest
            };
        default:
            // console.warn("Bank: unknown event", state, type);
            return state;
    }
}

export default BankReducer;

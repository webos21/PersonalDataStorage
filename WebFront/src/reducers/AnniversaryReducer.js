import AllActions from '../actions'

const initialState = {
    dataSync: (localStorage.getItem('anniData') ? true : false),
    pending: false,
    annis: JSON.parse(localStorage.getItem('anniData')),
    error: null
}

const AnniversaryReducer = (state = initialState, { type, ...rest }) => {
    switch (type) {
        case AllActions.anni.ANNI_CLEAR:
            localStorage.removeItem('anniData')
            return {
                dataSync: false,
                pending: false,
                aclasses: null,
                error: null
            };
        case AllActions.anni.ANNI_FETCH_REQ:
            return {
                ...state,
                pending: true
            };
        case AllActions.anni.ANNI_FETCH_OK:
            localStorage.setItem('anniData', JSON.stringify(rest.annis));
            return {
                ...state,
                pending: false,
                ...rest
            };
        case AllActions.anni.ANNI_FETCH_FAIL:
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

export default AnniversaryReducer;

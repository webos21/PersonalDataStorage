import AllActions from '../actions'

const initialState = {
    dataSync: (localStorage.getItem('rpayData') ? true : false),
    pending: false,
    rpays: JSON.parse(localStorage.getItem('rpayData')),
    error: null
}

const RegularPayReducer = (state = initialState, { type, ...rest }) => {
    switch (type) {
        case AllActions.rpay.RPAY_CLEAR:
            localStorage.removeItem('rpayData')
            return {
                dataSync: false,
                pending: false,
                rpays: null,
                error: null
            };
        case AllActions.rpay.RPAY_FETCH_REQ:
            return {
                ...state,
                pending: true
            };
        case AllActions.rpay.RPAY_FETCH_OK:
            localStorage.setItem('rpayData', JSON.stringify(rest.rpays));
            return {
                ...state,
                dataSync: true,
                pending: false,
                ...rest
            };
        case AllActions.rpay.RPAY_FETCH_FAIL:
            return {
                ...state,
                dataSync: false,
                pending: false,
                ...rest
            };
        default:
            // console.warn("rpay: unknown event", state, type);
            return state;
    }
}

export default RegularPayReducer;

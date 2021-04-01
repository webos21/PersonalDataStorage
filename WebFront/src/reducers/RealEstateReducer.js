import AllActions from '../actions'

const initialState = {
    dataSync: (localStorage.getItem('restateData') ? true : false),
    pending: false,
    restates: JSON.parse(localStorage.getItem('restateData')),
    error: null
}

const RealEstateReducer = (state = initialState, { type, ...rest }) => {
    switch (type) {
        case AllActions.restate.REALESTATE_CLEAR:
            localStorage.removeItem('restateData')
            return {
                dataSync: false,
                pending: false,
                restates: null,
                error: null
            };
        case AllActions.restate.REALESTATE_FETCH_REQ:
            return {
                ...state,
                pending: true
            };
        case AllActions.restate.REALESTATE_FETCH_OK:
            localStorage.setItem('restateData', JSON.stringify(rest.restates));
            return {
                ...state,
                dataSync: true,
                pending: false,
                ...rest
            };
        case AllActions.restate.REALESTATE_FETCH_FAIL:
            return {
                ...state,
                dataSync: false,
                pending: false,
                ...rest
            };
        default:
            // console.warn("restate: unknown event", state, type);
            return state;
    }
}

export default RealEstateReducer;

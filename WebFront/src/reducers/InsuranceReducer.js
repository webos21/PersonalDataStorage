import AllActions from '../actions'

const initialState = {
    dataSync: (localStorage.getItem('insureData') ? true : false),
    pending: false,
    insures: JSON.parse(localStorage.getItem('insureData')),
    error: null
}

const InsuranceReducer = (state = initialState, { type, ...rest }) => {
    switch (type) {
        case AllActions.insure.INSURANCE_CLEAR:
            localStorage.removeItem('insureData')
            return {
                dataSync: false,
                pending: false,
                insures: null,
                error: null
            };
        case AllActions.insure.INSURANCE_FETCH_REQ:
            return {
                ...state,
                pending: true
            };
        case AllActions.insure.INSURANCE_FETCH_OK:
            localStorage.setItem('insureData', JSON.stringify(rest.insures));
            return {
                ...state,
                dataSync: true,
                pending: false,
                ...rest
            };
        case AllActions.insure.INSURANCE_FETCH_FAIL:
            return {
                ...state,
                dataSync: false,
                pending: false,
                ...rest
            };
        default:
            // console.warn("insure: unknown event", state, type);
            return state;
    }
}

export default InsuranceReducer;

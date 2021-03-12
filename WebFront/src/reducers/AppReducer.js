import AllActions from '../actions'


const initialState = {
    initialized: false
}

const AppReducer = (state = initialState, { type, ...rest }) => {
    switch (type) {
        case AllActions.app.INIT_APP:
            console.log(AllActions.app.INIT_APP, state, type, rest);
            return {
                ...state,
                ...rest
            };
        default:
            // console.warn("Bank: unknown event", state, type);
            return state;
    }
}

export default AppReducer;

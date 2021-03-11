
const initialState = {
    sidebarShow: 'responsive'
}

const changeState = (state = initialState, { type, ...rest }) => {
    switch (type) {
        case 'SIDEBAR_SET':
            console.log("SidebarControl", state, type);
            return { ...state, ...rest };
        default:
            // console.warn("SidebarControl: unknown event", state, type);
            return state;
    }
}

export default changeState;

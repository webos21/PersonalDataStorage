
const initialState = {
    sidebarShow: 'responsive'
}

export default function changeState(state = initialState, action) {
    console.log("changeState", state, action);
    switch (action.type) {
        case 'SIDEBAR_SET':
            console.log("SidebarControl", state, action);
            return { ...state, sidebarShow: action.sidebarShow };
        default:
            console.warn("SidebarControl: unknown event", state, action);
            return state;
    }
}

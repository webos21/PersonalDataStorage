
const initialState = {
    bankShow: 'false'
}

const changeBanks = (state = initialState, { type, ...rest }) => {
    switch (type) {
        case 'BANK_SET':
            console.log("Banks", state, type);
            return { ...state, ...rest }
        default:
            // console.warn("Bank: unknown event", state, type);
            return state
    }
}

export default changeBanks;

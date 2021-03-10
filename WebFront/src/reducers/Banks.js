
const initialState = {
    bankShow: 'responsive'
}

const changeBanks = (state = initialState, { type, ...rest }) => {
    console.log("changeBanks", state, type);
    switch (type) {
        case 'BANK_SET':
            console.log("Banks", state, type);
            return { ...state, ...rest }
        default:
            return state
    }
}

export default changeBanks;

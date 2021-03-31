import AllActions from '../actions'

const initialState = {
    dataSync: (localStorage.getItem('cardData') ? true : false),
    pending: false,
    cards: JSON.parse(localStorage.getItem('cardData')),
    error: null
}

const CardReducer = (state = initialState, { type, ...rest }) => {
    switch (type) {
        case AllActions.card.CARD_CLEAR:
            localStorage.removeItem('cardData')
            return {
                dataSync: false,
                pending: false,
                cards: null,
                error: null
            };
        case AllActions.card.CARD_FETCH_REQ:
            return {
                ...state,
                pending: true
            };
        case AllActions.card.CARD_FETCH_OK:
            localStorage.setItem('cardData', JSON.stringify(rest.cards));
            return {
                ...state,
                dataSync: true,
                pending: false,
                ...rest
            };
        case AllActions.card.CARD_FETCH_FAIL:
            return {
                ...state,
                dataSync: false,
                pending: false,
                ...rest
            };
        default:
            // console.warn("Card: unknown event", state, type);
            return state;
    }
}

export default CardReducer;

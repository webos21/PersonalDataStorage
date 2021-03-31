import Helper from '../helpers'

const CardDebugLog = (args) => { };
// const CardDebugLog = console.log;

const CARD_CLEAR = 'CARD_CLEAR';

const CARD_FETCH_REQ = 'CARD_FETCH_REQ';
const CARD_FETCH_OK = 'CARD_FETCH_OK';
const CARD_FETCH_FAIL = 'CARD_FETCH_FAIL';

const cardClear = () => {
    return {
        type: CARD_CLEAR,
    }
}

const cardFetchReq = () => {
    return {
        type: CARD_FETCH_REQ,
    }
}

const cardFetchOk = (data) => {
    return {
        type: CARD_FETCH_OK,
        cards: data,
    }
}

const cardFetchFail = (err) => {
    return {
        type: CARD_FETCH_FAIL,
        error: err,
    }
}

const cardFetch = () => {
    return dispatch => {
        const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/card' : '/pds/v1/card';

        dispatch(cardFetchReq());
        return fetch(REQ_URI, {
            method: 'GET',
            headers: Helper.auth.makeAuthHeader(),
        })
            .then(res => {
                CardDebugLog(res);
                if (!res.ok) {
                    let err = {
                        type: "ServerResponse",
                        message: "서버응답 : " + res.statusText + "(" + res.status + ")"
                    }
                    dispatch(cardFetchFail(err));
                    return {};
                }
                return res.json();
            })
            .then(resJson => {
                if (resJson && resJson.data) {
                    CardDebugLog(resJson.data);
                    dispatch(cardFetchOk(resJson.data));
                }
            })
            .catch(error => {
                console.warn(error);
                dispatch(cardFetchFail(error));
            })
    }
}

const getCards = state => state.card.cards;

export {
    CARD_CLEAR,
    CARD_FETCH_REQ,
    CARD_FETCH_OK,
    CARD_FETCH_FAIL,
    cardClear,
    cardFetchReq,
    cardFetchOk,
    cardFetchFail,
    cardFetch,
    getCards,
}

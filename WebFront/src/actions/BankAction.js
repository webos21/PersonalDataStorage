import Cookies from 'universal-cookie';

const FETCH_BANKS_PENDING = 'FETCH_BANKS_PENDING';
const FETCH_BANKS_SUCCESS = 'FETCH_BANKS_SUCCESS';
const FETCH_BANKS_ERROR = 'FETCH_BANKS_ERROR';

const fetchBanksPending = () => {
    return {
        type: FETCH_BANKS_PENDING,
    }
}

const fetchBanksSuccess = (products) => {
    return {
        type: FETCH_BANKS_SUCCESS,
        products: products,
    }
}

const fetchBanksError = (error) => {
    return {
        type: FETCH_BANKS_ERROR,
        error: error,
    }
}

const fetchBanks = (storeDispatch) => {
    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/bank' : '/pds/v1/bank';
    const cookies = new Cookies();

    storeDispatch(fetchBanksPending());
    fetch(REQ_URI, {
        method: 'GET',
        headers: new Headers({
            'X-PDS-AUTH': cookies.get("X-PDS-AUTH"),
            'Authorization': 'Basic ' + btoa('username:password'),
        })
    }).then(res => res.json())
        .then(res => {
            if (res.error) {
                throw (res.error);
            }
            storeDispatch(fetchBanksSuccess(res.data));
            console.log(res.data);
            return res.data;
        })
        .catch(error => {
            storeDispatch(fetchBanksError(error));
        })
}

export {
    FETCH_BANKS_PENDING,
    FETCH_BANKS_SUCCESS,
    FETCH_BANKS_ERROR,
    fetchBanksPending,
    fetchBanksSuccess,
    fetchBanksError,
    fetchBanks
}

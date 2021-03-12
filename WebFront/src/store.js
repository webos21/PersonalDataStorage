import { combineReducers, createStore } from 'redux'
import AllActions from './actions'
import * as reducers from './reducers';

const rootReducer = combineReducers(reducers);

// redux store
const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.dispatch(AllActions.app.initApp({ initialized: true }));
AllActions.bank.fetchBanks(store.dispatch);

export default store;

import { combineReducers, createStore, applyMiddleware } from 'redux'
import mwThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import AllActions from './actions'
import * as reducers from './reducers';

const rootReducer = combineReducers(reducers);
const mwLogger = createLogger();

// redux store
const store = createStore(
    rootReducer,
    applyMiddleware(
        mwThunk,
        mwLogger
    ) && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.dispatch(AllActions.app.initApp({ initialized: true }));

export default store;

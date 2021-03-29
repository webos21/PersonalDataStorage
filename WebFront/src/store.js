import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import mwThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import * as reducers from './reducers';

const rootReducer = combineReducers(reducers);
const mwLogger = createLogger();

const composeEnhancers =
    typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(
        mwThunk,
        mwLogger
    ),
    // other store enhancers if any
);

// redux store
const store = createStore(
    rootReducer,
    enhancer
);

export default store;

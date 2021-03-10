import { combineReducers, createStore } from 'redux'
import * as reducers from './reducers';

const rootReducer = combineReducers(reducers);

// redux store
const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
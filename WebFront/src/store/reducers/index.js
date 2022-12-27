// third-party
import { combineReducers } from 'redux';

// project import
import aclass from './aclass';
import auth from './auth';
import menu from './menu';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ aclass, auth, menu });

export default reducers;

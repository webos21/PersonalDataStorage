// third-party
import { combineReducers } from 'redux';

// project import
import aclass from './aclass';
import acode from './acode';
import auth from './auth';
import menu from './menu';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ aclass, acode, auth, menu });

export default reducers;

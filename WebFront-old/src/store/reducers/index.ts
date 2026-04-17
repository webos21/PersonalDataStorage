// third-party
import { combineReducers } from 'redux';

// project import
import aclass from './aclass';
import acode from './acode';
import auth from './auth';
import menu from './menu';
import themeReducer from './theme';
import bank from './bank';
import card from './card';
import insure from './insure';
import restate from './restate';
import rpay from './rpay';
import stock from './stock';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ aclass, acode, auth, menu, themeReducer, bank, card, insure, restate, rpay, stock });

export default reducers;

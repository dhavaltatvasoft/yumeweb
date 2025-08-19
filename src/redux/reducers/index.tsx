import {combineReducers} from 'redux';
import appReducer from './appReducer';
import apiReducer from './apiReducer';

const rootReducer = combineReducers({
  appReducer,
  apiReducer,
});

export default rootReducer;

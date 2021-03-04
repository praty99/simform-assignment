import { combineReducers } from 'redux';
import { reducer } from '../modules/home';

const rootReducer = combineReducers({
  home: reducer,
});

export default rootReducer;

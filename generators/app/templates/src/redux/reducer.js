/**
 * Created by maixing on 2016/11/1.
 */
import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import counter from './module/counter/counterReducer';
import testReducer from './module/counter/testReducer';
const rootReducer = combineReducers({
  counter,
  testReducer,
  routing:routerReducer
});
export default rootReducer;

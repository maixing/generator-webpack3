/**
 * Created by maixing on 2016/11/30.
 */
import {TEST_REDUCER } from './counterAction';
export default function testReducer(state, action) {
  if(typeof state === 'undefined'){
      return {newcounter:"newcounter"};
  }
  switch (action.type) {
    default:
      return state
  }
}

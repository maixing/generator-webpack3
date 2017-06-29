/**
 * Created by maixing on 2016/11/1.
 */
import { INCREMENT_COUNTER, DECREMENT_COUNTER } from './counterAction';
export default function counter(state, action) {
  if(typeof state === 'undefined') {
    return {
      counterValue:0,test:'30'
    };
  }
  switch (action.type) {
    case INCREMENT_COUNTER:
      return {
        counterValue:state.counterValue+1,test:'30'
      };
    case DECREMENT_COUNTER:
      return {
        counterValue:state.counterValue-1,test:'30'
      };
    default:
      return state
  }
}

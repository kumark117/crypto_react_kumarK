import {FETCH_CURRDATA, RECEIVE_CURRDATA} from '../actions/constants.js';

export default function rootReducer(state = {}, action) {
  switch (action.type) {
    case RECEIVE_CURRDATA:
    console.log("in reducer: RECEIVE_CURRDATA ::::::: payload=", action.payload);
    var arr1 = action.payload;
    if (arr1)
      arr1 = arr1.sort(function(a,b) {return (-(parseFloat(a.price_usd) - parseFloat(b.price_usd)));}).
                          slice(0,5);
      return {
          apiData: arr1
      }
      break;
    default:
    console.log("in reducer: default : action.type=", action.type);
      return state
  }
}

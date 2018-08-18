import {FETCH_CURRDATA, RECEIVE_CURRDATA} from './constants.js';

export const GET_CRYPTOCCY_DATA = 'https://api.coinmarketcap.com/v1/ticker/?limit=500&convert=';


////////////////////////////////////////////////////////////////

export function fetchCurrData(displayCcy='SGD') {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function (dispatch) {
    // First dispatch: the app state is updated to inform
    // that the API call is starting.
    //UNCOMMENT IF LOADING ICON IS NEEDED:
	//dispatch(requestCurrData(subreddit))

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.

    return fetch(`${GET_CRYPTOCCY_DATA}${displayCcy}`, {method: 'GET'})
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                throw new Error(res);
            }
        })
      .then(json =>
        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.

        dispatch(receiveCurrData(json))
      )
  }
}
////////////////////////////////////////////////////////////////

export function receiveCurrData(json) {
  return {
    type: RECEIVE_CURRDATA,
    payload: json
  }
}

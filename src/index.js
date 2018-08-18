import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

//const reducer = combineReducers(reducers)
// applyMiddleware supercharges createStore with middleware:
const store = createStore(rootReducer, applyMiddleware(thunk))

import ReactDOM from 'react-dom';

import CryptoCcyList from './containers/CryptoCcyList.jsx';
//////////////////////////////////////////////////////////////////

function initialise() {
    const app = document.createElement('div');
    document.body.appendChild(app);

    ReactDOM.render( <Provider store={store}>
                      <CryptoCcyList/>
                     </Provider>, app);
}

initialise();

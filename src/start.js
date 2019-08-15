import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './welcome';
import App from './app';
import {init} from './socket';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxPromise from 'redux-promise';
import reducers from './reducers';

const store = createStore(reducers, composeWithDevTools(applyMiddleware(reduxPromise)));

let elem;

if(location.pathname == '/welcome') {
    //loggedout
    elem = <Welcome />;
} else {
    init(store);
    //loggedin
    elem = (
        <Provider store = { store }>
            <App />
        </Provider>
    );
}

ReactDOM.render(
    elem,
    document.querySelector('main')
);

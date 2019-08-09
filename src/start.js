import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './welcome';
import App from './app';

let elem;

if(location.pathname == '/welcome') {
    //loggedout
    elem = <Welcome />;
} else {
    //loggedin
    elem = (
        <App />
    );
}

ReactDOM.render(
    elem,
    document.querySelector('main')
);

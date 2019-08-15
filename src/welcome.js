import React from 'react';
import Form from './form';
import Login from './login';
import { HashRouter, Route } from 'react-router-dom';

export default function Welcome() {
    return (
        <div className="welcome">
            <h1>It's Berlin</h1>
            <img style = {{ width: "300px" }} src = "/images/homecenter.jpg"/>
            <HashRouter>
                <div>
                    <Route exact path="/" component = { Form } />
                    <Route path="/login" component = { Login } />
                </div>
            </HashRouter>
        </div>
    );
}

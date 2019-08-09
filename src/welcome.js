import React from 'react';
import Form from './form';
import Login from './login';
import { HashRouter, Route } from 'react-router-dom';

export default function Welcome() {
    return (
        <div>
            <h1>Welcome</h1>
            <img style = {{ width: "200px" }} src = "/images/home.jpg"/>
            <HashRouter>
                <div>
                    <Route exact path="/" component = { Form } />
                    <Route path="/login" component = { Login } />
                </div>
            </HashRouter>
        </div>
    );
}

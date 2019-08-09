import React from 'react';
import Form from "./form";
import Login from "./login";
import axios from './axios';
import { Route, BrowserRouter, Link } from 'react-router-dom';

export default function App () {
    return (
        <div>
            <BrowserRouter>
                <header>
                    <ul>
                        <li><Link style = {{textDecoration: "none"}} to = "/">Home</Link></li>
                        <li><Link style = {{textDecoration: "none"}} to = "/users">menu</Link></li>
                        <li><Link style = {{textDecoration: "none"}} to = "/friends">menu</Link></li>
                        <li><Link style = {{textDecoration: "none"}} to = "/chat">menu</Link></li>
                        <li><a style = {{textDecoration: "none"}} href = "/logout">Logout</a></li>
                    </ul>
                </header>
            </BrowserRouter>
        </div>
    );
}

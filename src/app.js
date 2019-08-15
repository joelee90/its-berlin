import React, { useState, useEffect } from 'react';
import ProfilePic from './profilepic';
import Form from './form';
import Login from './login';
import axios from './axios';
import { Route, BrowserRouter, Link } from 'react-router-dom';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps";
import Location from './location';
import Profile from './profile';
import Mapapp from './map';
import Home from './home';
import Chat from './chat';

export default function App () {
    return (
        <div>
            <BrowserRouter>
                <header>
                    <nav className="navigation">
                        <Link style = {{textDecoration: "none"}} to = "/home">Home</Link>
                        <Link style = {{textDecoration: "none"}} to = "/profile">Profile</Link>
                        <Link style = {{textDecoration: "none"}} to = "/map">Map</Link>
                        <Link style = {{textDecoration: "none"}} to = "/chat">Chat</Link>
                        <a style = {{textDecoration: "none"}} href = "/logout">Logout</a>
                    </nav>
                </header>
                <Route path = "/home" component = {Home} />
                <Route path = "/profile" component = {Profile} />
                <Route path = "/map" component = {Mapapp} />
                <Route path = "/chat" component = {Chat} />
            </BrowserRouter>
        </div>
    );
}

import React, { useState, useEffect } from 'react';
import Form from './form';
import Login from './login';
import axios from './axios';
import { Route, BrowserRouter, Link } from 'react-router-dom';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps";
import Location from './location';
import Profile from './profile';
import Mapapp from './map';

export default function App () {
    return (
        <div>
            <BrowserRouter>
                <header>
                    <ul>
                        <li><Link style = {{textDecoration: "none"}} to = "/">Home</Link></li>
                        <li><Link style = {{textDecoration: "none"}} to = "/map">Map</Link></li>
                        <li><Link style = {{textDecoration: "none"}} to = "/profile">Profile</Link></li>
                        <li><Link style = {{textDecoration: "none"}} to = "/mission">Mission</Link></li>
                        <li><a style = {{textDecoration: "none"}} href = "/logout">Logout</a></li>
                    </ul>
                </header>
                <Route path = "/map" component = {Mapapp} />
                <Route path = "/profile" component = {Profile} />
            </BrowserRouter>
        </div>
    );
}

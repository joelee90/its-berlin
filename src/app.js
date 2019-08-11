import React, { useState, useEffect } from 'react';
import Form from './form';
import Login from './login';
import axios from './axios';
import { Route, BrowserRouter, Link } from 'react-router-dom';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps";
import Location from './location';
import Profile from './profile';

function Map () {

    const [ posts, setPosts ] = useState([]);

    const endPoint = "https://api.foursquare.com/v2/venues/explore?";
    const parameters = {
        client_id: "PWIYCNRHNU45LQELQCQEJJYEZ4XK5BFEAPBSP2CA0WLBNMDE",
        client_secret: "S4IADFOPXD25YHVQ0CE0Z4Y2R2QCTPSM4S1IL542ZTGFIZGL",
        query: "coffee",
        near: "Berlin",
        v: '20182507'
    };

    useEffect(()=> {
        axios.get(endPoint + new URLSearchParams(parameters))
            .then(val => {
                console.log("val", val);
                console.log("val.data.response.groups[0].items", val.data.response.groups[0].items);
                let list = val.data.response.groups[0].items;
                console.log("list", list);
                setPosts(list);
            })
            .catch(err => {
                console.log("err ", err);
            });
    },[]);

    return (
        <div>
            <GoogleMap defaultZoom = { 10 } defaultCenter = {{ lat: 52.520008, lng: 13.404954 }}>
                {
                    posts.map(val => (
                        <Marker
                            key={val.venue.id}
                            position = {{ lat: val.venue.location.lat, lng: val.venue.location.lng}}
                        /> ))
                }
            </GoogleMap>
        </div>
    );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function App () {
    return (
        <div>
            <BrowserRouter>
                <header>
                    <ul>
                        <li><Link style = {{textDecoration: "none"}} to = "/">Home</Link></li>
                        <li><Link style = {{textDecoration: "none"}} to = "/profile">Profile</Link></li>
                        <li><Link style = {{textDecoration: "none"}} to = "/mission">Mission</Link></li>
                        <li><Link style = {{textDecoration: "none"}} to = "/wall">Wall</Link></li>
                        <li><a style = {{textDecoration: "none"}} href = "/logout">Logout</a></li>
                    </ul>
                </header>
                <Route path = "/profile" component = {Profile} />
            </BrowserRouter>
            <div className = "home">
                <Location/>
                <div style = {{ width: '60vw', height: '60vh' }}>
                    <WrappedMap
                        googleMapURL =
                            "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyC_1b_D0SpU6lX1j6NDkIf0iDsA9ZQujyU"
                        loadingElement={<div style={{ height: '100%' }} />}
                        containerElement={<div style={{ height: '100%' }} />}
                        mapElement={<div style={{ height: '100%' }} />}
                    />
                </div>
            </div>
        </div>
    );
}

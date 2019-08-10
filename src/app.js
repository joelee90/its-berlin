import React, { useState, useEffect } from 'react';
import Form from './form';
import Login from './login';
import axios from './axios';
import { Route, BrowserRouter, Link } from 'react-router-dom';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps";



function Map () {
    return (
        <GoogleMap defaultZoom = { 10 } defaultCenter = {{ lat: 52.520008, lng: 13.404954 }}>
            <Marker position = {{ lat: 52.527618, lng: 13.408142 }} />
        </GoogleMap>
    );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));


function getData () {

    const endPoint = "https://api.foursquare.com/v2/venues/explore?";
    const parameters = {
        client_id: "PWIYCNRHNU45LQELQCQEJJYEZ4XK5BFEAPBSP2CA0WLBNMDE",
        client_secret: "S4IADFOPXD25YHVQ0CE0Z4Y2R2QCTPSM4S1IL542ZTGFIZGL",
        query: "food",
        near: "Berlin",
        v: '20182507'
    };

    let arr = [];

    axios.get(endPoint + new URLSearchParams(parameters))
        .then(val => {

            console.log("val", val.data.response.groups[0].items);
            let list = val.data.response.groups[0].items;
            console.log("list", list);

            console.log("list.venue.name", list[0].venue.name);
            console.log("list.venue.lat", list[0].venue.location.lat);

            for(let i = 0; i < list.length; i++) {
                console.log(list[i].venue);
                arr.push(list[i].venue);
            }
            return arr;
        })
        .catch(err => {
            console.log("err ", err);
        });
}

export default function App () {

    getData();

    return (
        <div style = {{ width: '80vw', height: '80vh' }}>
            <WrappedMap
                googleMapURL =
                    "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyC_1b_D0SpU6lX1j6NDkIf0iDsA9ZQujyU"
                loadingElement={<div style={{ height: '100%' }} />}
                containerElement={<div style={{ height: '100%' }} />}
                mapElement={<div style={{ height: '100%' }} />}
            />
        </div>
    );
}



// <BrowserRouter>
//     <header>
//         <ul>
//             <li><Link style = {{textDecoration: "none"}} to = "/">Home</Link></li>
//             <li><Link style = {{textDecoration: "none"}} to = "/users">menu</Link></li>
//             <li><Link style = {{textDecoration: "none"}} to = "/friends">menu</Link></li>
//             <li><Link style = {{textDecoration: "none"}} to = "/chat">menu</Link></li>
//             <li><a style = {{textDecoration: "none"}} href = "/logout">Logout</a></li>
//         </ul>
//     </header>
// </BrowserRouter>

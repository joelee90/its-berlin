import React, { useState, useEffect } from 'react';
import axios from './axios';
import { Route, BrowserRouter, Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from "react-google-maps";
import Location from './location';
import mapStyles from './mapStyles';
import Hereapi from './hereapi';

function Map () {

    const [ selectedPlace, setSelectedPlace ] = useState(null);
    const [ selectedPlaceHere, setSelectedPlaceHere ] = useState(null);

    let list = useSelector(
        state => state && state.post
    );
    console.log("list", list);

    let apiList = useSelector(
        state => state && state.posthere
    );
    console.log("apiList", apiList);

    return (
        <div>
            <Location/>
            <Hereapi />
            <GoogleMap
                defaultOptions = {{ styles: mapStyles}}
                defaultZoom = { 10 }
                defaultCenter = {{ lat: 52.520008, lng: 13.404954 }}>
                {
                    list&&list.map(val => (
                        <Marker
                            key={val.venue.id}
                            position = {{ lat: val.venue.location.lat, lng: val.venue.location.lng}}
                            onClick = {() => {
                                setSelectedPlace(val);
                                setSelectedPlaceHere(null);
                            }}
                            icon={{
                                url: "/images/mee.png",
                                scaledSize: new window.google.maps.Size(25, 25)
                            }}
                        /> ))
                }
                {
                    apiList&&apiList.map(val => (
                        <Marker
                            key={val.id}
                            position = {{ lat: val.position[0], lng: val.position[1]}}
                            onClick = {() => {
                                setSelectedPlaceHere(val);
                                setSelectedPlace(null);
                            }}
                            icon={{
                                url: "/images/mee.png",
                                scaledSize: new window.google.maps.Size(25, 25)
                            }}
                        /> ))
                }

                {
                    selectedPlace && (
                        <InfoWindow
                            position = {{ lat: selectedPlace.venue.location.lat, lng: selectedPlace.venue.location.lng}}
                            onCloseClick = {() => {
                                setSelectedPlace(null);
                                setSelectedPlaceHere(null);
                            }}
                        >
                            <div>
                                <h2>{selectedPlace.venue.name}</h2>
                                <p>{selectedPlace.venue.location.address}</p>
                            </div>
                        </InfoWindow>
                    )}

                {
                    selectedPlaceHere && (
                        <InfoWindow
                            position = {{ lat: selectedPlaceHere.position[0], lng: selectedPlaceHere.position[1]}}
                            onCloseClick = {() => {
                                setSelectedPlaceHere(null);
                                setSelectedPlace(null);
                            }}
                        >
                            <div>
                                <h2>{selectedPlaceHere.category.title}</h2>
                                <p>{selectedPlaceHere.vicinity}</p>
                            </div>
                        </InfoWindow>
                    )}
            </GoogleMap>
        </div>
    );
}


const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function Mapapp () {
    return (
        <div className = "map-home">
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
    );
}

import React, { useState, useEffect } from 'react';
import axios from './axios';
import { Route, BrowserRouter, Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from "react-google-maps";
import mapStyles from './mapStyles';
import StampButton from './stampButton';
import * as Berlin from './places.json';
import { getPlaces, addPlacesList, removePlacesList } from './actions';

function Map () {

    const [ selectedPlace, setSelectedPlace ] = useState(null);

    return (
        <div>
            <GoogleMap
                defaultOptions = {{ styles: mapStyles}}
                defaultZoom = { 12 }
                defaultCenter = {{ lat: 52.520008, lng: 13.404954 }}>
                {
                    Berlin.results.map(val => (
                        <Marker
                            key={val.id}
                            position = {{ lat: val.geometry.location.lat, lng: val.geometry.location.lng}}
                            onClick = {() => {
                                setSelectedPlace(val);
                            }}
                            icon={{
                                url: "/images/berlin.png",
                                scaledSize: new window.google.maps.Size(40, 40)
                            }}
                        /> ))
                }
                {
                    selectedPlace && (
                        <InfoWindow
                            position = {{ lat: selectedPlace.geometry.location.lat, lng: selectedPlace.geometry.location.lng}}
                            onCloseClick = {() => {
                                setSelectedPlace(null);
                            }}
                        >
                            <div>
                                <h5>{selectedPlace.name}</h5>
                                <p>{selectedPlace.vicinity}</p>
                            </div>
                        </InfoWindow>
                    )}
            </GoogleMap>
        </div>
    );
}


const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function Mapapp () {

    const dispatch = useDispatch();

    useEffect(
        () => {
            dispatch(getPlaces(Berlin));
        },[]
    );

    const currentPlaces = useSelector(
        state => state.places && state.places
            .filter(function(val) {
                return val.accepted == false;
            })
    );

    async function submit(id, button, name) {
        try {
            const data = await axios.post('/changePlaceStatus', { name: name, id: id, button: button, } );
            dispatch(addPlacesList(id, data.data.buttonText, name));
        } catch (err) {
            console.log("err in submit btn", err);
        }
    }

    return (
        <div className="map-home-large">
            <div className="map-home">
                <div className="places">
                    <h3>Discover</h3>
                    {
                        Berlin.results.map(
                            val => (
                                <div className="placesin" key={val.id}>
                                    {val.name}
                                    <br/>
                                    <StampButton
                                        place_id = {val.id}
                                        name ={val.name}
                                        buttonText = {"ADD"}
                                        submit = {submit}
                                    />
                                </div>))
                    }
                </div>
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
            <div className="selected-places">
                <h3>Visited</h3>
                {
                    currentPlaces&&currentPlaces.map(
                        val => (
                            <div className="placesinn" key={val.id}>
                                {val.place_name}
                                <br/>
                                <StampButton
                                    id = {val.id}
                                    name = {val.place_name}
                                    place_id = {val.place_id}
                                    buttonText = {"DELETE"}
                                    submit={()=> dispatch(removePlacesList(val.place_id, 'DELETE', val.place_name))}/>
                            </div>))
                }
            </div>

        </div>
    );
}

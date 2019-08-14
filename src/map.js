import React, { useState, useEffect } from 'react';
import axios from './axios';
import { Route, BrowserRouter, Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from "react-google-maps";
import Location from './location';
import mapStyles from './mapStyles';
import Hereapi from './hereapi';
import StampButton from './stampButton';
import SelectedPlaces from './selectedplaces';
import GoogleApi from './google';

// useEffect(() => {
//     try {
//         const data = axios.post('/saveFourApi');
//         console.log('list from when map renders', data);
//     } catch (err) {
//         console.log("err", err);
//     }
//
// }, []);
//trying to save the place_id in the db once.

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
    // console.log("apiList", apiList);

    // let googleList = useSelector(
    //     state => state && state.postgoogle
    // );
    // console.log("googleList", googleList);

    return (
        <div>
            <GoogleMap
                defaultOptions = {{ styles: mapStyles}}
                defaultZoom = { 12 }
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
                                url: "/images/berlin.png",
                                scaledSize: new window.google.maps.Size(40, 40)
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
                                url: "/images/berlin.png",
                                scaledSize: new window.google.maps.Size(40, 40)
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
                                <h5>{selectedPlace.venue.name}</h5>
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
                                <h5>{selectedPlaceHere.category.title}</h5>
                                <p>{selectedPlaceHere.vicinity}</p>
                            </div>
                        </InfoWindow>
                    )}
                <Location/>
                <Hereapi />
                <GoogleApi/>
            </GoogleMap>
        </div>
    );
}


const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function Mapapp () {

    let list = useSelector(
        state => state && state.post
    );

    useEffect(() => {
        console.log("check relation status");
        (async () => {
            try {
                // console.log("props in SelectedPlaces.id ", props.id);
                const data = await axios.post('/visitedplaces', { id: 44 });
                console.log('data in selectedplaces', data);
            } catch(err) {
                console.log("err in SelectedPlaces btn", err);
            }
        })();
    }, []);

    // let apiList = useSelector(
    //     state => state && state.posthere
    // );

    // {
    //     apiList&&apiList.map(val => (<p className="placesin" key={val.id}> {val.title}<StampButton id = {val.id}/></p>))
    // }
    return (
        <div className="map-home-large">
            <div className="map-home">
                <div className="places">
                    {
                        list&&list.map(val => (<div className="placesin" key={val.venue.id}> {val.venue.name}<StampButton id = {val.venue.id}/></div>))
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
                {
                    list&&list.map(val => <SelectedPlaces key={val.venue.id} id = {val.venue.id}/>)
                }
            </div>
        </div>

    );
}

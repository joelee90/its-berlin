import React, { useState, useEffect } from 'react';
import axios from './axios';
import { Route, BrowserRouter, Link } from 'react-router-dom';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from "react-google-maps";
import Location from './location';
import mapStyles from './mapStyles';
import Hereapi from './hereapi';

function Map () {

    const [ selectedPlace, setSelectedPlace ] = useState(null);
    const [ posts, setPosts ] = useState([]);

    const endPoint = "https://api.foursquare.com/v2/venues/explore?";
    const parameters = {
        client_id: "PWIYCNRHNU45LQELQCQEJJYEZ4XK5BFEAPBSP2CA0WLBNMDE",
        client_secret: "S4IADFOPXD25YHVQ0CE0Z4Y2R2QCTPSM4S1IL542ZTGFIZGL",
        query: "sights",
        near: "Berlin",
        v: '20182507'
    };

    useEffect(()=> {
        axios.get(endPoint + new URLSearchParams(parameters))
            .then(val => {
                // console.log("val", val);
                // console.log("val.data.response.groups[0].items", val.data.response.groups[0].items);
                let list = val.data.response.groups[0].items;
                // console.log("list", list);
                setPosts(list);
            })
            .catch(err => {
                console.log("err ", err);
            });
    },[]);

    return (
        <div>
            <GoogleMap
                defaultOptions = {{ styles: mapStyles}}
                defaultZoom = { 10 }
                defaultCenter = {{ lat: 52.520008, lng: 13.404954 }}>
                {
                    posts.map(val => (
                        <Marker
                            key={val.venue.id}
                            position = {{ lat: val.venue.location.lat, lng: val.venue.location.lng}}
                            onClick = {() => {
                                setSelectedPlace(val);
                            }}
                            icon={{
                                url: "/images/mee.png",
                                scaledSize: new window.google.maps.Size(25, 25)
                            }}
                        /> ))
                }
                {selectedPlace && (
                    <InfoWindow
                        position = {{ lat: selectedPlace.venue.location.lat, lng: selectedPlace.venue.location.lng}}
                        onCloseClick = {() => {
                            setSelectedPlace(null);
                        }}
                    >
                        <div>
                            <h2>{selectedPlace.venue.name}</h2>
                            <p>{selectedPlace.venue.location.address}</p>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </div>
    );
}


const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function Mapapp () {
    ---------------------------------
    let title;
    function testingProp (a) {
        title = a;
        console.log("a", a);
        console.log("title", title);
    }
---------------------------------
    return (
        <div className = "map-home">
        ---------------------------------
            <p>Foursquareapi<Location
                mytest = {'check'}
                testingProp = { testingProp }
            /></p>
            ---------------------------------
            <div style = {{ width: '60vw', height: '60vh' }}>
                <h1>mytitle{title}</h1>
                <WrappedMap
                    googleMapURL =
                        "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyC_1b_D0SpU6lX1j6NDkIf0iDsA9ZQujyU"
                    loadingElement={<div style={{ height: '100%' }} />}
                    containerElement={<div style={{ height: '100%' }} />}
                    mapElement={<div style={{ height: '100%' }} />}
                />
            </div>
            <p>Hereapi<Hereapi /></p>
        </div>
    );
}
-------------------------------------------------------------------------------
import React, { useState, useEffect } from 'react';
import axios from './axios';

export default function Location (props) {

    console.log("props",props);
    console.log(props.foursquareApi);
    props.foursquareApi('anything');


    const [ posts, setPosts ] = useState([]);

    const endPoint = "https://api.foursquare.com/v2/venues/explore?";
    const parameters = {
        client_id: "PWIYCNRHNU45LQELQCQEJJYEZ4XK5BFEAPBSP2CA0WLBNMDE",
        client_secret: "S4IADFOPXD25YHVQ0CE0Z4Y2R2QCTPSM4S1IL542ZTGFIZGL",
        query: "sight",
        near: "Berlin",
        v: '20182507'
    };

    useEffect(()=> {
        axios.get(endPoint + new URLSearchParams(parameters))
            .then(val => {
                // console.log("val", val);
                // console.log("val.data.response.groups[0].items", val.data.response.groups[0].items);
                let list = val.data.response.groups[0].items;
                // console.log("list", list);
                setPosts(list);
            })
            .catch(err => {
                console.log("err ", err);
            });
    },[]);

    return (
        <div>
            <ul>
                {
                    posts.map(val => (<li key={val.venue.id}> {val.venue.name}</li>))
                }
            </ul>
        </div>
    );
}
//foursquareapi



// const CLIENT_ID = 'PWIYCNRHNU45LQELQCQEJJYEZ4XK5BFEAPBSP2CA0WLBNMDE';
// const CLIENT_SECRET = 'S4IADFOPXD25YHVQ0CE0Z4Y2R2QCTPSM4S1IL542ZTGFIZGL';
//
// export const geListFromApi = async () => {
//     try {
//         let response
//         = await
//         fetch (`https://api.foursquare.com/v2/venues/explore?cat=food&near=Berlin&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=20182507`);
//         let responseJson = await response.json();
//         console.log("responseJson", responseJson);
//         console.log("responseJson", responseJson.response);
//         console.log("responseJson", responseJson.response.groups[0]);
//         console.log("responseJson", responseJson.response.groups[0].items);
//         let all = await responseJson.response.groups[0].items;
//         console.log("all", all);
//     } catch (err) {
//         console.log("err", err);
//     }
// };


// export default function Location () {
//
//     const endPoint = "https://api.foursquare.com/v2/venues/explore?";
//     const parameters = {
//         client_id: "PWIYCNRHNU45LQELQCQEJJYEZ4XK5BFEAPBSP2CA0WLBNMDE",
//         client_secret: "S4IADFOPXD25YHVQ0CE0Z4Y2R2QCTPSM4S1IL542ZTGFIZGL",
//         query: "food",
//         near: "Berlin",
//         v: '20182507'
//     };
//
//     axios.get(endPoint + new URLSearchParams(parameters))
//         .then(val => {
//             console.log("val", val);
//         })
//         .catch(err => {
//             console.log("err ", err);
//         });
//
//     // console.log("val", val.data.response.groups[0].items);
//     // let list = val.data.response.groups[0].items;
//
//     // console.log("list", list);
//     // console.log("list.venue.name", list[0].venue.name);
//     // console.log("list.venue.lat", list[0].venue.location.lat);
//     // for(let i = 0; i < list.length; i++) {
//     //     console.log(list[i].venue);
//     //     arr.push(list[i].venue);
//     // }
//     // return arr;
//     return (
//         <div></div>
//     );
// }

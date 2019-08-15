import React, { useState, useEffect } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import axios from './axios';

export default function SelectedPlaces(props) {
    // console.log("props in SelectedPlaces ", props);
    // console.log("props in SelectedPlaces.id ", props.id);

    useEffect(() => {
        console.log("check relation status");
        (async () => {
            try {
                const data = await axios.post('/visitedplaces', { id: props.id });
                console.log('data in selectedplaces', data);
            } catch(err) {
                console.log("err in SelectedPlaces btn", err);
            }
        })();
    }, []);


    return (
        <div className="selected-places-in">
            <p>PLACES</p>
        </div>
    );
}

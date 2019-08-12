import React, { useState, useEffect } from 'react';
import axios from './axios';
import { useDispatch, useSelector } from "react-redux";
import {getFourSquare} from './actions';

export default function Location () {

    const dispatch = useDispatch();

    const endPoint = "https://api.foursquare.com/v2/venues/explore?";
    const parameters = {
        client_id: "PWIYCNRHNU45LQELQCQEJJYEZ4XK5BFEAPBSP2CA0WLBNMDE",
        client_secret: "S4IADFOPXD25YHVQ0CE0Z4Y2R2QCTPSM4S1IL542ZTGFIZGL",
        query: "sight",
        near: "Berlin",
        v: '20182507'
    };

    useEffect(()=> {
        dispatch(getFourSquare(endPoint, parameters));
    },[]);

    return (
        <div></div>
    );
}

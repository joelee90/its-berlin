import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from './axios';
import {getGooglePlacesApi} from './actions';

export default function GoogleApi () {
    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(getGooglePlacesApi());
    },[]);
    return (
        <div></div>
    );
}

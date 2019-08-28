import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from './axios';
import {getHereApi} from './actions';

export default function Hereapi () {
    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(getHereApi());
    },[]);
    return (
        <div></div>
    );
}

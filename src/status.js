import React, { useState, useEffect } from 'react';
import axios from './axios';
import { Route, BrowserRouter, Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import * as Berlin from './places.json';
import { getPlaces } from './actions';

export default function Status () {

    const dispatch = useDispatch();

    useEffect(
        () => {
            dispatch(getPlaces(Berlin));
        },[]
    );
    //axios to get the list of places the user clicked
    const currentPlaces = useSelector(
        state => state.places && state.places
            .filter(function(val) {
                return val.accepted == false;
            })
    );
    console.log("currentPlaces in status", currentPlaces);

    return (
        <div className="status-places">
            <div className="listof">
                <h4><img src="/images/bb.png"/>Discover Complete</h4>
                <div className="places-in-profile">
                    {
                        currentPlaces&&currentPlaces.map(
                            val => (
                                <div className="placesin-not-visited" key={val.id}>
                                    {val.place_name}
                                </div>))
                    }
                </div>
            </div>
            <div className="listof">
                <h4><img src="/images/bbg.png"/>Discover Berlin</h4>
                <div className="places-in-profile">
                    {
                        Berlin.results.map(
                            val => (
                                <div className="placesin" key={val.id}>
                                    {val.name}
                                </div>))
                    }
                </div>
            </div>
        </div>
    );
}

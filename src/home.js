import React from 'react';
import ProfilePic from './profilepic';
import { HashRouter, Route } from 'react-router-dom';

export default function Home(props) {
    return (
        <div className="home">
            <h1>Discover Berlin</h1>
            <img style = {{ width: "300px" }} src = "/images/homeimg.jpg"/>
        </div>
    );
}

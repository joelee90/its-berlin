import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

export default function Home() {
    return (
        <div className="home">
            <h1>it's Berlin</h1>
            <img style = {{ width: "200px" }} src = "/images/home.jpg"/>
        </div>
    );
}

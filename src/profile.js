import React, { useState, useEffect } from 'react';
import axios from "./axios";
import Status from './status';

export default function Profile() {

    const [name, setName] = useState();

    useEffect(() => {
        console.log("profile rendering!");
        (async () => {
            const {data} = await axios.post('/checkusername');
            console.log("data checkusername", data);
            setName(data.data);
        })();
    }),[];

    return (
        <div>
            <div>
                <h1>Welcome {name}</h1>
            </div>
            <div className="profile-body">
                <div className="profile-box">
                    <Status />
                </div>
            </div>
        </div>
    );
}

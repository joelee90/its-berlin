import React from 'react';
import { HashRouter, Route, Link } from 'react-router-dom';
import useForm from "./useForm";
import axios from './axios';

export default function Profile () {

    // const { values, handleChange, handleSubmit, error, setError } = useForm(registration);

    // async function Profile() {
    //     // console.log("values", values);
    //     try {
    //         let profile = await axios.post('/profile', { values });
    //         console.log("profile", profile);
    //     } catch(err) {
    //         console.log("err in regi client", err);
    //     }
    // }

    return (
        <div>
            <div className="profile-container">
                <textarea />
                <div>PROFILE</div>
            </div>
        </div>
    );
}

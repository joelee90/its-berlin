import React from 'react';
import { HashRouter, Route, Link } from 'react-router-dom';
import useForm from "./useForm";
import axios from './axios';

export default function Form () {

    const { values, handleChange, handleSubmit } = useForm(registration);

    async function registration() {
        console.log("values", values);
        try {
            let regi = await axios.post('/form', { values });
            console.log("regi", regi);
        } catch(err) {
            console.log("err in regi client", err);
        }
    }

    return (
        <div>
            <div className="regi-container">
                <form onSubmit = { handleSubmit } >
                    <input className="input" type="text" name="firstname" placeholder="firstname" onChange = { handleChange } value={values.firstname || ''} required />
                    <input className="input" type="text" name="lastname" placeholder="lastname" onChange = { handleChange } value={values.lastname || ''} required />
                    <input className="input" type="email" name="email" placeholder="email" onChange = { handleChange } value={values.email || ''}required />
                    <input className="input" type="text" name="phonenumber" placeholder="phonenumber" onChange = { handleChange } value={values.phonenumber || ''} required />
                    <input className="input" type="password" name="password" placeholder="password"  onChange = { handleChange } value={values.password || ''} required />
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div className="already-member">
                <h4 style = {{color: "#2A433B"}}> Already a member? <Link to = "/login" style = {{textDecoration: "none", color: "#258577"}}>Log in</Link> </h4>
            </div>
        </div>
    );
}

// <input type="text" name="firstname" placeholder="first name" onChange={ handleChange } required />
// <input type="text" name="lastname" placeholder="last name" onChange={ handleChange } required/>
// <input type="text" name="email" placeholder="email" onChange={ handleChange } required/>
// <input type="text" name="phone" placeholder="phone number" onChange={ handleChange } required/>
// <input type="password"  name="password" placeholder="password" onChange={ handleChange } required/>
// <button onClick={ submit }>Register</button>

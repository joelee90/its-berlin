import React from 'react';
import useForm from "./useForm";
// import axios from './axios';

export default function Login () {

    const { values, handleChange, handleSubmit, submit, error } = useForm(Login);

    return (
        <div>
            <div className="login-container">
                <form onSubmit = { handleSubmit } >
                    { error && <div className="error"> Ooops! Something went wrong! </div> }
                    <input className="input" type="email" name="email" placeholder="email" onChange = { handleChange } value={values.email || ''}required />
                    <input className="input" type="password" name="password" placeholder="password"  onChange = { handleChange } value={values.password || ''} required />
                    <button onClick = { submit } type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}

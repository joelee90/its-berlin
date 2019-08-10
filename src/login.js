import React from 'react';
import useForm from "./useForm";
import axios from './axios';

export default function Login () {

    const { values, handleChange, submit, error, setError } = useForm(logging);

    async function logging () {
        // console.log("values", values);
        try {
            let log = await axios.post('/login', { values });
            console.log("log", log.data);
            if(log.data.login) {
                location.replace('/');
            } else {
                setError(true);
            }
        } catch(err) {
            console.log("err in login client", err);
        }
    }

    return (
        <div>
            <div className="login-container">
                <form onSubmit = { submit } >
                    { error && <div className="error"> Ooops! Something went wrong! </div> }
                    <input className="input" type="email" name="email" placeholder="email" onChange = { handleChange } value={values.email || ''}required />
                    <input className="input" type="password" name="password" placeholder="password"  onChange = { handleChange } value={values.password || ''} required />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}

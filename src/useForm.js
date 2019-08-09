import { useState } from 'react';
import axios from './axios';

const useForm = (callback) => {

    const [values, setValues] = useState({});
    const [error, setError] = useState();

    const handleSubmit = (event) => {
        if (event) event.preventDefault();
        callback();
    };

    const handleChange = (event) => {
        event.persist();
        setValues(values => ({ ...values, [event.target.name]: event.target.value }));
    };

    const submit = async () => {
        try {
            let log = await axios.post('/login', { values });
            console.log("log", log.data);
            if(log.login) {
                location.replace('/');
            } else {
                setError(true);
            }
        } catch(err) {
            console.log("err in login client", err);
        }
    };


    return {
        handleChange,
        handleSubmit,
        values,
        submit,
        error
    };
};

export default useForm;

import { useState } from 'react';

const useForm = (callback) => {

    const [values, setValues] = useState({});
    const [error, setError] = useState();

    //register
    const handleSubmit = (event) => {
        if (event) event.preventDefault();
        callback();
    };

    const handleChange = (event) => {
        event.persist();
        setValues(values => ({ ...values, [event.target.name]: event.target.value }));
    };

    //login
    const submit = (event) => {
        if (event) event.preventDefault();
        callback();
    };

    return {
        handleChange,
        handleSubmit,
        submit,
        values,
        error,
        setError
    };
};

export default useForm;

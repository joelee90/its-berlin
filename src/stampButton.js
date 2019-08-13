import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from './axios';
import Location from './location';

export default function StampButton (props) {
    // console.log("props", props);

    const [button, setButton] = useState();
    console.log("button", button);

    useEffect(() => {
        console.log("check button status");
        (async () => {
            try {
                const data = await axios.post('/checkVisited', {button}, { id: props.id });
                // console.log("data.data.buttonText", data.buttonText);
                console.log("data.data.buttonText", data.data.buttonText);
                setButton(data.data.buttonText);
            } catch(err) {
                console.log("err in submit btn", err);
            }
        })();

    }, []);

    async function submit() {
        console.log("submit btn!!");
        try {
            const data = await axios.post('/changePlaceStatus', {button}, { id: props.id }, );
            console.log("data", data);
            setButton(data.data.buttonText);
        } catch (err) {
            console.log("err in submit btn", err);
        }
    }

    return (
        <div>
            <button className="button" onClick = { submit }>{button}</button>
        </div>
    );
}

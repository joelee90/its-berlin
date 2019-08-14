import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from './axios';

export default function StampButton (props) {
    // console.log("props", props);

    const [button, setButton] = useState();
    // console.log("buttonfffff", button);

    useEffect(() => {
        console.log("check button status");
        (async () => {
            try {
                // console.log("buttoniiii", button);
                // console.log("props.id", props.id);
                const data = await axios.post('/checkVisited', { id: props.id });
                // console.log("data.data.buttonText", data.buttonText);
                // console.log("data.data.buttonText", data.data.buttonText);
                setButton(data.data.buttonText);
            } catch(err) {
                console.log("err in submit btn", err);
            }
        })();
    }, []);

    async function submit() {
        console.log("submit btn!!");
        // console.log("button submit", button);
        try {
            const data = await axios.post('/changePlaceStatus', { id: props.id, button: button} );
            // console.log("data", data);
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

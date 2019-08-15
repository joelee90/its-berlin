import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from './axios';
import { getPlaces, addPlacesList, removePlacesList } from './actions';

export default function StampButton (props) {
    // console.log("props.name", props.name);
    // console.log("props.id", props.id);
    // console.log("props.placeId", props.place_id);

    const [button, setButton] = useState();
    // console.log("buttonup", button);

    useEffect(() => {
        console.log("check button status");
        (async () => {
            try {
                // console.log("buttoniiii", button);
                // console.log("props.name", props.name);
                // console.log("props.id", props.id);
                const data = await axios.post('/checkVisited', { name: props.name, id: props.id, button: props.button });
                // console.log("data.data.buttonText", data.buttonText);
                // console.log("data.data.buttonText", data.data.buttonText);
                setButton(data.data.buttonText);
            } catch(err) {
                console.log("err in submit btn", err);
            }
        })();
    }, []);

    return (
        <div>
            <button className="button" onClick = { () => props.submit(props.place_id, props.buttonText, props.name ) }>{props.buttonText}</button>
        </div>
    );
}

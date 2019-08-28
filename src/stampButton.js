import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from './axios';
import { getPlaces, addPlacesList, removePlacesList } from './actions';

export default function StampButton (props) {

    const [button, setButton] = useState();
    useEffect(() => {
        console.log("check button status");
        (async () => {
            try {
                const data = await axios.post('/checkVisited', { name: props.name, id: props.id, button: props.button });
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

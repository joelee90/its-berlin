import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from './axios';
import Location from './location';

export default function StampButton () {

    return (
        <div>
            <button className="stamp-btn">Berliner</button>
        </div>
    );
}

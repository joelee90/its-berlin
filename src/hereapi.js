import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from './axios';
import {getHereApi} from './actions';

export default function Hereapi () {
    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(getHereApi());
    },[]);
    return (
        <div></div>
    );
}


//before changing to redux
// export default function Hereapi () {
//
//     const dispatch = useDispatch();
//     const [ posts, setPosts ] = useState([]);
//     const app_id = "4DjRj1IufRVQzXL4j4i2";
//     const app_code = "xfJ5Sdac7wGS-RPjyyw1Bg";
//
//     useEffect(()=> {
//         dispatch(getHereApi());
//     },[]);
//
//     useEffect(()=> {
//         axios.get(`https://places.cit.api.here.com/places/v1/discover/around?app_id=${app_id}&app_code=${app_code}&at=52.50449,13.39091&pretty`)
//             .then(val => {
//                 console.log("val.data.results.items", val.data.results.items);
//                 let here = val.data.results.items;
//                 setPosts(here);
//             })
//             .catch(err => {
//                 console.log("err ", err);
//             });
//     },[]);
//
//     return (
//         <div>
//         <ul>
//             {
//                 posts.map(val => (<li key={val.id}> {val.title}</li>))
//             }
//         </ul>
//         </div>
//     );
// }

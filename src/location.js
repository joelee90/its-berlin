import React, { useState, useEffect } from 'react';
import axios from './axios';

export default function Location () {

    const [ posts, setPosts ] = useState([]);

    const endPoint = "https://api.foursquare.com/v2/venues/explore?";
    const parameters = {
        client_id: "PWIYCNRHNU45LQELQCQEJJYEZ4XK5BFEAPBSP2CA0WLBNMDE",
        client_secret: "S4IADFOPXD25YHVQ0CE0Z4Y2R2QCTPSM4S1IL542ZTGFIZGL",
        query: "sight",
        near: "Berlin",
        v: '20182507'
    };

    useEffect(()=> {
        axios.get(endPoint + new URLSearchParams(parameters))
            .then(val => {
                // console.log("val", val);
                // console.log("val.data.response.groups[0].items", val.data.response.groups[0].items);
                let list = val.data.response.groups[0].items;
                // console.log("list", list);
                setPosts(list);
            })
            .catch(err => {
                console.log("err ", err);
            });
    },[]);

    return (
        <div>
            <ul>
                {
                    posts.map(val => (<li key={val.venue.id}> {val.venue.name}</li>))
                }
            </ul>
        </div>
    );
}




// const CLIENT_ID = 'PWIYCNRHNU45LQELQCQEJJYEZ4XK5BFEAPBSP2CA0WLBNMDE';
// const CLIENT_SECRET = 'S4IADFOPXD25YHVQ0CE0Z4Y2R2QCTPSM4S1IL542ZTGFIZGL';
//
// export const geListFromApi = async () => {
//     try {
//         let response
//         = await
//         fetch (`https://api.foursquare.com/v2/venues/explore?cat=food&near=Berlin&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=20182507`);
//         let responseJson = await response.json();
//         console.log("responseJson", responseJson);
//         console.log("responseJson", responseJson.response);
//         console.log("responseJson", responseJson.response.groups[0]);
//         console.log("responseJson", responseJson.response.groups[0].items);
//         let all = await responseJson.response.groups[0].items;
//         console.log("all", all);
//     } catch (err) {
//         console.log("err", err);
//     }
// };


// export default function Location () {
//
//     const endPoint = "https://api.foursquare.com/v2/venues/explore?";
//     const parameters = {
//         client_id: "PWIYCNRHNU45LQELQCQEJJYEZ4XK5BFEAPBSP2CA0WLBNMDE",
//         client_secret: "S4IADFOPXD25YHVQ0CE0Z4Y2R2QCTPSM4S1IL542ZTGFIZGL",
//         query: "food",
//         near: "Berlin",
//         v: '20182507'
//     };
//
//     axios.get(endPoint + new URLSearchParams(parameters))
//         .then(val => {
//             console.log("val", val);
//         })
//         .catch(err => {
//             console.log("err ", err);
//         });
//
//     // console.log("val", val.data.response.groups[0].items);
//     // let list = val.data.response.groups[0].items;
//
//     // console.log("list", list);
//     // console.log("list.venue.name", list[0].venue.name);
//     // console.log("list.venue.lat", list[0].venue.location.lat);
//     // for(let i = 0; i < list.length; i++) {
//     //     console.log(list[i].venue);
//     //     arr.push(list[i].venue);
//     // }
//     // return arr;
//     return (
//         <div></div>
//     );
// }

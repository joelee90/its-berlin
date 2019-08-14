import axios from './axios';

export async function getFourSquare (endPoint, parameters) {
    // console.log("getFourSquare", endPoint, parameters);
    try {
        let data = await axios.get(endPoint + new URLSearchParams(parameters));
        // console.log("data", data);
        // console.log("data", data.data.response.groups[0].items);
        let specificData = data.data.response.groups[0].items;
        // let arr = [];
        // specificData.forEach(i =>
        //     arr.push(i.venue.id)
        // );
        // console.log("arr", arr);
        // let specificDataforDb = data.data.response.groups[0].items;
        // let saveData = await axios.post('/saveHereApi');
        // console.log("saveData", saveData);
        return {
            type: "GET_FOUR_SQUARE",
            post: specificData
        };
    } catch(err) {
        console.log("err in actions fourSquare", err);
    }
}

export async function getHereApi () {
    console.log("getHereApi");
    try {
        const app_id = "4DjRj1IufRVQzXL4j4i2";
        const app_code = "xfJ5Sdac7wGS-RPjyyw1Bg";
        let data = await axios.get(`https://places.cit.api.here.com/places/v1/discover/around?app_id=${app_id}&app_code=${app_code}&at=52.50449,13.39091&pretty`);
        // console.log("data hereapi", data);
        // console.log("data hereapi", data.data.results.items);
        let specificDataHere = data.data.results.items;
        // let saveData = await axios.post('/saveHereApi', specificDataHere);
        // console.log("saveData", saveData);
        return {
            type: "GET_HERE_API",
            posthere: specificDataHere
        };
    } catch(err) {
        console.log("err in actions hereapi", err);
    }
}

export async function getGooglePlacesApi () {
    console.log("getGooglePlacesApi");
    try {
        let data = await axios.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=52.520008,13.404954&radius=5000&type=topsights&key=AIzaSyC_1b_D0SpU6lX1j6NDkIf0iDsA9ZQujyU");
        console.log("google data", data);
        // let googleApiData = data;
        return {
            type: "GET_GOOGLE_PLACES_API",
            postgoogle: data
        };
    } catch(err) {
        console.log("err in actions googleApi", err);
    }
}

// https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Germany&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyC_1b_D0SpU6lX1j6NDkIf0iDsA9ZQujyU
//
// "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=52.516667,13.388889&radius=5000&key=AIzaSyC_1b_D0SpU6lX1j6NDkIf0iDsA9ZQujyU;
//
// https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=52.516667,13.388889&radius=5000&type=topsights&key=AIzaSyC_1b_D0SpU6lX1j6NDkIf0iDsA9ZQujyU;


// https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=52.516667,13.388889&radius=5000&type=topsights?&key=AIzaSyC_1b_D0SpU6lX1j6NDkIf0iDsA9ZQujyU

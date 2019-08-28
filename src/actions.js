import axios from './axios';

export function chatMessages(data) {
    // console.log("10 chatMessages", data);
    return {
        type: "CHAT_MESSAGES",
        message: data
    };
}

export function newChatMessage(data) {
    // console.log("newChatMessage", data);
    return {
        type: "NEW_CHAT_MESSAGE",
        message: data
    };
}

export async function getPlaces(berlin) {
    const data = await axios.get('/updatedplaces');
    console.log("data in getPlaces", data);
    return {
        type: "GET_PLACES",
        places: data.data.rows
    };
}

export async function addPlacesList(id, buttonText, sender, placeId) {
    return {
        type: "ADD_LIST",
        id: id,
        buttonText: buttonText,
        name: sender,
        placeId: placeId
    };
}

export async function removePlacesList(id, button, sender, placeId) {
    const data = await axios.post('/changePlaceStatus',{id, name, placeId, button});
    return {
        type: "REMOVE_LIST",
        id
    };
}

export default function(state = {}, action) {

    if(action.type == 'GET_PLACES') {
        state = {
            ...state,
            places: action.places
        };
    }

    if(action.type == 'ADD_LIST') {
        console.log('ADD_LIST');
        state = {
            ...state,
            places: [...state.places, {
                accepted: false,
                id: action.id,
                place_id: action.id,
                place_name: action.name
            }]
        };
    }

    if(action.type == 'REMOVE_LIST') {

        state = {
            ...state,
            places: state.places.filter(place => {
                console.log('REMOVE_LIST');
                console.log(place.place_id, action.id);
                return place.place_id != action.id;
            })
        };
    }

    if(action.type == 'CHAT_MESSAGES') {
        // console.log("CHAT_MESSAGES");
        state = {
            ...state,
            message: action.message
        };
    }

    if(action.type == 'NEW_CHAT_MESSAGE') {
        // console.log("NEW_CHAT_MESSAGE");
        state = {
            ...state,
            message: [...state.message, action.message]
        };
    }


    // if(action.type == 'GET_FOUR_SQUARE') {
    //     console.log("GET_FOUR_SQUARE");
    //     state = {
    //         ...state,
    //         post: action.post
    //     };
    // }
    //
    // if(action.type == 'GET_HERE_API') {
    //     console.log("GET_HERE_API");
    //     state = {
    //         ...state,
    //         posthere: action.posthere
    //     };
    // }
    //
    // if(action.type == 'GET_GOOGLE_PLACES_API') {
    //     console.log("GET_GOOGLE_PLACES_API");
    //     state = {
    //         ...state,
    //         postgoogle: action.postgoogle
    //     };
    // }

    return state;
}

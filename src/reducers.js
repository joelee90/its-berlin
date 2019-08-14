export default function(state = {}, action) {

    if(action.type == 'GET_FOUR_SQUARE') {
        console.log("GET_FOUR_SQUARE");
        state = {
            ...state,
            post: action.post
        };
    }

    if(action.type == 'GET_HERE_API') {
        console.log("GET_HERE_API");
        state = {
            ...state,
            posthere: action.posthere
        };
    }

    if(action.type == 'GET_GOOGLE_PLACES_API') {
        console.log("GET_GOOGLE_PLACES_API");
        state = {
            ...state,
            postgoogle: action.postgoogle
        };
    }

    return state;
}

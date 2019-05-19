import { GET_ERROR, CLEAR_ERROR } from '../actions/types';
const initState = {};

export default function(state = initState, action) {
    switch(action.type) {
        case GET_ERROR:
            return action.payload
        case CLEAR_ERROR:
            return {}
        default: 
            return state;
    }
};
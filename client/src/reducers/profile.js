import { PROFILE_LOADING, GET_PROFILE } from '../actions/types';

const initState = {
    loading: false,
    profile: null,
    profiles: null,
};

export default (state = initState, action) => {
    switch(action.type){
        case PROFILE_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_PROFILE: 
            return {
                ...state,
                loading: false,
                profile: action.payload
            }            
        default:
            return state;
    }
}
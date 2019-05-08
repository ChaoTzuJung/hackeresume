import axios from 'axios';
import { GET_ERROR } from './types';

export const registerUser = userData => dispatch => {
    axios
        .post('/api/users/register', userData)
        .then(res => console.log(res.data))
        .catch(err => 
            dispatch({
                type: GET_ERROR,
                payload: err.response.data
            })
        );
};
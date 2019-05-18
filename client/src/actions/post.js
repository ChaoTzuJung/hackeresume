import axios from 'axios';
import { ADD_POST, GET_ERROR, GET_POSTS } from './types';

// Add Post
export const addPost = postData => dispatch => {
    axios
        .post('/api/posts', postData)
        .then(res => dispatch({ type: ADD_POST, payload: res.data }))
        .catch(err => dispatch({ type: GET_ERROR, payload: err.response.data }));
};

// Get Posts
export const getPosts = () => dispatch => {
    axios
        .get('/api/posts')
        .then(res => dispatch({ type: GET_POSTS, payload: res.data }))
        .catch(err => dispatch({ type: GET_POSTS, payload: null }));
};
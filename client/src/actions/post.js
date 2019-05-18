import axios from 'axios';
import { ADD_POST, GET_ERROR, GET_POSTS, POST_LOADING, DELETE_POST } from './types';

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

// Set loading state
export const setPostLoading = () => {
    return {
        type: POST_LOADING
    };
};

// Delete Post
export const deletePost = id => dispatch => {
    axios
        .delete(`/api/posts/${id}`)
        .then(res => dispatch({ type: DELETE_POST, payload: id })) // 重要: 刪除是送id給reducer
        .catch(err => dispatch({ type: GET_ERROR, payload: err.response.data}));
};

// Add Like
export const addLike = id => dispatch => {
    axios
        .post(`/api/posts/like/${id}`)
        .then(res => dispatch(getPosts())) // 重要 getPosts 是更新 like資訊
        .catch(err =>
        dispatch({ type: GET_ERROR, payload: err.response.data }));
};

// Remove Like
export const removeLike = id => dispatch => {
    axios
        .post(`/api/posts/unlike/${id}`)
        .then(res => dispatch(getPosts())) // 重要 getPosts 是更新 like資訊
        .catch(err =>
        dispatch({ type: GET_ERROR, payload: err.response.data }));
};

import axios from 'axios';
import { ADD_POST, GET_ERROR, GET_POSTS, POST_LOADING, DELETE_POST, GET_POST, CLEAR_ERROR } from './types';

// Add Post
export const addPost = postData => dispatch => {
    dispatch(clearErrors());
    axios
        .post('/api/posts', postData)
        .then(res => dispatch({ type: ADD_POST, payload: res.data }))
        .catch(err => dispatch({ type: GET_ERROR, payload: err.response.data }));
};

// Get All Posts
export const getPosts = () => dispatch => {
    dispatch(setPostLoading());
    axios
        .get('/api/posts')
        .then(res => dispatch({ type: GET_POSTS, payload: res.data }))
        .catch(err => dispatch({ type: GET_POSTS, payload: null }));
};

// Get single Post
export const getPost = id => dispatch => {
    dispatch(setPostLoading());
    axios
        .get(`/api/posts/${id}`) // 重要: 會用網址的 :id 取相對post
        .then(res => dispatch({ type: GET_POST, payload: res.data }))
        .catch(err => dispatch({ type: GET_POST, payload: null }));
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

// Add comment
export const addComment = (commentId, commentData) => dispatch => {
    dispatch(clearErrors());
    axios
        .post(`/api/posts/comment/${commentId}`, commentData)
        // 超重要: 為何是GET_POST? 最後因為接收action payload(comments array（內涵多個object）) 的 global state 仍是 post object
        .then(res => dispatch({ type: GET_POST, payload: res.data }))
        .catch(err => dispatch({ type: GET_ERROR, payload: err.response.data }));
};


// Delete Comment
export const deleteComment = (postId, commentId) => dispatch => {
    axios
        .delete(`/api/posts/comment/${postId}/${commentId}`)
        .then(res => dispatch({ type: GET_POST, payload: res.data }))
        .catch(err => dispatch({ type: GET_ERROR, payload: err.response.data}));
};

// Clear errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERROR
    };
};

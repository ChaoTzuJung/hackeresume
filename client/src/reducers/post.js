import {
    ADD_POST,
    GET_POSTS,
    GET_POST,
    DELETE_POST,
    POST_LOADING
} from '../actions/types';

// 重要: post的資料結構
const initialState = {
    posts: [],
    post: {},
    loading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
        }
}
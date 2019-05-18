import { ADD_POST } from '../actions/types';

// 重要: post的資料結構
const initialState = {
    posts: [],
    post: {},
    loading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        // 重要: 就是單純在 array 內新增一個 object
        case ADD_POST:
        return {
            ...state,
            // 重要: action.payload 是一個 Object 內含 id/text/name/avatar/user/likes/comment
            posts: [action.payload, ...state.posts],
        }
        default:
            return state;
        }
}
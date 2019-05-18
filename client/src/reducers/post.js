import { ADD_POST, POST_LOADING, GET_POSTS, DELETE_POST } from '../actions/types';

// 重要: post的資料結構
const initialState = {
    posts: [],
    post: {},
    loading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case POST_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload, // 把 data 放入 Object
                loading: false
            };
        // 重要: 就是單純在 array 內新增一個 object
        case ADD_POST:
            return {
                ...state,
                // 重要: action.payload 是一個 Object 內含 id/text/name/avatar/user/likes/comment
                posts: [action.payload, ...state.posts],
            }
        case DELETE_POST:
            return {
                ...state,
                // 重要: 刪除的語法，回傳不符合id的，也就是沒有被翻廚的
                posts: state.posts.filter(post => post._id !== action.payload),
            }
        default:
            return state;
        }
}
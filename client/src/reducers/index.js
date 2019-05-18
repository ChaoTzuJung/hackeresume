import { combineReducers } from 'redux';
import auth from './auth';
import errors from './errors';
import profile from './profile';
import post from './post';

export default combineReducers({
    // 重要: 這邊變數的命名，都決定你的mapStateToProps的state可以接什麼data
    auth,
    errors,
    profile,
    post,
})
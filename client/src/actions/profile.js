import axios from 'axios';
import { PROFILE_LOADING, GET_PROFILE, CLEAR_CURRENT_PROFILE, GET_ERROR } from './types';

export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios
        .get('/api/profile')
        .then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
        .catch(err => dispatch({ type: GET_PROFILE, payload: {} }))
};

export const setProfileLoading = () => ({
    type: PROFILE_LOADING,
});

export const clearCurrentProfile = () => ({
    type: CLEAR_CURRENT_PROFILE,
});

// withRouter: pass this.props.history to component and do redirect
export const createProfile = (profileData ,history) => dispatch => {
    axios
        .post('/api/profile', profileData)
        .then(res => history.push('/dashboard'))
        .catch(err => 
            dispatch({
                type: GET_ERROR,
                payload: err.response.data
            })
        );
}
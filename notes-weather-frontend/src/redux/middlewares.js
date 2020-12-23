import * as constants from './constants';

import { logoutUser, removeItemFromLocalStorage } from './actions/authActionCreators'

import axios from 'axios';

export const apiMiddleware = ({ dispatch, getState }) => next => action => {
    if (action.type !== constants.API) return next(action);

    dispatch({ type: constants.TOGGLE_LOADER });
    const BASE_URL = 'http://localhost:3001';
    const AUTH_TOKEN = getState().user.token;
    if (AUTH_TOKEN)
        axios.defaults.headers.common['Authorization'] = `Bearer ${AUTH_TOKEN}`;

    const { url, method, success, data, postProcessSuccess, postProcessError } = action.payload;

    if (url === '/api/login')
        delete axios.defaults.headers.common["Authorization"];

    axios({
        method,
        url: BASE_URL + url,
        data: data ? data : null,
        headers: {
            'Content-Type': 'application/json', 'Accept': '*/*'
        }
    }).then((response) => {
        dispatch({ type: constants.TOGGLE_LOADER });
        if (success) dispatch(success(response));
        if (postProcessSuccess) postProcessSuccess(response);
    }).catch(error => {
        dispatch({ type: constants.TOGGLE_LOADER });
        if (typeof(error.response) === "undefined") {
            // console.warn(error);
            postProcessError('An error has ocurred');
        } else {
            if (error.response && error.response.status === 403){
                dispatch(logoutUser());
            }                
            if (error.response && error.response.status === 401){
                removeItemFromLocalStorage();
                dispatch(logoutUser());
            }
            if (error.response.data.errors[0].message) {
                if (postProcessError) postProcessError(error.response.data.errors[0].message);
            }
        }
    })
};
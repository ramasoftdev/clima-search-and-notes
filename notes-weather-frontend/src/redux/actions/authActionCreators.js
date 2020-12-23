import * as constants from '../constants';

export const registerUser = (data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'POST',
        url: '/api/signup',
        data,
        success: (response) => (setUserInfo(response)),
        postProcessSuccess: onSuccess,
        postProcessError: onError 
    }
});

export const loginUser = (data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'POST',
        url: '/api/login',
        data,
        success: (response) => (setUserInfo(response)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

export const logoutUser = (data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'DELETE',
        url: '/api/logout',
        success: (response) => (resetUserInfo(response)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

const setUserInfo = (data) => {
    const parsedToken = data.headers.authorization.split(' ')[1];
    const userInfo = {
        userId: data.data.id,
        email: `${data.data.email}`,
        username: `${data.data.username}`,
        token: parsedToken,
        isLoggedIn: true 
    };
    localStorage.setItem('USER_INFO', JSON.stringify(userInfo));
    return {type: constants.SET_USER_INFO, payload: userInfo};
};

const resetUserInfo = (data) => {
    localStorage.removeItem('USER_INFO');
    return {type: constants.RESET_USER_INFO };
}

export const removeItemFromLocalStorage = () => {
    localStorage.removeItem('USER_INFO');
}
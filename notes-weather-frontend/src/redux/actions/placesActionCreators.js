import * as constants from '../constants';

export const fetchAllPlaces = () => ({
    type: constants.API,
    payload: {
        method: 'GET',
        url: '/api/get_places',
        success: (response) => (setAllplaces(response))
    }
});

const setAllplaces = (data) => ({
    type: constants.SET_ALL_PLACES,
    payload: data
});
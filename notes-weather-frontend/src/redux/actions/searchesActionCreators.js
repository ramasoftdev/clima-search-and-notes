import * as constants from '../constants';

export const fetchAllSearches = (data) => ({
    type: constants.API,
    payload: {
        method: 'GET',
        url: `/api/searches/?${getValueOnPage(data.page, data.per_page)}`,
        success: (response) => (setAllSearches(response))
    }
});

export const createSearch = (data, page, per_page, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'POST',
        url: `/api/searches/?${getValueOnPage(page, per_page)}`,
        data,
        success: (search) => (addSearch(search)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
})

export const deleteSearchById = (searchId, page, per_page, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: "DELETE",
        url: `/api/searches/${searchId}/?${getValueOnPage(page, per_page)}`,
        success: (search) => (removeSearch(search)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

const addSearch = (search) => ({
    type: constants.ADD_SEARCH,
    payload: search
});

const setAllSearches = (data) => ({
    type: constants.SET_ALL_SEARCHES,
    payload: data
});
const removeSearch = ( searchId ) => ({
    type: constants.REMOVE_SEARCH,
    payload: searchId
})

const getValueOnPage = (page, per_page) => {
    page = (typeof (page) === "undefined" || page === "undefined") ? 1 : String(page);
    per_page = (typeof (per_page) === "undefined" || per_page === "undefined") ? 10 : String(per_page);
    return `page=${page}&per_page=${per_page}`
}
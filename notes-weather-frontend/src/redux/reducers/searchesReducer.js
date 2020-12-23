import * as constants from '../constants';

const initialSate = {
    searches: [],
    currentPage: 1,
    perPage: 10,
    totalPages: 0
}

export default function searchesReducer(state = initialSate, action){
    switch(action.type){
        case constants.SET_ALL_SEARCHES:
            return {
                ...state,
                searches: action.payload.data.searches,
                currentPage: action.payload.data.page,
                totalPages: action.payload.data.pages
            };
        case constants.ADD_SEARCH:
            return {
                ...state,
                searches: action.payload.data.searches,
                currentPage: action.payload.data.page,
                totalPages: action.payload.data.pages
            };
        case constants.REMOVE_SEARCH:
            return {
                ...state,
                searches: action.payload.data.searches,
                currentPage: action.payload.data.page,
                totalPages: action.payload.data.pages
            };
        case constants.RESET_USER_INFO:
            return [];
        default:
            return state;
    }
}
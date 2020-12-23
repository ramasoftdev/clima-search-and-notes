import * as constants from '../constants';

const initialSate = {
    notes: [],
    currentPage: 1,
    perPage: 10,
    totalPages: 0
}

export default function notesReducer(state = initialSate, action){
    switch(action.type){
        case constants.SET_ALL_NOTES:
            return {
                ...state,
                notes: action.payload.data.notes,
                currentPage: action.payload.data.page,
                totalPages: action.payload.data.pages
            };
        case constants.ADD_NOTE:
            return {
                ...state,
                notes: action.payload.data.notes,
                currentPage: action.payload.data.page,
                totalPages: action.payload.data.pages
            };
        case constants.UPDATE_NOTE:
            return {
                ...state,
                notes: action.payload.data.notes,
                currentPage: action.payload.data.page,
                totalPages: action.payload.data.pages
            };
        case constants.REMOVE_NOTE:
            return {
                ...state,
                notes: action.payload.data.notes,
                currentPage: action.payload.data.page,
                totalPages: action.payload.data.pages
            };
        case constants.RESET_USER_INFO:
            return [];
        default:
            return state;
    }
}
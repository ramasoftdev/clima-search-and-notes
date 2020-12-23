import * as constants from '../constants';

export const fetchAllNotes = (data) => ({
    type: constants.API,
    payload: {
        method: 'GET',
        url: `/api/notes/?${getValueOnPage(data.page, data.per_page)}`,
        success: (response) => (setAllNotes(response))
    }
});

export const createNote = (data, page, per_page, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'POST',
        url: `/api/notes/?${getValueOnPage(page, per_page)}`,
        data,
        success: (note) => (addNote(note)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
})

export const getNoteById = (noteId, onSuccess) => ({
    type: constants.API,
    payload: {
        method: "GET",
        url: `/api/notes/${noteId}`,
        postProcessSuccess: onSuccess
    }
});

export const updateNoteById = (noteId, page, per_page, data, onSuccess, onError) => (
    {
    type: constants.API,
    payload: {
        method: "PUT",
        url: `/api/notes/${noteId}/?${getValueOnPage(page, per_page)}`,
        data,
        success: (data) => (updateNote(data)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
})

export const deleteNoteById = (noteId, page, per_page, onSuccess, onError) => (
    {
        type: constants.API,
        payload: {
            method: "DELETE",
            url: `/api/notes/${noteId}/?${getValueOnPage(page, per_page)}`,
            success: (note) => (removeNote(note)),
            postProcessSuccess: onSuccess,
            postProcessError: onError
        }
    });

const addNote = (note) => ({
    type: constants.ADD_NOTE,
    payload: note
});

const setAllNotes = (data) => ({
    type: constants.SET_ALL_NOTES,
    payload: data
});

const updateNote = (data) => ({
    type: constants.UPDATE_NOTE,
    payload: data
});

const removeNote = (noteId) => ({
    type: constants.REMOVE_NOTE,
    payload: noteId
})

const getValueOnPage = (page, per_page) => {
    page = (typeof (page) === "undefined" || page === "undefined") ? 1 : String(page);
    per_page = (typeof (per_page) === "undefined" || per_page === "undefined") ? 10 : String(per_page);
    return `page=${page}&per_page=${per_page}`
}
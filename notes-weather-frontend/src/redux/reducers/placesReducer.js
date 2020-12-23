import * as constants from '../constants';

const defaultState = {
    placeId: null,
    city_name: null
}

const INITIAL_STATE = defaultState;

export default function placeReducer(state = INITIAL_STATE, action){
    switch(action.type){
        case constants.SET_ALL_PLACES:
            return action.payload;
        default:
            return state;
    }
}
import { combineReducers } from 'redux';
import loading from './loadingReducer';
import notes from './notesReducer';
import places from './placesReducer';
import searches from './searchesReducer'
import user from './userReducer';

const rootReducer = combineReducers({user, loading, notes, places, searches});

export default rootReducer;
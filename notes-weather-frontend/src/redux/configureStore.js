import { applyMiddleware, compose, createStore } from 'redux';

import {apiMiddleware} from './middlewares';
import rootReducer from './reducers';

export default function configureStore(initialState){
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(apiMiddleware)));
}

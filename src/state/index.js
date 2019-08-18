import reducer from './reducers';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { readFile } from './thunks';

export default function storeFactory() {
    return createStore(reducer, applyMiddleware(thunk, logger));
}

export {
    readFile
}
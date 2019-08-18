import ACTION_TYPES from './actiontypes';
import { combineReducers } from 'redux';

function file(state = null, action) {
    switch (action.type) {
        case ACTION_TYPES.LOAD_FILE:
            return action.value;
        default:
            return state;
    }
}



export default combineReducers({file});
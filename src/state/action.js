import ACTION_TYPES from './actiontypes';

export const loadFile = value => ({
    type: ACTION_TYPES.LOAD_FILE,
    value
});
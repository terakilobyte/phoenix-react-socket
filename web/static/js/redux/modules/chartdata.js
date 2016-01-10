import { createAction, handleActions } from 'redux-actions';

// ---------------------------
// Constants
// ---------------------------
export const NEW_DATA = 'NEW_DATA';

// ---------------------------
// Actions
// ---------------------------

export const newData = createAction(NEW_DATA, (payload) => payload);

export const actions = {
  newData
};

// ---------------------------
// Reducer
// ---------------------------
const initialState = {
  data: []
};

export default handleActions({
  [NEW_DATA] : (state, { payload }) => {
    return Object.assign({}, state, payload);
  }
}, initialState);

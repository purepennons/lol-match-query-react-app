import { all } from "redux-saga/effects";
import createReducer from "@funnyfoo/create-reducer-redux";

/*
* ---------------- Other Exports -----------------
*/

/*
* ---------------- Action ------------------------
*/
export const Types = {
  SET_INITIALIZING_STATE: Symbol("SET_INITIALIZING_STATE")
};

/*
 * ---------------- Reducer ----------------------
 */
export const defaultValues = {
  isInitializing: false
};

export const initialState = defaultValues;

export default createReducer(
  [
    [
      Types.SET_INITIALIZING_STATE,
      (state, { payload }) => ({
        ...state,
        isInitializing: payload.isInitializing
      })
    ]
  ],
  initialState
);

/*
 * ---------------- Action Creators --------------
 */
export const setInitializingState = isInitializing => ({
  type: Types.SET_INITIALIZING_STATE,
  payload: { isInitializing }
});

/*
 * ---------------- Side Effects -----------------
 */

/*
 * ---------------- Saga Effects -----------------
 */
export const saga = {
  init: function* init() {},
  process: function* process() {
    yield all([]);
  }
};

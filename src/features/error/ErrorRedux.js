import { all } from "redux-saga/effects";
import createReducer from "@funnyfoo/create-reducer-redux";

/*
* ---------------- Other Exports -----------------
*/

/*
* ---------------- Action ------------------------
*/
export const Types = {
  ADD_ERROR: "ADD_ERROR",
  REMOVE_ERROR: "REMOVE_ERROR"
};

/*
 * ---------------- Reducer ----------------------
 */
export const defaultError = {
  hasError: false,
  title: null,
  desc: null,
  obj: null
};

export const initialState = defaultError;

export default createReducer(
  [
    [
      Types.ADD_ERROR,
      (state, { payload }) => ({ ...state, ...payload, hasError: true })
    ],
    [Types.REMOVE_ERROR, state => defaultError]
  ],
  initialState
);

/*
 * ---------------- Action Creators --------------
 */
export const addError = ({ title, desc, obj }) => {
  return {
    type: Types.ADD_ERROR,
    payload: {
      title,
      desc,
      obj
    }
  };
};

export const removeError = () => {
  return {
    type: Types.REMOVE_ERROR
  };
};

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

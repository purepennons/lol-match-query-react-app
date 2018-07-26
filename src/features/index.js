import { combineReducers } from "redux";
import { call, fork, all } from "redux-saga/effects";

import error, { saga as errorSaga } from "./error/ErrorRedux";

/*
* ---------------- Action ------------------------
*/
export const Types = {
  RESET_SAGA: "RESET_SAGA"
};

/*
 * ---------------- root reducer -----------------
 */
export const rootReducer = combineReducers({
  error
});

/*
 * ---------------- root saga -----------------
 */
const sagas = [errorSaga];

// Because we want to support HMR with redux-saga,
// we must return a new saga function.
// show details: https://stackoverflow.com/a/40783428
export function getRootSaga() {
  return function* rootSaga() {
    yield all(sagas.map(saga => call(saga.init)));
    yield all(sagas.map(saga => fork(saga.process)));
  };
}

import { combineReducers } from "redux";
import { call, fork, all, put } from "redux-saga/effects";

import error, { saga as errorSaga } from "./error/ErrorRedux";
import shared, {
  saga as sharedSaga,
  setInitializingState
} from "./shared/SharedRedux";
import game, { saga as gameSaga } from "./game/GameRedux";
import staticData, { saga as staticSaga } from "./static/StaticRedux";

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
  error,
  shared,
  game,
  staticData
});

/*
 * ---------------- root saga -----------------
 */
const sagas = [errorSaga, sharedSaga, gameSaga, staticSaga];

// Because we want to support HMR with redux-saga,
// we must return a new saga function.
// show details: https://stackoverflow.com/a/40783428
export function getRootSaga() {
  return function* rootSaga() {
    yield put(setInitializingState(true));
    yield all(sagas.map(saga => call(saga.init)));
    yield put(setInitializingState(false));

    yield all(sagas.map(saga => fork(saga.process)));
  };
}

import { all, call, put } from "redux-saga/effects";
import createReducer from "@funnyfoo/create-reducer-redux";

import { getChampions, getItems, getSpells } from "../../apis/requests";

/*
* ---------------- Other Exports -----------------
*/

/*
* ---------------- Action ------------------------
*/
export const Types = {
  SET_ITEMS: Symbol("SET_ITEMS"),
  SET_CHAMPIONS: Symbol("SET_CHAMPIONS"),
  SET_SPELLS: Symbol("SET_SPELLS")
};

/*
 * ---------------- Reducer ----------------------
 */
export const defaultValues = {
  items: {},
  champions: {},
  spells: {}
};

export const initialState = defaultValues;

export default createReducer(
  [
    [Types.SET_ITEMS, (state, { payload }) => ({ ...state, items: payload })],
    [
      Types.SET_CHAMPIONS,
      (state, { payload }) => ({ ...state, champions: payload })
    ],
    [Types.SET_SPELLS, (state, { payload }) => ({ ...state, spells: payload })]
  ],
  initialState
);

/*
 * ---------------- Action Creators --------------
 */
export const setItems = items => ({
  type: Types.SET_ITEMS,
  payload: items
});

export const setChampions = champions => ({
  type: Types.SET_CHAMPIONS,
  payload: champions
});

export const setSpells = spells => ({
  type: Types.SET_SPELLS,
  payload: spells
});

/*
 * ---------------- Side Effects -----------------
 */

/*
 * ---------------- Saga Effects -----------------
 */
export const saga = {
  init: function* init() {
    yield call(getStaticContent);
  },
  process: function* process() {
    yield all([]);
  }
};

export function* getStaticContent() {
  try {
    const responses = yield all([
      call(getItems),
      call(getChampions),
      call(getSpells)
    ]);
    const data = responses.map(res => res.data.data);
    yield put(setItems(data[0]));
    yield put(setChampions(data[1]));
    yield put(setSpells(data[2]));
  } catch (err) {}
}

import { clone } from "lodash";
import {
  all,
  call,
  fork,
  put,
  select,
  takeLatest,
  takeEvery
} from "redux-saga/effects";
import createReducer from "@funnyfoo/create-reducer-redux";

import {
  getUserByName,
  getMatchesByAccountID,
  getMatchByGameID
} from "../../apis/requests";
import { ajax, normalize } from "../../shared/utils/";
import { addError } from "../error/ErrorRedux";

/*
* ---------------- Other Exports -----------------
*/

/*
* ---------------- Action ------------------------
*/
export const Types = {
  SET_SUMMONER: Symbol("SET_SUMMONER"),
  SET_PAGE_INFO: Symbol("SET_PAGE_INFO"),
  ADD_GAMES: Symbol("ADD_GAMES"),
  ADD_SUMMONER_GAMES: Symbol("ADD_SUMMONERGAMES"),
  ADD_VISIBLE_GAMES: Symbol("ADD_VISIBLE_GAMES"),
  RESET_STATE: Symbol("RESET_STATE"),
  QUERY_GAMES_BY_ACCOUNT_NAME: Symbol("QUERY_GAMES_BY_ACCOUNT_NAME"),
  LOAD_MORE_GAMES: Symbol("LOAD_MORE_GAMES"),
  SET_FETCHING_STATUS: Symbol("SET_FETCHING_STATUS")
};

/*
 * ---------------- Reducer ----------------------
 */
export const defaultValues = {
  summoner: {},
  games: {},
  summonerGames: [],
  visibleGames: [],
  isFetching: false,
  page: {
    currentPage: 0,
    perPages: 5
  }
};

export const initialState = defaultValues;

export default createReducer(
  [
    [
      Types.SET_SUMMONER,
      (state, { payload }) => ({ ...state, summoner: payload })
    ],
    [
      Types.SET_PAGE_INFO,
      (state, { payload }) => ({
        ...state,
        page: { ...state.page, ...payload }
      })
    ],
    [
      Types.ADD_GAMES,
      (state, { payload }) => {
        const newGames = clone(state.games);
        payload.forEach(
          game => (newGames[game.gameId] = normalize.normalizeGame(game))
        );
        return { ...state, games: newGames };
      }
    ],
    [
      Types.ADD_SUMMONER_GAMES,
      (state, { payload }) => ({ ...state, summonerGames: payload })
    ],
    [
      Types.ADD_VISIBLE_GAMES,
      (state, { payload }) => ({
        ...state,
        visibleGames: state.visibleGames.concat(payload)
      })
    ],
    [
      Types.SET_FETCHING_STATUS,
      (state, { payload }) => ({ ...state, isFetching: payload.isFetching })
    ],
    [Types.RESET_STATE, () => defaultValues]
  ],
  initialState
);

/*
 * ---------------- Action Creators --------------
 */
export const setFetchingStatus = isFetching => ({
  type: Types.SET_FETCHING_STATUS,
  payload: { isFetching }
});

export const queryGamesByName = name => ({
  type: Types.QUERY_GAMES_BY_ACCOUNT_NAME,
  payload: { name }
});

export const setUser = user => ({
  type: Types.SET_SUMMONER,
  payload: user
});

export const setSummonerGames = games => ({
  type: Types.ADD_SUMMONER_GAMES,
  payload: games
});

export const addGames = games => ({
  type: Types.ADD_GAMES,
  payload: games
});

export const addVisibleGames = games => ({
  type: Types.ADD_VISIBLE_GAMES,
  payload: games
});

export const setPageInfo = page => ({
  type: Types.SET_PAGE_INFO,
  payload: page
});

export const resetState = () => ({
  type: Types.RESET_STATE
});

export const loadMore = () => ({
  type: Types.LOAD_MORE_GAMES
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
    yield all([
      fork(
        takeLatest,
        Types.QUERY_GAMES_BY_ACCOUNT_NAME,
        queryGamesByNameWorker
      ),
      fork(takeEvery, Types.LOAD_MORE_GAMES, loadMoreWorker)
    ]);
  }
};

export function* initGameQuery(accountId) {
  const { data: gameList } = yield call(getMatchesByAccountID, accountId);
  const summonerGames = gameList.matches.map(match => match.gameId);
  yield put(setSummonerGames(summonerGames));
  yield put(setPageInfo(defaultValues.page));
}

export function* loadMoreGames() {
  const { summoner, summonerGames, page } = yield select(({ game }) => game);
  const { perPages, currentPage } = page;
  if (perPages * currentPage >= summonerGames.length) return;
  const startIndex = perPages * currentPage;
  const endIndex =
    startIndex + perPages > summonerGames.length
      ? summonerGames.length
      : startIndex + perPages;
  const nextPage = currentPage + 1;
  const subGameIDs = summonerGames.slice(startIndex, endIndex);
  const responses = yield all(
    subGameIDs.map(gameId => call(getMatchByGameID, gameId))
  );
  const newGames = responses.map(res => res.data);
  yield put(addVisibleGames(subGameIDs));
  yield put(addGames(newGames));
  yield put(setPageInfo({ currentPage: nextPage }));
}

export function* queryGamesByNameWorker({ payload }) {
  yield put(resetState());
  yield put(setFetchingStatus(true));
  try {
    const { name } = payload;
    const { data: user } = yield call(getUserByName, name);
    yield put(setUser(user));
    yield call(initGameQuery, user.accountId);

    // first time fetching
    yield call(loadMoreGames);
  } catch (err) {
  } finally {
    yield put(setFetchingStatus(false));
  }
}

export function* loadMoreWorker() {
  yield put(setFetchingStatus(true));
  try {
    yield call(loadMoreGames);
  } catch (err) {
  } finally {
    yield put(setFetchingStatus(false));
  }
}

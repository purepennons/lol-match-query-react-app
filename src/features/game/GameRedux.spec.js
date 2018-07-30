import { testSaga } from "redux-saga-test-plan";
import * as gameRedux from "./GameRedux";
import reducer from "./GameRedux";
import * as errorRedux from "../error/ErrorRedux";
import * as apis from "../../apis/requests";

describe("reducer", () => {
  let initialState;

  beforeEach(() => {
    initialState = gameRedux.defaultValues;
  });

  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should test Types.SET_SUMMONER case", () => {
    expect(reducer(initialState, gameRedux.setUser({ name: "user" }))).toEqual({
      summoner: { name: "user" },
      games: {},
      summonerGames: [],
      visibleGames: [],
      isFetching: false,
      page: {
        currentPage: 0,
        perPages: 5
      }
    });
  });

  it("should test Types.SET_PAGE_INFO case", () => {
    expect(
      reducer(
        initialState,
        gameRedux.setPageInfo({
          currentPage: 5,
          perPages: 10,
          otherInfo: "otherInfo"
        })
      )
    ).toEqual({
      summoner: {},
      games: {},
      summonerGames: [],
      visibleGames: [],
      isFetching: false,
      page: {
        currentPage: 5,
        perPages: 10,
        otherInfo: "otherInfo"
      }
    });
  });

  it("should test Types.ADD_GAMES case", () => {
    /*TODO: need fake data*/
  });

  it("should test Types.ADD_SUMMONER_GAMES case", () => {
    expect(reducer(initialState, gameRedux.setSummonerGames([]))).toEqual({
      summoner: {},
      games: {},
      summonerGames: [],
      visibleGames: [],
      isFetching: false,
      page: {
        currentPage: 0,
        perPages: 5
      }
    });

    expect(reducer(initialState, gameRedux.setSummonerGames([123]))).toEqual({
      summoner: {},
      games: {},
      summonerGames: [123],
      visibleGames: [],
      isFetching: false,
      page: {
        currentPage: 0,
        perPages: 5
      }
    });

    expect(
      reducer(
        {
          summoner: {},
          games: {},
          summonerGames: [123],
          visibleGames: [],
          isFetching: false,
          page: {
            currentPage: 0,
            perPages: 5
          }
        },
        gameRedux.setSummonerGames([456, 789])
      )
    ).toEqual({
      summoner: {},
      games: {},
      summonerGames: [456, 789],
      visibleGames: [],
      isFetching: false,
      page: {
        currentPage: 0,
        perPages: 5
      }
    });
  });

  it("should test Types.ADD_VISIBLE_GAMES case", () => {
    expect(
      reducer(
        initialState,
        gameRedux.addVisibleGames([{ gameId: 1, data: { some: "data" } }])
      )
    ).toEqual({
      summoner: {},
      games: {},
      summonerGames: [],
      visibleGames: [{ gameId: 1, data: { some: "data" } }],
      isFetching: false,
      page: {
        currentPage: 0,
        perPages: 5
      }
    });

    expect(
      reducer(
        {
          summoner: {},
          games: {},
          summonerGames: [],
          visibleGames: [{ gameId: 1, data: { some: "data" } }],
          isFetching: false,
          page: {
            currentPage: 0,
            perPages: 5
          }
        },
        gameRedux.addVisibleGames([{ gameId: 2, data: { some: "data2" } }])
      )
    ).toEqual({
      summoner: {},
      games: {},
      summonerGames: [],
      visibleGames: [
        { gameId: 1, data: { some: "data" } },
        { gameId: 2, data: { some: "data2" } }
      ],
      isFetching: false,
      page: {
        currentPage: 0,
        perPages: 5
      }
    });
  });

  it("should test Types.SET_FETCHING_STATUS case", () => {
    expect(reducer(initialState, gameRedux.setFetchingStatus(true))).toEqual({
      summoner: {},
      games: {},
      summonerGames: [],
      visibleGames: [],
      isFetching: true,
      page: {
        currentPage: 0,
        perPages: 5
      }
    });
  });
});

describe("queryGamesByNameWorker", () => {
  const name = "doublelift";
  const user = {
    id: 20132258,
    accountId: 32971449,
    name: "Doublelift",
    profileIconId: 3270,
    revisionDate: 1532812591000,
    summonerLevel: 86
  };

  it("should test the saga step by step (correct path)", async () => {
    const saga = testSaga(
      gameRedux.queryGamesByNameWorker,
      gameRedux.queryGamesByName(name)
    );
    return saga
      .next()
      .put(gameRedux.resetState())
      .next()
      .put(errorRedux.removeError())
      .next()
      .put(gameRedux.setFetchingStatus(true))
      .next()
      .call(apis.getUserByName, name)
      .next({ data: user })
      .put(gameRedux.setUser(user))
      .next()
      .call(gameRedux.initGameQuery, user.accountId)
      .next()
      .call(gameRedux.loadMoreGames)
      .next()
      .put(gameRedux.setFetchingStatus(false))
      .next()
      .isDone();
  });

  it("should test the saga step by step (error path with 404)", async () => {
    const saga = testSaga(
      gameRedux.queryGamesByNameWorker,
      gameRedux.queryGamesByName(name)
    );
    const NOTFOUND_ERR = new Error("not found");
    NOTFOUND_ERR.response = { status: 404 };

    return saga
      .next()
      .put(gameRedux.resetState())
      .next()
      .put(errorRedux.removeError())
      .next()
      .put(gameRedux.setFetchingStatus(true))
      .next()
      .throw(NOTFOUND_ERR)
      .put(
        errorRedux.addError({
          title: "Not Found Error",
          desc: `data not found`,
          obj: NOTFOUND_ERR
        })
      )
      .next()
      .put(gameRedux.setFetchingStatus(false))
      .next()
      .isDone();
  });

  it("should test the saga step by step (error path with 500)", async () => {
    const saga = testSaga(
      gameRedux.queryGamesByNameWorker,
      gameRedux.queryGamesByName(name)
    );

    const OTHER_ERR = new Error("other error");
    OTHER_ERR.response = { status: 500 };

    return saga
      .next()
      .put(gameRedux.resetState())
      .next()
      .put(errorRedux.removeError())
      .next()
      .put(gameRedux.setFetchingStatus(true))
      .next()
      .throw(OTHER_ERR)
      .put(gameRedux.setFetchingStatus(false))
      .next()
      .isDone();
  });
});

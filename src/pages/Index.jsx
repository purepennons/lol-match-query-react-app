import React from "react";
import { connect } from "react-redux";
import { compose, bindActionCreators } from "redux";
import classnames from "classnames/bind";

import { queryGamesByName } from "../features/game/GameRedux";
import SearchBar from "../components/SearchBar/SearchBar";
import MatchList from "../features/game/containers/MatchList";
import { loadMore } from "../features/game/GameRedux";
import styles from "./Index.module.scss";

const cx = classnames.bind(styles);

const enhance = compose(
  connect(
    ({ game, error }) => ({
      page: game.page,
      summonerGames: game.summonerGames,
      isFetching: game.isFetching,
      hasError: error.hasError
    }),
    dispatch => bindActionCreators({ queryGamesByName, loadMore }, dispatch)
  )
);

const Index = ({
  isFetching,
  page,
  summonerGames,
  queryGamesByName,
  loadMore,
  hasError
}) => {
  const { perPages, currentPage } = page;
  const hasMoreData = perPages * currentPage < summonerGames.length;
  return (
    <div className={cx("index")}>
      <SearchBar onSearch={queryGamesByName} />
      <div className={cx("game-history")}>
        <MatchList />
      </div>
      {hasMoreData &&
        !isFetching &&
        !hasError && (
          <button className={cx("load-more-btn")} onClick={loadMore}>
            Load More
          </button>
        )}
      {hasError && <p className={cx("not-found-error")}>Summoner not found</p>}
      {isFetching && <p className={cx("loader")}>Loading...</p>}
    </div>
  );
};

export default enhance(Index);

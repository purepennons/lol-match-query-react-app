import React from "react";
import { connect } from "react-redux";
import { compose, bindActionCreators } from "redux";
import classnames from "classnames/bind";

import { queryGamesByName } from "../features/game/GameRedux";
import SearchBar from "../components/SearchBar/SearchBar";
import MatchList from "../features/game/containers/MatchList";
import styles from "./Index.module.scss";

const cx = classnames.bind(styles);

const enhance = compose(
  connect(
    null,
    dispatch => bindActionCreators({ queryGamesByName }, dispatch)
  )
);

const Index = ({ queryGamesByName }) => {
  return (
    <div className={cx("index")}>
      <SearchBar onSearch={queryGamesByName} />
      <div className={cx("game-history")}>
        <MatchList />
      </div>
    </div>
  );
};

export default enhance(Index);

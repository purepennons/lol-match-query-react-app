import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames/bind";
import { compose } from "redux";
import { connect } from "react-redux";
import { get } from "lodash";

import Game from "../../../components/Game/Game";
import styles from "./MatchList.module.scss";

const cx = classnames.bind(styles);

const enhance = compose(
  connect(
    ({ staticData, game }) => {
      return {
        staticItems: staticData.items,
        staticChampions: staticData.champions,
        staticSpells: staticData.spells,
        summonerGames: game.summonerGames,
        summoner: game.summoner,
        isFetching: game.isFetching,
        matches: game.visibleGames
          .map(gameId => get(game, ["games", gameId]))
          .filter(g => !!g)
      };
    },
    null
  )
);

const MatchList = ({
  isFetching,
  staticItems,
  staticChampions,
  staticSpells,
  summoner,
  matches
}) => {
  console.log(summoner, matches, staticItems, staticChampions, staticSpells);
  return (
    <div className={cx("match-list")}>
      {matches.map(match => {
        const player = match.players.find(
          p => summoner.accountId === p.accountId
        );
        const team = match.players.filter(p => player.teamId === p.teamId);
        const opponent = match.players.filter(p => player.teamId !== p.teamId);
        return (
          <Game
            key={match.gameId}
            staticItems={staticItems}
            staticChampions={staticChampions}
            staticSpells={staticSpells}
            win={player.win}
            gameCreation={match.gameCreation}
            gameDuration={match.gameDuration}
            player={player}
            team={team}
            opponent={opponent}
          />
        );
      })}
    </div>
  );
};

export default enhance(MatchList);

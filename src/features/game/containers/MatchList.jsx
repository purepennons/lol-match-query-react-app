import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { get } from "lodash";

import Game from "../../../components/Game/Game";

const enhance = compose(
  connect(
    ({ staticData, game }) => {
      return {
        staticItems: staticData.items,
        staticChampions: staticData.champions,
        staticChampionsKeys: staticData.championsKeys,
        staticSpells: staticData.spells,
        summonerGames: game.summonerGames,
        summoner: game.summoner,
        matches: game.visibleGames
          .map(gameId => get(game, ["games", gameId]))
          .filter(g => !!g)
      };
    },
    null
  )
);

const MatchList = ({
  staticItems,
  staticChampions,
  staticChampionsKeys,
  staticSpells,
  summoner,
  matches
}) => {
  return (
    <div>
      {matches.map(match => {
        const player = match.players.find(
          p => summoner.accountId === p.accountId
        );
        const team = match.players.filter(p => {
          return player.teamId === p.teamId;
        });
        const opponent = match.players.filter(p => player.teamId !== p.teamId);

        return (
          <Game
            key={match.gameId}
            staticItems={staticItems}
            staticChampions={staticChampions}
            staticChampionsKeys={staticChampionsKeys}
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

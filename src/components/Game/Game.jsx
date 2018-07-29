import React from "react";
import PropTypes from "prop-types";
import timeago from "time-ago";
import { get, pick } from "lodash";
import classnames from "classnames/bind";

import { getChampionAvatarURL, getSummonerSpellURL } from "../../apis/cdn";
import Items from "../Items/Items";
import styles from "./Game.module.scss";

const cx = classnames.bind(styles);

const pickItemsFromPlayer = player =>
  pick(player, ["item0", "item1", "item2", "item3", "item4", "item5", "item6"]);

const TeamMembers = ({ players, staticChampions }) => {
  return (
    <ul className={cx("team-block")}>
      {players.map((player, idx) => {
        const championName = get(staticChampions, [player.championId, "name"]);
        return (
          <li key={idx}>
            <img
              src={getChampionAvatarURL(championName)}
              alt={championName}
              title={championName}
            />
            <span>{player.summonerName}</span>
          </li>
        );
      })}
    </ul>
  );
};

const Game = ({
  staticItems,
  staticChampions,
  staticSpells,
  win,
  gameCreation,
  gameDuration,
  player,
  team,
  opponent
}) => {
  const championName = get(staticChampions, [player.championId, "name"]);
  const spell1Name = get(staticSpells, [player.spell1Id, "key"]);
  const spell2Name = get(staticSpells, [player.spell2Id, "key"]);

  return (
    <div className={cx("game", { win: win, defeat: !win })}>
      <div className={cx("status")}>
        <h2>{win ? "Victory" : "Defeat"}</h2>
        <p>{timeago.ago(new Date(gameCreation))}</p>
        <p>{parseInt(gameDuration / 60)} mins</p>
        <p>Team: {player.teamId === 100 ? "Blue" : "Red"}</p>
      </div>
      <div className={cx("champion")}>
        <div className={cx("top")}>
          <div className={cx("profile")}>
            <img
              src={getChampionAvatarURL(championName)}
              alt={championName}
              title={championName}
            />
          </div>
          <div className={cx("spells")}>
            <img
              src={getSummonerSpellURL(spell1Name)}
              alt={spell1Name}
              title={spell1Name}
            />
            <img
              src={getSummonerSpellURL(spell2Name)}
              alt={spell2Name}
              title={spell1Name}
            />
          </div>
        </div>
        <p className={cx("bottom")}>{championName}</p>
      </div>
      <div className={cx("perform")}>
        <p>
          {player.kills}/{player.deaths}/{player.assists}
        </p>
        <p>
          KDA:{" "}
          {Number((player.kills + player.assists) / player.deaths).toFixed(2)}
        </p>
      </div>
      <div className={cx("champion-info")}>
        <p>Level: {player.champLevel}</p>
        <p>
          {player.totalMinionsKilled}CS({Number(
            player.totalMinionsKilled / (gameDuration / 60)
          ).toFixed(1)})
        </p>
      </div>
      <div className="items">
        <Items staticItems={staticItems} {...pickItemsFromPlayer(player)} />
      </div>
      <div className="team">
        <TeamMembers staticChampions={staticChampions} players={team} />
      </div>
      <div className="opponent">
        <TeamMembers staticChampions={staticChampions} players={opponent} />
      </div>
    </div>
  );
};

const PlayerType = {
  accountId: PropTypes.number.isRequired,
  participantId: PropTypes.number.isRequired,
  teamId: PropTypes.number.isRequired,
  championId: PropTypes.number.isRequired,
  champLevel: PropTypes.number.isRequired,
  spell1Id: PropTypes.number.isRequired,
  spell2Id: PropTypes.number.isRequired,
  summonerName: PropTypes.string.isRequired,
  item0: PropTypes.number.isRequired,
  item1: PropTypes.number.isRequired,
  item2: PropTypes.number.isRequired,
  item3: PropTypes.number.isRequired,
  item4: PropTypes.number.isRequired,
  item5: PropTypes.number.isRequired,
  item6: PropTypes.number.isRequired,
  kills: PropTypes.number.isRequired,
  deaths: PropTypes.number.isRequired,
  assists: PropTypes.number.isRequired,
  totalMinionsKilled: PropTypes.number.isRequired,
  win: PropTypes.bool.isRequired
};

Game.propTypes = {
  staticItems: PropTypes.object.isRequired,
  staticChampions: PropTypes.object.isRequired,
  staticSpells: PropTypes.object.isRequired,
  win: PropTypes.boolean,
  gameCreation: PropTypes.number,
  gameDuration: PropTypes.number,
  player: PropTypes.shape(PlayerType),
  team: PropTypes.arrayOf(PropTypes.shape(PlayerType)),
  opponent: PropTypes.arrayOf(PropTypes.shape(PlayerType))
};

export default Game;

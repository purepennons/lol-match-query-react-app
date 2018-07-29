import { get, zip } from "lodash";

export const normalizePlayer = (participant, participantIdentity) => {
  const player = get(participantIdentity, ["player"]);
  const stats = get(participant, ["stats"]);
  return {
    accountId: get(player, ["currentAccountId"]),
    participantId: get(participantIdentity, ["participantId"]),
    teamId: get(participant, ["teamId"]),
    championId: get(participant, ["championId"]),
    champLevel: get(stats, ["champLevel"]),
    spell1Id: get(participant, ["spell1Id"]),
    spell2Id: get(participant, ["spell2Id"]),
    summonerName: get(player, ["summonerName"]),
    item0: get(stats, ["item0"]),
    item1: get(stats, ["item1"]),
    item2: get(stats, ["item2"]),
    item3: get(stats, ["item3"]),
    item4: get(stats, ["item4"]),
    item5: get(stats, ["item5"]),
    item6: get(stats, ["item6"]),
    kills: get(stats, ["kills"]),
    deaths: get(stats, ["deaths"]),
    assists: get(stats, ["assists"]),
    totalMinionsKilled: get(stats, ["totalMinionsKilled"]),
    win: get(stats, ["win"])
  };
};

export const normalizeGame = game => {
  const participants = get(game, ["participants"]);
  const participantIdentities = get(game, ["participantIdentities"]);
  const participantPairs = zip(participants, participantIdentities);
  return {
    gameId: get(game, ["gameId"]),
    gameCreation: get(game, ["gameCreation"]),
    gameDuration: get(game, ["gameDuration"]),
    players: participantPairs.map(pair => normalizePlayer(...pair))
  };
};

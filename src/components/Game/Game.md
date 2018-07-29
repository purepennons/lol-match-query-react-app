```js
const staticItems = {
  1001: {
    plaintext: 'Slightly increases Movement Speed',
    description:
      '<groupLimit>Limited to 1 pair of boots.</groupLimit><br><br><unique>UNIQUE Passive - Enhanced Movement:</unique> +25 Movement Speed',
    id: 1001,
    name: 'Boots of Speed'
  }
};

const staticChampions = {
  24: {
    title: 'Grandmaster at Arms',
    id: 24,
    key: 'Jax',
    name: 'Jax'
  }
};

const staticSpells = {
  4: {
    id: 4,
    summonerLevel: 7,
    name: 'Flash',
    key: 'SummonerFlash',
    description:
      "Teleports your champion a short distance toward your cursor's location."
  }
};

const player = {
  accountId: 1,
  participantId: 1,
  teamId: 100,
  championId: 24,
  champLevel: 10,
  spell1Id: 4,
  spell2Id: 4,
  summonerName: 'Summoner',
  item0: 1001,
  item1: 1001,
  item2: 1001,
  item3: 1001,
  item4: 0,
  item5: 1001,
  item6: 1001,
  kills: 5,
  deaths: 2,
  assists: 10,
  totalMinionsKilled: 202
};
const team = Array(5).fill(player);
<Game
  win
  staticItems={staticItems}
  staticChampions={staticChampions}
  staticSpells={staticSpells}
  gameCreation={1532712836299}
  gameDuration={1509}
  player={player}
  team={team}
  opponent={team}
/>;
```

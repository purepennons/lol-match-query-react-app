import axios from "axios";

import { Env } from "../config/";
import { ajax } from "../shared/utils/";

const qs = ajax.stringifyWithDefaultQuery({
  api_key: Env.LOL_API_KEY
});

const request = axios.create({
  baseURL: "/lol"
});

const getURL = (base, query = {}) => {
  return base + "?" + qs(query);
};

// summoner
export const getUserByName = name => {
  return request.get(getURL(`/summoner/v3/summoners/by-name/${name}`));
};

// match
export const getMatchesByAccountID = (id, query = { startIndex: 0 }) => {
  return request.get(getURL(`/match/v3/matchlists/by-account/${id}`, query));
};

export const getMatchByGameID = id => {
  return request.get(getURL(`/match/v3/matches/${id}`));
};

// champion
export const getChampions = (query = { dataById: true, tags: "keys" }) => {
  return request.get(getURL(`/static-data/v3/champions`, query));
};

export const getChampionByID = id => {
  return request.get(getURL(`/static-data/v3/champions/${id}`));
};

// spell
export const getSpells = (query = { dataById: true, tags: "key" }) => {
  return request.get(getURL(`/static-data/v3/summoner-spells`, query));
};

export const getSpellByID = id => {
  return request.get(getURL(`/static-data/v3/summoner-spells/${id}`));
};

// item
export const getItems = () => {
  return request.get(getURL(`/static-data/v3/items`));
};

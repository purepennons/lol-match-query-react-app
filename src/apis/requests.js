import axios from "axios";

import { Env } from "../config/";
import { ajax } from "../shared/utils/";

const qs = ajax.stringifyWithDefaultQuery({
  api_key: Env.LOL_API_KEY
});

const request = axios.create({
  baseURL: Env.HOST
});

const getURL = (base, query = {}) => {
  return base + "?" + qs(query);
};

// match
export const getMatchesByAccountID = id => {
  return request.get(getURL(`/match/v3/matchlists/by-account/${id}`));
};

export const getMatchByGameID = id => {
  return request.get(getURL(`/match/v3/matches/${id}`));
};

// champion
export const getChampions = (dataById = true) => {
  return request.get(getURL(`/static-data/v3/champions`, { dataById }));
};

export const getChampionByID = id => {
  return request.get(getURL(`/static-data/v3/champions/${id}`));
};

// spell
export const getSpells = (dataById = true) => {
  return request.get(getURL(`/static-data/v3/summoner-spells`, { dataById }));
};

export const getSpellByID = id => {
  return request.get(getURL(`/static-data/v3/summoner-spells/${id}`));
};

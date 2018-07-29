import { Env } from "../config/";

const imgCDN = `${Env.CDN_HOST}/${Env.LOL_VERSION}/img`;

const getCDNURL = url => imgCDN + url;

export const getProfileIconURL = id => getCDNURL(`/profileicon/${id}.png`);
export const getChampionAvatarURL = name => getCDNURL(`/champion/${name}.png`);
export const getSummonerSpellURL = name => getCDNURL(`/spell/${name}.png`);
export const getItemURL = id => getCDNURL(`/item/${id}.png`);
export const getRuneURL = id => getCDNURL(`/rune/${id}.png`);

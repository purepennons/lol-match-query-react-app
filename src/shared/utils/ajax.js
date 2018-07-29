import qs from "qs";

export const stringifyWithDefaultQuery = defaultQuery => query => {
  return qs.stringify({ ...defaultQuery, ...query });
};

import { isString } from "lodash";
import qs from "qs";

export const createRequestTypes = base => {
  if (!isString(base)) return {};
  const fetchTypes = ["PENDING", "FULFILLED", "REJECTED"];
  const types = fetchTypes.reduce((acc, type) => {
    const typeName = `${base}_${type}`;
    return { ...acc, [typeName]: typeName };
  }, {});
  if (base) types[base] = base;
  return types;
};

export const stringifyWithDefaultQuery = defaultQuery => query => {
  return qs.stringify({ ...defaultQuery, ...query });
};

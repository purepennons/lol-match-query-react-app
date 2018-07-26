import { pick } from "lodash";

// TODO: maybe post log to a service.
// current status: only print the log.
export const log = (level = "error", ...messages) => {
  console[level](`LEVEL: ${level.toUpperCase()}:`, ...messages);
};

export const parseError = err => {
  const errObj = pick(err, [
    "type",
    "timeStamp",
    "error",
    "filename",
    "message"
  ]);
  if (!errObj.time) errObj.time = Math.floor(new Date().getTime() / 1000);
  return errObj;
};

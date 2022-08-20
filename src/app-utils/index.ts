import axios, { Method } from "axios";
import { constants } from "./constants";

export const callAPI = (
  method: Method,
  url: string,
  body?: any,
  token = null
) => {
  return token
    ? axios({
        method: method,
        url: url,
        data: body || null,
        headers: { authorization: token },
      })
    : axios({
        method: method,
        url: url,
        data: body || null,
      });
};

export const capitalize = (word: string) => {
  return word[0].toUpperCase() + word.substring(1);
};

export { constants };

import axios from "axios";
import { constants } from "./constants";

export const callAPI = (method, url, body, token=null) => {
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


export {constants}
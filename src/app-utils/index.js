import axios from "axios";
import { constants } from "./constants";
const userToken = JSON.parse(localStorage.getItem("userToken"))?.encodedToken || "";

export const callAPI = (method, url, body, token = false) => {
  return token
    ? axios({
        method: method,
        url: url,
        data: body || null,
        headers: { authorization: userToken },
      })
    : axios({
        method: method,
        url: url,
        data: body || null,
      });
};

export const capitalize = (word) => {
  return word[0].toUpperCase() + word.substring(1);
};

export { constants };

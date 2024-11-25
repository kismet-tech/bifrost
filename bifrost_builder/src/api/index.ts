import axios, { AxiosInstance } from "axios";
import axiosRetry from "axios-retry";

const API_BASE_URL = "http://localhost:4000";
// const API_BASE_URL = "https://api.makekismet.com";

export const Api: AxiosInstance = axios.create({ baseURL: API_BASE_URL });
axiosRetry(Api, { retries: 3 });


export function jsonDateReviver(this: unknown, _key: string, value: unknown) {
    // plug this regex into regex101.com to understand how it works
    // matches 2019-06-20T12:29:43.288Z (with milliseconds) and 2019-06-20T12:29:43Z (without milliseconds)
    const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,}|)Z$/;
  
    if (typeof value === "string" && dateFormat.test(value)) {
      return new Date(value);
    }
  
    return value;
}  

export const client: AxiosInstance = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 60 * 1000,
  withCredentials: false,
  transformResponse: (res) => {
    try {
      return JSON.parse(res, jsonDateReviver);
    } catch {
       
      return res;
    }
  },
});

import { BifrostApi } from "./generated/services/bifrost-api";
export * from "./generated/types";

export const BifrostAPI = new BifrostApi(undefined, "", client);
import axios, { AxiosInstance } from "axios";
import axiosRetry from "axios-retry";

const API_BASE_URL = "http://localhost:4000";
// const API_BASE_URL = "https://api.makekismet.com";

export const Api: AxiosInstance = axios.create({ baseURL: API_BASE_URL });
axiosRetry(Api, { retries: 3 });

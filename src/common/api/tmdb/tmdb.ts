import axios, { AxiosRequestConfig } from "axios";
import { buildUrl } from "../../utils/url/url.helpers";

type SingleApiParam = number | string | boolean | undefined | null | ReadonlyArray<SingleApiParam>;

type ApiParams = {
  readonly [key: string]: SingleApiParam | ApiParams | ReadonlyArray<ApiParams>;
};

const TMDB_ACCESS_TOKEN = process.env.REACT_APP_TMDB_ACCESS_TOKEN;
const TMDB_API_PREFIX = process.env.REACT_APP_TMDB_API_PREFIX;

axios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${TMDB_ACCESS_TOKEN}`;
  config.withCredentials = false;

  config.baseURL = TMDB_API_PREFIX;

  return config;
});

axios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      console.error(error.response);
    }
  }
);

axios.get("authentication");

export const tmdbGet = <T = any>(url: string, params: ApiParams = {}, config?: AxiosRequestConfig): Promise<T> => {
  const requestUrl = buildUrl(url, params);

  return axios.get(requestUrl, config);
};

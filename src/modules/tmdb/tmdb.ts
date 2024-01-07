import { tmdbGet } from "../../common/api/tmdb/tmdb";
import { DirectorRow } from "../google/google";
import { popularitySort } from "./utils";

type CreditResult = {
  id: number;
  title: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  vote_average: number;
  job: string;
};

export type MovieDetails = {
  id: number;
  title: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  vote_average: number;
  poster?: string;
};

type PersonResult = {
  id: number;
  name: string;
  popularity: number;
  known_for_department: string;
  profile_path: string;
};

export type PersonDetails = DirectorRow & {
  id: number;
  profile_path: string;
  image?: string;
  movies?: MovieDetails[];
};

const TMDB_API_PREFIX = process.env.REACT_APP_TMDB_API_PREFIX;
const TMDB_IMAGE_PREFIX = process.env.REACT_APP_TMDB_IMAGE_PREFIX;

export const getImage = (path: string) => {
  return fetch(TMDB_IMAGE_PREFIX + path)
    .then((response) => response.blob())
    .then(URL.createObjectURL);
};

export const getPersonDetails = (director: DirectorRow): Promise<PersonDetails> => {
  const requestUrl = `search/person?query=${director.name}&include_adult=true`;

  return tmdbGet(requestUrl, undefined, { baseURL: TMDB_API_PREFIX })
    .then((data) => data.results)
    .then((results: PersonResult[]) =>
      results.filter(
        (result) => result.known_for_department === "Directing" || result.known_for_department === "Writing" || result.known_for_department === "Production"
      )
    )
    .then((results) => results.sort(popularitySort))
    .then((results) => results.at(0))
    .then((result) => (result ? { ...director, id: result.id, profile_path: result.profile_path } : { ...director, id: -1, profile_path: "" }))
    .then(async (result) => {
      const image = await getImage(result.profile_path);
      return { ...result, image };
    });
};

export const getPersonMovieCredits = async (id: number): Promise<MovieDetails[]> => {
  const requestUrl = `person/${id}/movie_credits`;

  const movies = await tmdbGet(requestUrl, undefined, { baseURL: TMDB_API_PREFIX })
    .then((data) => data.crew)
    .then((results: CreditResult[]) => results.filter((result) => result.job === "Director"))
    .then((results) => results.sort(popularitySort))
    .then((results) =>
      results.map((result) => ({
        id: result.id,
        title: result.title,
        popularity: result.popularity,
        poster_path: result.poster_path,
        release_date: result.release_date,
        vote_average: result.vote_average,
      }))
    )
    .then((movies) => movies.filter((movie) => !!movie.release_date && !!movie.poster_path));

  return Promise.all(
    movies.map(async (movie) => {
      const poster = await getImage(movie.poster_path);
      return { ...movie, poster };
    })
  );
};

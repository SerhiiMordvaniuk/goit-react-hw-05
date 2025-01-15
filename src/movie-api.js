import axios from "axios";

const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MmI4ZDU2ZjUyM2ZkZGFkN2IwNDk3YzkxZjU1MDljYyIsIm5iZiI6MTczNjM0MDU4My41NTUsInN1YiI6IjY3N2U3NDY3YjExZDA4ODExMTdiMGQ4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ErEJZJCVBs7RJpuYS50vsXTBwV5Km9x9E7MQ_AfCdbY";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common["Authorization"] = "Bearer " + TOKEN;
axios.defaults.headers.common["accept"] = "application/json";

const fetchMovie = async () => {
  const response = await axios.get("/trending/movie/day?language=en-US");

  return response;
};

export const fetchMovieById = async (id) => {
  const response = await axios.get(`movie/${id}`);
  return response.data;
};

export const fetchActorById = async (id) => {
  const response = await axios.get(`movie/${id}/credits`);
  return response.data;
};

export const fetchReviewById = async (id) => {
  const response = await axios.get(`movie/${id}/reviews?language=en-US&page=1`);
  return response.data;
};

export const fetchMovieByQuery = async (query) => {
  const response = await axios.get(
    `/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
  );
  return response;
};

export default fetchMovie;

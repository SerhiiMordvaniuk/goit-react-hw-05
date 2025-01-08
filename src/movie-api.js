import axios from "axios";

const KEY = "92b8d56f523fddad7b0497c91f5509cc";
const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MmI4ZDU2ZjUyM2ZkZGFkN2IwNDk3YzkxZjU1MDljYyIsIm5iZiI6MTczNjM0MDU4My41NTUsInN1YiI6IjY3N2U3NDY3YjExZDA4ODExMTdiMGQ4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ErEJZJCVBs7RJpuYS50vsXTBwV5Km9x9E7MQ_AfCdbY";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common["Authorization"] = "Bearer " + TOKEN;
axios.defaults.headers.common["accept"] = "application/json";

const fetchMovie = async () => {
  const response = axios.get("/trending/movie/day?language=en-US");
  return response;
};

export default fetchMovie;

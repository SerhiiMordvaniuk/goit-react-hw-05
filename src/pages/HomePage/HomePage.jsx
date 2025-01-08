import React, { useEffect, useState } from "react";
import s from "./HomePage.module.css";
import fetchMovie from "../../movie-api";
import MovieList from "../../components/MovieList/MovieList";

const HomePage = () => {
  const [movieList, setMovieList] = useState(false);

  useEffect(() => {
    async function fetchMovieList() {
      const data = await fetchMovie();
      setMovieList(data);
    }
    fetchMovieList();
  }, []);
  return (
    <>
      <p>Home page</p>
      {/* {movieList ? "ok" : "Loading"} */}
      <MovieList list={movieList.data} />
    </>
  );
};

export default HomePage;

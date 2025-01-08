import React, { useEffect, useState } from "react";
import s from "./HomePage.module.css";
import fetchMovie from "../../movie-api";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";

const HomePage = () => {
  const [movieList, setMovieList] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    async function fetchMovieList() {
      try {
        setLoader(true);
        const data = await fetchMovie();
        if (!data) {
          return;
        } else {
          setMovieList(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
      }
    }
    fetchMovieList();
  }, []);
  return (
    <>
      <h2 className={s.title}>Tranding today</h2>
      {loader && <Loader />}
      <MovieList list={movieList.data} />
    </>
  );
};

export default HomePage;

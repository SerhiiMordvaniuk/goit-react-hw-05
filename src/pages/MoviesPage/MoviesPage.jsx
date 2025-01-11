import React, { useEffect, useState } from "react";
import s from "./MoviesPage.module.css";
import MovieList from "../../components/MovieList/MovieList";
import { fetchMovieByQuery } from "../../movie-api";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";

const MoviesPage = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [movieList, setMovieList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setQuery(event.target.elements.query.value.toLowerCase());
    event.target.elements.query.value = "";
  };

  useEffect(() => {
    async function fetchMovieListByQuery() {
      if (query === "") {
        return;
      } else {
        setMovieList([]);
        try {
          const data = await fetchMovieByQuery(query);
          setLoader(true);
          if (!data) {
            return;
          } else {
            setMovieList(data);
          }
        } catch (error) {
          setError(true);
        } finally {
          setLoader(false);
        }
      }
    }

    fetchMovieListByQuery();
  }, [query, page]);

  return (
    <>
      {loader && <Loader />}
      {error && <ErrorMessage />}
      <form className={s.form} onSubmit={handleSubmit}>
        <input type="text" name="query" required={true} />
        <button type="submit"></button>
      </form>
      <MovieList list={movieList.data} />
    </>
  );
};

export default MoviesPage;

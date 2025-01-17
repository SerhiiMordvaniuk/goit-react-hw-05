import { useEffect, useState } from "react";
import s from "./MoviesPage.module.css";
import MovieList from "../../components/MovieList/MovieList";
import { fetchMovieByQuery } from "../../movie-api";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import { useSearchParams } from "react-router-dom";

const MoviesPage = () => {
  const [query, setQuery] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("query") ?? "";

  const updateSearchParams = (key, value) => {
    const updatedParams = new URLSearchParams(searchParams);

    if (value !== "") {
      updatedParams.set(key, value);
    } else {
      updatedParams.delete(key);
    }

    setSearchParams(updatedParams);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setQuery(event.target.elements.query.value.toLowerCase().trim());
    updateSearchParams(
      "query",
      event.target.elements.query.value.toLowerCase().trim()
    );
    event.target.elements.query.value = "";
  };

  useEffect(() => {
    async function fetchMovieListByQuery() {
      if (query === "") {
        setQuery(searchQuery);
        return;
      } else {
        setMovieList([]);
        try {
          setLoader(true);

          const data = await fetchMovieByQuery(query);
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
  }, [query, searchQuery]);

  return (
    <>
      <form className={s.form} onSubmit={handleSubmit}>
        <input type="text" name="query" required={true} className={s.input} />
        <button type="submit" className={s.btn}>
          Search
        </button>
        <p></p>
      </form>
      {loader && <Loader />}
      {error && <ErrorMessage />}
      <MovieList list={movieList.data} />
    </>
  );
};

export default MoviesPage;

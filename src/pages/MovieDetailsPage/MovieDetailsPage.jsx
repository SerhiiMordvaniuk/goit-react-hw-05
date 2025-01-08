import React, { useEffect, useState } from "react";
import s from "./MovieDetailsPage.module.css";
import { useParams } from "react-router-dom";
import { fetchMovieById } from "../../movie-api";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
const MovieDetailsPage = () => {
  const { movieId } = useParams();

  const [movie, setMovie] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMovie() {
      try {
        setError(false);
        setLoader(true);
        const data = await fetchMovieById(movieId);
        if (!data) {
          return;
        } else {
          console.log(data);
          setMovie(data);
        }
      } catch (err) {
        console.log(err);
        setError(true);
      } finally {
        setLoader(false);
      }
    }
    fetchMovie();
  }, [movieId]);

  return (
    <>
      <div>{/* <img src= alt="" /> */}</div>
      <p>Movie Details page</p>
      {error && <ErrorMessage />}
      {loader && <Loader />}
      <p>{movieId}</p>
    </>
  );
};

export default MovieDetailsPage;

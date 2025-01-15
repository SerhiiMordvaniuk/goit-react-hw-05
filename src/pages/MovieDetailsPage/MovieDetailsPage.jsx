import React, { useEffect, useState } from "react";
import s from "./MovieDetailsPage.module.css";
import { Outlet, useParams, Link } from "react-router-dom";
import { fetchMovieById } from "../../movie-api";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const MovieDetailsPage = () => {
  const { movieId } = useParams();

  const [movie, setMovie] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [date, setDate] = useState("");
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    async function fetchMovie() {
      try {
        setError(false);
        setLoader(true);
        const data = await fetchMovieById(movieId);
        if (!data) {
          return;
        } else {
          setMovie(data);
          setDate(data.release_date.slice(0, 4));
          setGenres(data.genres);
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
      {loader && <Loader />}
      {error && <ErrorMessage />}
      <Link to="/">Go back</Link>
      <div className={s.wrapper}>
        {
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            width={240}
            className={s.img}
          />
        }
        <div className={s.info}>
          <h2 className={s.title}>
            {movie.title} ({date})
          </h2>
          <p className={s.score}>
            User Score: {(movie.vote_average * 10).toFixed(0)}%
          </p>
          <p className={s.bold}>
            Owerview <br />
            <span className={s.txt}>{movie.overview}</span>
          </p>
          <div>
            <p className={s.bold}>Genres</p>
            <ul className={s.genres}>
              {genres.map((item, index) => {
                return <li key={index}>{item.name}</li>;
              })}
            </ul>
          </div>
        </div>
      </div>
      <hr />
      <div className={s.additional}>
        <p className={s.bold}>Additional information</p>
        <ul className={s.list}>
          <li>
            <Link to="cast" className={s.link}>
              {" "}
              Cast
            </Link>
          </li>
          <li>
            <Link to="reviews" className={s.link}>
              {" "}
              Review
            </Link>
          </li>
        </ul>
      </div>
      <hr />
      <Outlet />
    </>
  );
};

export default MovieDetailsPage;

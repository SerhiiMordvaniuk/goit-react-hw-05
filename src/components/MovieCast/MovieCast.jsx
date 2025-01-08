import React, { useEffect } from "react";
import s from "./MovieCast.module.css";
import { fetchActorById } from "../../movie-api";
import { useState } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import { useParams } from "react-router-dom";

const MovieCast = () => {
  const { movieId } = useParams();

  const [actors, setActors] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  const fakeLogo =
    "https://img.freepik.com/premium-vector/vector-flat-illustration-avatar-user-profile-person-icon-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-1723.jpg?ga=GA1.1.1021063894.1727605529&semt=ais_hybrid";

  useEffect(() => {
    async function fetchActors() {
      try {
        setError(false);
        setLoader(true);
        const data = await fetchActorById(movieId);
        if (!data) {
          return;
        } else {
          setActors(data.cast);
        }
      } catch (err) {
        console.log(err);
        setError(true);
      } finally {
        setLoader(false);
      }
    }
    fetchActors();
  }, [movieId]);
  return (
    <>
      {loader && <Loader />}
      {error && <ErrorMessage />}
      <ul className={s.list}>
        {actors.map((actor, index) => {
          return (
            <li key={index} className={s.item}>
              <img
                width={60}
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                    : fakeLogo
                }
                alt={actor.name}
              />
              <p className={s.bold}>{actor.name}</p>
              <p>Character: {actor.character}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default MovieCast;

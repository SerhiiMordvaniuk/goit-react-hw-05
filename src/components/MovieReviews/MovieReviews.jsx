import React, { useEffect, useState } from "react";
import s from "./MovieReviews.module.css";
import { useParams } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import { fetchReviewById } from "../../movie-api";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [review, setReview] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        setLoader(true);
        setError(false);
        const data = await fetchReviewById(movieId);
        if (!data) {
          return;
        } else {
          setReview(data.results);
          console.log(data.results);
        }
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoader(false);
      }
    };
    fetchReview();
  }, [movieId]);

  return (
    <>
      {loader && <Loader />}
      {error && <ErrorMessage />}
      {review.length > 0 ? (
        <ul className={s.list}>
          {review.map((item, index) => {
            return (
              <li key={index} className={s.item}>
                <p className={s.bold}>{item.author}</p>
                <p>{item.content}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className={s.info}>Information about reviews not found</p>
      )}
    </>
  );
};

export default MovieReviews;

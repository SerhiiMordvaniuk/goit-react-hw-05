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
          console.log(data);

          console.log(data.total_results);
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
      <p>Movie reviews psge</p>
    </>
  );
};

export default MovieReviews;

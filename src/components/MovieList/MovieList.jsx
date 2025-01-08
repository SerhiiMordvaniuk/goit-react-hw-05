import React from "react";
import s from "./MovieList.module.css";
import { Link } from "react-router-dom";

function MovieList({ list }) {
  if (!list) {
    return;
  }

  return (
    <ol className={s.list}>
      {list.results.map((item) => {
        return (
          <li key={item.id}>
            <Link to={`/movies/${item.id}`} className={s.item}>
              {item.title}
            </Link>
          </li>
        );
      })}
    </ol>
  );
}

export default MovieList;

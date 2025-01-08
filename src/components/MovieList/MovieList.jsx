import React from "react";

function MovieList({ list }) {
  if (!list) {
    return;
  }
  console.log(list.results);

    return <ul>
      {list.results.map()
  </ul>;
}

export default MovieList;

import React from "react";
import s from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={s.not_found}>
      <p className={s.number}>404</p>
      <p className={s.txt}>page not found</p>
    </div>
  );
};

export default NotFoundPage;

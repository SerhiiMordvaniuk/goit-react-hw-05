import React from "react";
import s from "./ErrorMessage.module.css";
const ErrorMessage = () => {
  return (
    <div>
      <p className={s.err}>Oooops, something went wrong! Please, reload page</p>
    </div>
  );
};

export default ErrorMessage;

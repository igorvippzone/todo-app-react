import React from "react";

import s from "./Button.module.css";

const Button = ({ children, typeStyle, onClick, type, className }) => {
  let btnStyle = "";
  if (typeStyle === "primary") {
    btnStyle = s.primary;
  }
  if (typeStyle === "warning") {
    btnStyle = s.warning;
  }
  if (typeStyle === "danger") {
    btnStyle = s.danger;
  }

  return (
    <button
      className={`${s.button} ${btnStyle} ${className}`}
      type={type || "button"}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

import React from "react";
import s from "./Input.module.css";

const Input = ({ label, value, id, onChange, type, accept, autoFocus }) => {
  return (
    <div className={s.input}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        placeholder={label}
        value={value}
        type={type || "text"}
        onChange={onChange}
        accept={accept || ""}
        autoFocus={autoFocus}
      />
    </div>
  );
};

export default Input;

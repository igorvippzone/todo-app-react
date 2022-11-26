import React from "react";
import s from './TextArea.module.css'
const TextArea = ({ id, value, placeholder, onChange }) => {
  return (
    <textarea
      className={s.textarea}
      id={id}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    ></textarea>
  );
};

export default TextArea;

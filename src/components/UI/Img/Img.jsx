import React from "react";

import s from "./Img.module.css";

const Img = ({ url, alt }) => {
  return <img className={s.image} src={url} alt={alt} />;
};

export default Img;

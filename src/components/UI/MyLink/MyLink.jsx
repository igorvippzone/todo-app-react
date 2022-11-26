import React from "react";

import s from "./MyLink.module.css";

const MyLink = ({children, url}) => {
  return <a href={url} target="_blank" rel="noopener">{children}</a>;
};

export default MyLink;

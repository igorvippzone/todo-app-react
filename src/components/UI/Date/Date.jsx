import React from "react";
import dayjs from "dayjs";

const Date = ({ date, ...props }) => {
  const convertDate = dayjs(date);
  const transformDate = convertDate.format("DD.MM.YYYY г.");

  return <div {...props}>{transformDate}</div>;
};

export default Date;

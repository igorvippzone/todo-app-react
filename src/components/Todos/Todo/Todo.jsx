import dayjs from "dayjs";
import { getDownloadURL, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { storage } from "../../../Firebase";

import Button from "../../UI/Button/Button";
import Img from "../../UI/Img/Img";
import MyLink from "../../UI/MyLink/MyLink";
import s from "./Todo.module.css";

const currentDate = dayjs();

const Todo = ({ onRemove, onComplete, onEdit, ...props }) => {
  const { title, isDone, id, description, deadLine, file } = props;

  const [fileUrl, setFileUrl] = useState(null);
  const [isImage, setIsImage] = useState(false);

  const isOverdue = dayjs(deadLine) < currentDate;

  useEffect(() => {
    if (!file) return;
    const imgExtension = [".jpg", ".jpeg", ".png", ".svg"];
    imgExtension.forEach((extension) => {
      if (file.endsWith(extension)) {
        setIsImage(true);
      }
    });

    const imagesRef = ref(storage, file);
    getDownloadURL(imagesRef)
      .then((url) => setFileUrl(url))
      .catch((err) => console.error("Файл не найден", err));
  }, [file]);

  console.log("fileUrl ", fileUrl);
  return (
    <li
      className={`${s.todo} ${isDone && s.complete} ${
        !isDone && isOverdue && s.overdue
      }`}
    >
      <div>
        <div className={s.header}>
          <div>{title}</div>
          <div className={s.deadline}>{deadLine}</div>

          <Button typeStyle="primary" onClick={() => onComplete(id)}>
            {isDone ? "Возобновить" : "Завершить"}
          </Button>
        </div>

        <div>{description}</div>

        {fileUrl && (
          <div>
            {isImage && <Img url={fileUrl} alt="Картинка" />}
            <MyLink url={fileUrl}>Скачать</MyLink>
          </div>
        )}
      </div>

      <div className={s["button-group"]}>
        <Button typeStyle="warning" onClick={() => onEdit(id)}>
          edit
        </Button>
        <Button typeStyle="danger" onClick={() => onRemove(id, file)}>
          delete
        </Button>
      </div>
    </li>
  );
};

export default Todo;

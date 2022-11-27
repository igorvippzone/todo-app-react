import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

import { storage } from "../../../firebase";
import { getDownloadURL, ref } from "firebase/storage";
import Button from "../../UI/Button/Button";
import Date from "../../UI/Date/Date";
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

  return (
    <li
      className={`${s.todo} ${isDone && s.complete} ${
        !isDone && isOverdue && s.overdue
      }`}
    >
      <div>
        <div className={s.header}>
          <div className={s.title}>{title}</div>
          {deadLine && <Date className={s.deadline} date={deadLine} />}
        </div>

        <div className={s.description}>{description}</div>

        {fileUrl && (
          <div>
            {isImage && <Img url={fileUrl} alt="Картинка" />}
            <MyLink url={fileUrl}>Скачать</MyLink>
          </div>
        )}
      </div>

      <div className={s["button-group"]}>
        <Button typeStyle="primary" onClick={() => onComplete(id)}>
          {isDone ? "Возобновить" : "Завершить"}
        </Button>
        <Button typeStyle="warning" onClick={() => onEdit(id)}>
          Изменить
        </Button>
        <Button
          typeStyle="danger"
          className={s.deleteBtn}
          onClick={() => onRemove(id, file)}
        >
          Удалить
        </Button>
      </div>
    </li>
  );
};

export default Todo;

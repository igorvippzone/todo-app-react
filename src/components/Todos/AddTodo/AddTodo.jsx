import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { storage } from "../../../firebase";

import { ref, uploadBytes } from "firebase/storage";

import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import Modal from "../../UI/Modal/Modal";

import s from "./AddTodo.module.css";
import TextArea from "../../UI/TextArea/TextArea";

const AddTodo = ({ onCreateTodo, onCloseModal }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadLine, setDeadLine] = useState("");
  const [selectFile, setSelectFile] = useState(null);

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };

  const descriptionHandler = (e) => {
    setDescription(e.target.value);
  };
  const deadLineHandler = (e) => {
    setDeadLine(e.target.value);
  };

  const fileHandler = (e) => {
    let fileData = new FormData();
    fileData.append("file", e.target.files[0]);

    setSelectFile(e.target.files[0]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!title.trim() && !description.trim()) return;

    const id = uuidv4();
    let imagesRef = null;
    let file = null;
    if (selectFile) {
      file = `${id}/${selectFile?.name}`;
      imagesRef = ref(storage, file);

      try {
        await uploadBytes(imagesRef, selectFile);
      } catch (error) {
        console.error(error);
      }
    }

    const newTodo = {
      title,
      id,
      description,
      deadLine,
      isDone: false,
      file,
    };

    onCreateTodo(newTodo);
  };

  return (
    <Modal onConfirm={onCloseModal}>
      <form onSubmit={submitHandler} className={s.form}>
        <Input
          id="name"
          label="Заголовок"
          type="text"
          value={title}
          onChange={titleHandler}
        />

        <TextArea
          id="description"
          value={description}
          placeholder="Описание..."
          onChange={descriptionHandler}
        ></TextArea>

        <Input
          id="deadline"
          label="Дата завершения"
          value={deadLine}
          type="date"
          onChange={deadLineHandler}
        />

        <Input
          id="file"
          label="Выберите файл"
          type="file"
          // accept="image/*"
          onChange={fileHandler}
        />

        <Button typeStyle="primary" type="submit" className={s.addButton}>
          Добавить
        </Button>
      </form>
    </Modal>
  );
};

export default AddTodo;

import React, { useState } from "react";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import Modal from "../../UI/Modal/Modal";

import s from "./EditTodo.module.css";

const EditTodo = ({ onCloseModal, onChangeTodo, ...props }) => {
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [deadLine, setDeadLine] = useState(props.deadLine);

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };

  const descriptionHandler = (e) => {
    setDescription(e.target.value);
  };
  const deadLineHandler = (e) => {
    setDeadLine(e.target.value);
  };
  console.log(deadLine);
  const submitHandler = (e) => {
    e.preventDefault();

    if (!title.trim() && !description.trim()) return;

    const changeTodo = {
      title,
      description,
      deadLine,
      isDone: props.isDone,
      id: props.id,
      file: props.file,
    };

    onChangeTodo(changeTodo);
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

        <textarea
          id="description"
          value={description}
          placeholder="Описание..."
          onChange={descriptionHandler}
        ></textarea>

        <Input
          id="deadline"
          label="Дата завершения"
          value={deadLine}
          type="date"
          onChange={deadLineHandler}
        />

        <Button typeStyle="primary" type="submit">
          Добавить
        </Button>
      </form>
    </Modal>
  );
};

export default EditTodo;

import React, { useState } from "react";

import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import TextArea from "../../UI/TextArea/TextArea";
import s from "./FormTodo.module.css";

const FormTodo = ({
  onSubmit,
  title = "",
  description = "",
  deadline = "",
  buttonName = "Создать",
}) => {
  const [enteredTitle, setEnteredTitle] = useState(title);
  const [enteredDescription, setEnteredDescription] = useState(description);
  const [enteredDeadline, setEnteredDeadline] = useState(deadline);
  const [selectFile, setSelectFile] = useState(null);

  const titleHandler = (e) => {
    setEnteredTitle(e.target.value);
  };

  const descriptionHandler = (e) => {
    setEnteredDescription(e.target.value);
  };

  const deadlineHandler = (e) => {
    setEnteredDeadline(e.target.value);
  };

  const fileHandler = (e) => {
    let fileData = new FormData();
    fileData.append("file", e.target.files[0]);

    setSelectFile(e.target.files[0]);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    onSubmit(enteredTitle, enteredDescription, enteredDeadline, selectFile);
  };

  return (
    <form onSubmit={submitHandler} className={s.form}>
      <Input
        id="name"
        label="Заголовок"
        type="text"
        value={enteredTitle}
        onChange={titleHandler}
        autoFocus={true}
      />

      <TextArea
        id="description"
        value={enteredDescription}
        placeholder="Описание..."
        onChange={descriptionHandler}
      ></TextArea>

      <Input
        id="deadline"
        label="Дата завершения"
        value={enteredDeadline}
        type="date"
        onChange={deadlineHandler}
      />
      {buttonName !== "Сохранить" && (
        <Input
          id="file"
          label="Выберите файл"
          type="file"
          // accept="image/*"
          onChange={fileHandler}
        />
      )}

      <Button typeStyle="primary" type="submit" className={s.addButton}>
        {buttonName}
      </Button>
    </form>
  );
};

export default FormTodo;

import React, { useReducer } from "react";

import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import TextArea from "../../UI/TextArea/TextArea";
import s from "./FormTodo.module.css";

const reducer = (state, action) => {
  switch (action.type) {
    case "enteredTitle":
      return { ...state, title: action.payload };

    case "enteredDescription":
      return { ...state, description: action.payload };

    case "enteredDeadline":
      return { ...state, deadline: action.payload };

    case "enteredSelectFile":
      return { ...state, selectFile: action.payload };

    default:
      return { ...state };
  }
};

const FormTodo = ({
  onSubmit,
  title = "",
  description = "",
  deadline = "",
  buttonName = "Создать",
}) => {
  const initialState = {
    title,
    description,
    deadline,
    selectFile: null,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const titleHandler = (e) => {
    dispatch({ type: "enteredTitle", payload: e.target.value });
  };

  const descriptionHandler = (e) => {
    dispatch({ type: "enteredDescription", payload: e.target.value });
  };

  const deadlineHandler = (e) => {
    dispatch({ type: "enteredDeadline", payload: e.target.value });
  };

  const fileHandler = (e) => {
    dispatch({ type: "enteredSelectFile", payload: e.target.files[0] });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    onSubmit(state);
  };

  return (
    <form onSubmit={submitHandler} className={s.form}>
      <Input
        id="name"
        label="Заголовок"
        type="text"
        value={state.title}
        onChange={titleHandler}
        autoFocus={true}
      />

      <TextArea
        id="description"
        value={state.description}
        placeholder="Описание..."
        onChange={descriptionHandler}
      ></TextArea>

      <Input
        id="deadline"
        label="Дата завершения"
        value={state.deadline}
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

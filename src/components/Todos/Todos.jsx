import { deleteObject, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { setFetchTodos, storage } from "../../firebase";

import Button from "../UI/Button/Button";
import Loader from "../UI/Loader/Loader";
import AddTodo from "./AddTodo/AddTodo";
import EditTodo from "./EditTodo/EditTodo";
import Todo from "./Todo/Todo";
import s from "./Todos.module.css";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [isCreateModal, setIsCreateModal] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);

  const [editMyTodo, setEditMyTodo] = useState(null);

  useEffect(() => {
    setIsLoaded(true);
    fetch("https://todo-3a084-default-rtdb.firebaseio.com/todos.json")
      .then((data) => data.json())
      .then((todos) => {
        let loadTodos = [];
        for (const key in todos) {
          loadTodos.push({
            deadLine: todos[key].deadLine,
            description: todos[key].description,
            id: todos[key].id,
            isDone: todos[key].isDone,
            title: todos[key].title,
            file: todos[key].file,
          });
        }

        loadTodos.sort((x, y) =>
          x.isDone === y.isDone ? 0 : x.isDone ? 1 : -1
        );

        setTodos(loadTodos);
        setIsLoaded(false);
      })
      .catch((err) => {
        setIsLoaded(false);
        console.error("Не могу получить данные", err.message);
      });
  }, []);

  const createTodo = (todo) => {
    const newTodos = [todo, ...todos];
    setFetchTodos(newTodos);

    setTodos(newTodos);
    setIsCreateModal((prev) => !prev);
  };

  const removeTodo = (id, fileUrl) => {
    const confirmDeletedTodo = window.confirm(
      "Вы точно хотите удалить задачу?"
    );
    if (!confirmDeletedTodo) return;

    if (fileUrl) {
      const imagesRef = ref(storage, fileUrl);
      deleteObject(imagesRef)
        .then(() => {
          console.log("Удалили файл");
        })
        .catch((err) => {
          console.log("Что-то пошло не так ", err);
        });
    }
    const newTodos = todos.filter((todo) => todo.id !== id);
    setFetchTodos(newTodos);
    setTodos(newTodos);
  };

  const completeTodo = (id) => {
    const newTodos = todos
      .filter((todo) => {
        if (todo.id === id) {
          todo.isDone = !todo.isDone;
        }
        return todo;
      })
      .sort((x, y) => (x.isDone === y.isDone ? 0 : x.isDone ? 1 : -1));

    setFetchTodos(newTodos);
    setTodos(newTodos);
  };

  const editTodo = (id) => {
    setIsEditModal(true);
    const edit = todos.filter((todo) => todo.id === id);
    setEditMyTodo(...edit);
  };

  const changeTodo = (editTodo) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === editTodo.id) {
        todo = editTodo;
      }
      return todo;
    });

    setFetchTodos(newTodos);

    setTodos(newTodos);
    setEditMyTodo(null);
    setIsEditModal(false);
  };

  const modals = (
    <>
      {isCreateModal && (
        <AddTodo
          onCreateTodo={createTodo}
          onCloseModal={() => setIsCreateModal((prev) => !prev)}
        />
      )}

      {isEditModal && (
        <EditTodo
          onChangeTodo={changeTodo}
          onCloseModal={() => setIsEditModal((prev) => !prev)}
          {...editMyTodo}
        />
      )}
    </>
  );

  return (
    <>
      {modals}

      <Button
        onClick={() => setIsCreateModal((prev) => !prev)}
        typeStyle="primary"
      >
        +
      </Button>

      {isLoaded ? (
        <Loader />
      ) : (
        <>
          {!todos.length && <div>Пока задачек нет</div>}
          <ul className={s.todos}>
            {todos.map((todo) => {
              return (
                <Todo
                  key={todo.id}
                  onRemove={removeTodo}
                  onComplete={completeTodo}
                  onEdit={editTodo}
                  {...todo}
                />
              );
            })}
          </ul>
        </>
      )}
    </>
  );
};

export default Todos;

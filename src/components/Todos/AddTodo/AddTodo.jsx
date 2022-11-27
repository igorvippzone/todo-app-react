import React from "react";
import { v4 as uuidv4 } from "uuid";

import { storage } from "../../../firebase";
import { ref, uploadBytes } from "firebase/storage";
import Modal from "../../UI/Modal/Modal";
import FormTodo from "../FormTodo/FormTodo";

const AddTodo = ({ onCreateTodo, onClose }) => {
  const createTodo = async (
    enteredTitle,
    enteredDescription,
    enteredDeadline,
    selectFile
  ) => {
    if (!enteredTitle.trim() && !enteredDescription.trim()) return;

    const id = uuidv4();
    let file = null;
    if (selectFile) {
      file = `${id}/${selectFile?.name}`;
      const imagesRef = ref(storage, file);

      try {
        await uploadBytes(imagesRef, selectFile);
      } catch (error) {
        console.error(error);
      }
    }

    const newTodo = {
      title: enteredTitle,
      description: enteredDescription,
      deadLine: enteredDeadline,
      isDone: false,
      file,
      id,
    };

    onCreateTodo(newTodo);
  };

  return (
    <Modal onClose={onClose}>
      <FormTodo onSubmit={createTodo} />
    </Modal>
  );
};

export default AddTodo;

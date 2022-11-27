import Modal from "../../UI/Modal/Modal";
import FormTodo from "../FormTodo/FormTodo";

const EditTodo = ({ onClose, onChangeTodo, ...props }) => {
  const { title, description, deadLine } = props;

  const changeHandler = (enteredTitle, enteredDescription, enteredDeadline) => {
    if (!enteredTitle.trim() && !enteredDescription.trim()) return;

    const changeTodo = {
      title: enteredTitle,
      description: enteredDescription,
      deadLine: enteredDeadline,
      isDone: props.isDone,
      id: props.id,
      file: props.file,
    };

    onChangeTodo(changeTodo);
  };

  return (
    <Modal onClose={onClose}>
      <FormTodo
        onSubmit={changeHandler}
        title={title}
        description={description}
        deadline={deadLine}
        buttonName="Сохранить"
      />
    </Modal>
  );
};

export default EditTodo;

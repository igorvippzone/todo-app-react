import React from "react";
import ReactDOM from "react-dom";
import Button from "../Button/Button";

import s from "./Modal.module.css";

const Backdrop = ({ onClose }) => {
  return <div className={s.overlay} onClick={onClose}></div>;
};

const ModalOverlay = ({ children, onClose }) => {
  return (
    <div className={s.modal}>
      {children}
      <Button typeStyle="danger" onClick={onClose}>
        Отмена
      </Button>
    </div>
  );
};

const Modal = ({ onClose, children }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={onClose} />,
        document.getElementById("modal")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay onClose={onClose} children={children} />,
        document.getElementById("modal")
      )}
    </>
  );
};

export default Modal;

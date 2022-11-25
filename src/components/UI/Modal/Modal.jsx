import React from "react";
import ReactDOM from "react-dom";
import Button from "../Button/Button";

import s from "./Modal.module.css";

const Backdrop = ({onConfirm}) => {
  return(
    <div className={s.overlay} onClick={onConfirm}></div>
  )
}

const ModalOverlay = ({ children, onConfirm }) => {
  return (
    // <div >
      <div className={s.modal}>
        {children}
        <Button typeStyle="danger" onClick={onConfirm}>
          Отмена
        </Button>
      </div>
    // </div>
  );
};

const Modal = ({ onConfirm, children }) => {
  return (
    <>{ReactDOM.createPortal(
      <Backdrop onConfirm={onConfirm} />,
      document.getElementById("modal")
    )}
      {ReactDOM.createPortal(
        <ModalOverlay onConfirm={onConfirm} children={children} />,
        document.getElementById("modal")
      )}
    </>
  );
};

export default Modal;

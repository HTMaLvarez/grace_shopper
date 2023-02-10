import React from 'react';
import { useState } from 'react';

const Modal = () => {
  const [open, setOpen] = useState('false');
  // const handleOpen = () => setOpen('true');
  const handleClose = () => setOpen('false');

  return (
    <div className="ModalContainer">
      <div className="ModalHeader">
        <button onClick={handleClose}> x </button>
        <h3>Modal Header</h3>
      </div>
      <hr></hr>
      <div className="ModalBody">
        <p>Modal body...</p>
      </div>
      <div className="ModalFooter">
        <p>footer</p>
        <button>CHECKOUT</button>
      </div>
    </div>
  );
};

export default Modal;

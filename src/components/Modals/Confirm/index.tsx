import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

// Images
import deleteIcon from "../../../assets/img/icon/delete.svg";

function index() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        className='clear-button'
        variant="primary" 
        onClick={handleShow}
        >
        <img src={ deleteIcon } alt="" />
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className="custom-modal"
      >
        <Modal.Header closeButton>
          <h4>Excluir usuário</h4>
        </Modal.Header>
        <hr />
        <Modal.Body>
          <div className='modal-top-wrapper'>
            <p>Excluir usuário: <b>João Augusto Silva</b></p>
          </div>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={handleClose} className="custom-button-cancel">
              Retornar
            </Button>
            <Button variant="primary" onClick={handleClose} className="custom-button">
              Excluir
            </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default index;

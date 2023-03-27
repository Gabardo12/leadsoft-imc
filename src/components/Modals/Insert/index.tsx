import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function index() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        className='custom-button'
        variant="primary" 
        onClick={handleShow}
        >
        Incluir
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className="custom-modal"
      >
        <Modal.Header closeButton>
          <h4>Incluir usuário</h4>
        </Modal.Header>
        <hr />
        <Modal.Body>
          <div className='modal-top-wrapper'>
            <p>Insira suas informações pessoais abaixo para calcular
            seu IMC.</p>
          </div>
          <div className='modal-body-wrapper'>
            <form>
              <div className='form-group'>
                <input 
                  className='custom-input'
                  placeholder='Nome'
                  />
              </div>
              <div className='form-group'>
                <input 
                  className='custom-input'
                  placeholder='Sobrenome'
                  />
              </div>
              <div className='form-group'>
                <input 
                  className='custom-input'
                  placeholder='Data de Nascimento'
                  />
              </div>
              <div className='small-form-group'>
                <input 
                  className='custom-input'
                  placeholder='Altura'
                  />
                  <input 
                  className='custom-input'
                  placeholder='Peso'
                  />
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose} className="custom-button-cancel">
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleClose} className="custom-button">
              Incluir
            </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default index;

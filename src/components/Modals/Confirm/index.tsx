import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import api from '../../../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Images
import deleteIcon from "../../../assets/img/icon/delete.svg";
interface PeopleProps{
  data: any
}

function index({ data }:PeopleProps) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  async function handleDeleteUser(){
    try {
      await api.delete(`/People/${data.Id}`).then(() =>{
        handleClose();
        toast.success("Usuário excluido com sucesso!",{
          position: toast.POSITION.TOP_CENTER
        });
        window.location.reload();
      }).catch((error) =>{
        console.log(error.response);
        if(error.response.data.status == 400){
          toast.error("Erro na solicitação, tente novamente mais tarde!",{
            position: toast.POSITION.TOP_CENTER
          });
        }
      });
    } catch(error){
      console.log(error);
    }
  }
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
            <p>Excluir usuário: <b>{data.Name +' '+ data.Surname}</b></p>
          </div>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={handleClose} className="custom-button-cancel">
              Retornar
            </Button>
            <Button variant="primary" onClick={handleDeleteUser} className="custom-button">
              Excluir
            </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default index;

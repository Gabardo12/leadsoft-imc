import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import api from '../../../services/api';
import moment from 'moment'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function index() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isName, setName] = useState();
  const [isSurname, setSurname] = useState();
  const [isDateOfBirth, setDateOfBirth] = useState();
  // formatBirth()
  const [isWeigth, setWeigth] = useState();
  const [isHeight, setHeight] = useState();

  function handleValidation(){
    if (isHeight?.length <= 5) {
      if (isWeigth?.length <= 7) {  
        handleSave();
      }else{
        toast.error("Numeros de caracteres do Peso não confere.",{
          position: toast.POSITION.TOP_CENTER
        });
      }
    }else{
      toast.error("Numeros de caracteres da Altura não confere.",{
        position: toast.POSITION.TOP_CENTER
      });
    }
  }
  function handleSave(){
    try {
      api.post(`/People`, {
        "name": isName,
        "surname": isSurname,
        "dateOfBirth": moment(isDateOfBirth).format(),
        "weigth": isWeigth,
        "height": isHeight,
      }).then(() => {
        handleClose();
        toast.success("Usuário adicionado com sucesso!",{
          position: toast.POSITION.TOP_CENTER
        });
        window.location.reload();
      }).catch((error) =>{
        console.log(error.response);
        if(error.response.data.status == 400){
          toast.error("Erro na validação dos dados inseridos, revise e tente novamente!",{
            position: toast.POSITION.TOP_CENTER
          });
        }
      });
    } catch (error) {
      // console.log(error)
    }
  }

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
                  onChange={(e) => setName(e.target.value)}
                  />
              </div>
              <div className='form-group'>
                <input 
                  className='custom-input'
                  placeholder='Sobrenome'
                  onChange={(e) => setSurname(e.target.value)}
                  />
              </div>
              <div className='form-group'>
                <input 
                  type="date"
                  className='custom-input'
                  min="1980-01-01"
                  max="2070-12-31"
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  />
              </div>
              <div className='small-form-group'>
                <input 
                  className='custom-input'
                  placeholder='Altura (M)'
                  type='number'
                  onChange={(e) => setHeight(e.target.value)}
                  />
                  <input 
                  className='custom-input'
                  placeholder='Peso (Kg)'
                  type='number'
                  onChange={(e) => setWeigth(e.target.value)}
                  />
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose} className="custom-button-cancel">
            Cancelar
          </Button>
          <Button variant="primary" onClick={() => handleValidation()} className="custom-button">
            Incluir
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default index;

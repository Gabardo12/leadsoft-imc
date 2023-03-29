import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import api from '../../../services/api';
import moment from 'moment'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



// Images
import editIcon from "../../../assets/img/icon/edit.svg";

interface PeopleProps{
    data: any
}

function index({ data }:PeopleProps) {

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [isName, setName] = useState(data.Name);
  const [isSurname, setSurname] = useState(data.Surname);
  const [isDateOfBirth, setDateOfBirth] = useState(formatBirth(data.DateOfBirth));
  const [isWeigth, setWeigth] = useState(data.Weigth);
  const [isHeight, setHeight] = useState(data.Height);

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
  function handleSave(id){
    try {
      api.put(`/People/${id}`, {
        "name": isName,
        "surname": isSurname,
        "dateOfBirth": moment(isDateOfBirth).format(),
        "weigth": isWeigth,
        "height": isHeight,
        "id": id
      }).then(() => {
        handleClose();
        toast.success("Dados atualizados com sucesso!",{
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
      console.log(error)
      toast.error("Erro, atualize a pagina tente novamente!",{
        position: toast.POSITION.TOP_CENTER
      })
    }
  }
  function formatBirth(Birth){
    return moment(Birth).format('yyyy-MM-DD');
  }

  return (
    <>
      <Button
        className='clear-button'
        variant="primary" 
        onClick={handleShow}
        >
        <img src={ editIcon } alt="" />
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
            <p>Editando as informações do usuário: <b>{ isName +' '+ isSurname }</b></p>
          </div>
          <div className='modal-body-wrapper'>
            <form>
              <div className='form-group'>
                <label>Nome:</label>
                <input 
                  className='custom-input'
                  placeholder='Nome'
                  value={ isName }
                  onChange={(e) => setName(e.target.value)}
                  />
              </div>
              <div className='form-group'>
                <label>Sobrenome:</label>
                <input 
                  className='custom-input'
                  placeholder='Sobrenome'
                  value={ isSurname }
                  onChange={(e) => setSurname(e.target.value)}
                  />
              </div>
              <div className='form-group'>
                <label>Data de nacimento:</label>
                <input 
                  type="date"
                  className='custom-input'
                  min="1980-01-01"
                  max="2070-12-31"
                  value={ isDateOfBirth }
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  />
              </div>
              <div className='row mt-3 form-group editmodal-inputs'>
                <div className='col-6 text-center m-0'>
                  <p>Altura (M):</p>
                </div>
                <div className='col-6 text-center m-0'>
                  <p>Peso (Kg):</p>
                </div>
              </div>
              <div className='small-form-group'>
                <input 
                  className='custom-input'
                  placeholder='Altura (M)'
                  type='number'
                  value={ isHeight }
                  onChange={(e) => setHeight(e.target.value)}
                  />
                  <input 
                  className='custom-input'
                  placeholder='Peso (Kg)'
                  type='number'
                  value={ isWeigth }
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
            <Button variant="primary" onClick={() => handleSave(data.Id)} className="custom-button">
              Salvar
            </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default index;

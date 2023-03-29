import React, { useState, useEffect } from 'react';
import Insert from '../../components/Modals/Insert';
import api from '../../services/api';
import PeoplesList from '../../components/PeoplesList'
import Pagination from '../../components/Pagination';





// images
import headerLogo from "../../assets/img/logo/leadsoft.svg";
import deleteIcon from "../../assets/img/icon/delete.svg";
import editIcon from "../../assets/img/icon/edit.svg";
import swipeHelper from "../../assets/img/icon/swipe-helper.gif";

const index = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [peoplesPerPage, setPeoplesPerPage] = useState(9);
  const indexOfLastPeople = currentPage * peoplesPerPage;
  const indexOfFirstPeople = indexOfLastPeople - peoplesPerPage;
  const [peoples, setPeoples] = useState([])
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };
  const getPeoples = async() => {
    try {
      const response = await api.get('/People');
      const data = response.data;
      setPeoples(data);
    } catch (error) {
      // console.log(error)
    }
  }

  useEffect(() => {
    getPeoples();
  }, []);

  const currentPeoples = peoples.slice(indexOfFirstPeople, indexOfLastPeople);
  const peoplesTotal = peoples.length;
  // 
  return (
    <section className='main-section'>
      <div className='main-wrapper'>
        <header className='main-header'>
          <img src={ headerLogo } alt="" />
          <button
            className='logout-button'
            onClick={handleLogout}
            >
              Logout
          </button>
        </header>
        <div className='custom-card resume-card'>
          <p>Bem-vindo à nossa ferramenta de cálculo de IMC! Aqui, você pode visualizar uma tabela com os nomes e índices de massa corporal de nossos funcionários.
            O IMC é uma medida que relaciona a altura e o peso de uma pessoa, fornecendo uma indicação de se ela está com um peso saudável. Na tabela, você 
            pode ver os nomes e seus respectivos IMCs. O IMC é calculado automaticamente a partir dos dados de peso e altura fornecidos no momento do cadastro.
          </p>
          <p>Mantenha uma rotina saudável.</p>
        </div>
        <div className='table-actions-wrapper'>
          <Insert />
        </div>
        <div className='custom-card table-card'>
          <table className='peoples-table'>
            <thead>
              <tr>
                <th>Nome Completo</th>
                <th>Idade</th>
                <th>Altura (M)</th>
                <th>Peso (Kg)</th>
                <th>IMC</th>
                <th>Ações</th>
              </tr>
            </thead> 
            
            <PeoplesList data={ currentPeoples } />

          </table>
          <div className='table-footer'>
              <Pagination peoplesPerPage={ peoplesPerPage } totalPeoples={ peoplesTotal } paginate={paginate}/>
              <img className='mobile-swipeHelper' src={ swipeHelper } alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default index;

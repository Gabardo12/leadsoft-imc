import React, { useState, useEffect } from 'react';
import Confirm from '../../components/Modals/Confirm';
import Edit from '../../components/Modals/Edit';
import Insert from '../../components/Modals/Insert';
import api from '../../services/api';





// images
import headerLogo from "../../assets/img/logo/leadsoft.svg";
import deleteIcon from "../../assets/img/icon/delete.svg";
import editIcon from "../../assets/img/icon/edit.svg";
import swipeHelper from "../../assets/img/icon/swipe-helper.gif";

const index = () => {
  
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const [peoples, setPeoples] = useState([])
  const getPeoples = async() => {
    try {
      const response = await api.get('/People');
      const data = response.data;
      setPeoples(data);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getPeoples();
  }, []);
  function calculateIMC(Weigth, Height){
    const imc = Weigth / (Height * Height);
    return imc.toFixed(1);
  }
  function calculateAge(Birth){
    const birthDate = new Date(Birth);
    const ageDifMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
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
            <tbody>
              {peoples.length === 0 ? <tr><td>Carregando...</td></tr>: (
                peoples.map((people) =>(
                  <tr key={ people.Id }>
                    <td>{ people.Name } { people.Surname }</td>
                    <td>{ calculateAge(people.DateOfBirth) }</td>
                    <td>{ people.Height }</td>
                    <td>{ people.Weigth }</td>
                    <td id={`person-${people.Id}`}>{ calculateIMC(people.Weigth, people.Height) }</td>
                    <td>
                      <Edit data={ people }/>
                      <Confirm />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            <tfoot>
              <tr>
                <td>
                  <img className='mobile-swipeHelper' src={ swipeHelper } alt="" />
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>
  );
};

export default index;

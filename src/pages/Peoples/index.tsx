import React, { useState } from 'react';
import Confirm from '../../components/Modals/Confirm';
import Edit from '../../components/Modals/Edit';
import Insert from '../../components/Modals/Insert';





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
                <th>Altura</th>
                <th>Peso</th>
                <th>IMC</th>
                <th>Ações</th>
              </tr>
            </thead> 
            <tbody>
              <tr>
                <td>João Augusto Silva</td>
                <td>22</td>
                <td>22</td>
                <td>22</td>
                <td>22</td>
                <td>
                  <button className='table-action-btn'>
                    <img src={ deleteIcon } alt="" />
                  </button>
                  <button className='table-action-btn'>
                    <img src={ editIcon } alt="" />
                  </button>
                </td>
              </tr>
              <tr>
                <td>João Augusto Silva</td>
                <td>22</td>
                <td>22</td>
                <td>22</td>
                <td>22</td>
                <td>
                  <Confirm />
                  <Edit />
                </td>
              </tr>
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

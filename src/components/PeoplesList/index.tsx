import React, { useState } from 'react';
import Confirm from '../../components/Modals/Confirm';
import Edit from '../../components/Modals/Edit';

interface PeoplesProps{
    data: any,
}

function index({ data }:PeoplesProps) {

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
  
  return (
    <tbody>
        {data.length === 0 ? <tr><td>Carregando...</td></tr>: (
          data.map((people) =>(
              <tr key={ people.Id }>
              <td>{ people.Name } { people.Surname }</td>
              <td>{ calculateAge(people.DateOfBirth) }</td>
              <td>{ people.Height }</td>
              <td>{ people.Weigth }</td>
              <td id={`person-${people.Id}`}>{ calculateIMC(people.Weigth, people.Height) }</td>
              <td>
                  <Edit data={ people }/>
                  <Confirm data={ people }/>
              </td>
              </tr>
          ))
        )}
    </tbody>
  )
}

export default index

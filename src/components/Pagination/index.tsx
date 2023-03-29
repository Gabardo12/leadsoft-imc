import React from 'react'

interface PeopleProps{
    peoplesPerPage: any,
    totalPeoples: any
}

const index = ({peoplesPerPage, totalPeoples, paginate }:PeopleProps) => {
    console.log(totalPeoples);
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalPeoples / peoplesPerPage); i++){
        pageNumbers.push(i);
    }

    return(
        <nav>
            <ul className='pagination'>
                {pageNumbers.map(number => (
                <li key={number} className='page-item'>
                    <a onClick={()=> paginate(number)} className='page-link'>
                        { number }
                    </a>
                </li>
                ))}
            </ul>
        </nav>
    );
};

export default index;
import React, { useState } from 'react';
import './Paged.modules.css'

export default function Pagination({dogsPerPage, allDogs, paged, setCurrentPage, currentPage}) {
    const pageNumbers = []
    const [input, setInput] = useState(1);

    const nextPage = () => {
        setInput(parseInt(input) + 1);
        setCurrentPage(parseInt(currentPage) + 1);
    }

    const previousPage = () => {
        setInput(parseInt(input) -1);
        setCurrentPage(parseInt(currentPage) -1)
    }

    for (let i = 1; i <=Math.ceil(allDogs/dogsPerPage); i++) {
        pageNumbers.push(i)
    }
    return (
        <nav>
            <div className='container_paged'> 
                <button className='prev_paged' disabled={currentPage <= 1} onClick={previousPage}>{'<'}</button>
                <ul className='paged'>
                    { pageNumbers && pageNumbers.map((number, i) => (
                    <li  key={i} onClick={() => paged(number)}>
                        <span className={currentPage === number ? "paged active" : "paged"}>{number}</span>
                    </li>
                    ))}
                </ul >
                <button className='next_paged' disabled={currentPage >= Math.ceil(allDogs/dogsPerPage)} onClick={nextPage}>{'>'}</button>
            </div>

        </nav>
    )

    
}
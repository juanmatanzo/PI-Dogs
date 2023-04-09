import React from 'react';


export default function Pagination({dogsPerPage, allDogs, paged}) {
    const pageNumbers = [] //declaro arreglo vacio

    for (let i = 1; i <=Math.ceil(allDogs/dogsPerPage); i++) { //todos los perros dividido perros por pagina
        pageNumbers.push(i)  //pusheo en el arreglo
    }
    return (
        <nav>
            <div> 
                { pageNumbers && pageNumbers.map((number, i) => (
                     <button key={i} onClick={() => paged(number)}>{number}</button>
                ))}
            </div>

        </nav>
    )

    
}
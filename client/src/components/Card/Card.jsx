import React from "react";



export default function Card({image, name, weight, temperaments}){
    return (
        <div>
            <div>
                <img src={`${image}`} alt={`imagen de: ${name}`} />
            </div>
            <h2>{name}</h2>
            <h3>{temperaments}</h3>
            <div>
                {
                    temperaments.map((temps) => (
                        <h3 key={temps+Math.random}>{temps}</h3>
                    ))
                }
            </div>
        </div>
    )
}
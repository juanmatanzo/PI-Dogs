import React from "react";
import { Link } from "react-router-dom";
import './Card.modules.css'


export default function Card({id,image, name, weight, temperaments}){
    return (
        <div className="card_container">
            <Link to={'/dogs/' + id}>
                <img className="card_image" src={image} alt="img not found" />
            </Link>
            <div className="card_detail">
                <h3>{name}</h3>
                <h5>Weight: {weight} kg</h5>
                <h5>Temperaments: {temperaments}</h5>
            </div>
        </div>
    )
}
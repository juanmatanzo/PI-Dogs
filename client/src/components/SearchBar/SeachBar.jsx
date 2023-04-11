import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getDogByName } from '../../actions/index';
import './SearchBar.modules.css'

export default function SearchBar(){
    const dispatch = useDispatch()
    const [name, setName] = useState('') //lo seteo en un string vacío

    function handleInputChange(e){ //el value del input va a tomar el value del useState
    e.preventDefault()
    setName(e.target.value)
    console.log(name)
    }

    function handleSubmit(e){
    e.preventDefault()
    if(!name.length){
        alert('Please enter a breed');
    } else {
        dispatch(getDogByName(name));
        setName(''); 
    }
    };   


    return (
        <form className='search_form' onSubmit={(e) => handleSubmit(e)}>
            <input className='search_input' type='text' value={name} placeholder='Write a breed...' onChange = {(e) => handleInputChange(e)}/>
            <button className='search_button' type='submit'>Search</button>
        </form>
    )
}
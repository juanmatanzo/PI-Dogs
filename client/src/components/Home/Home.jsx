import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux'
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import SearchBar from "../SearchBar/SeachBar";
import Paged from '../Paged/Paged'
import { getDogs, getTemperaments, alphabeticOrder, weightOrder, filterByTemperament, filterCreatedBy } from "../../actions";
import './Home.modules.css';


export default function Home(){
    const dispatch = useDispatch();
    const allDogs = useSelector(state => state.dogs)
    const allTemperaments = useSelector(state => state.temperaments)
    const [/*order*/, setOrder] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [dogsPerPage, /*setDogsPerPage*/] = useState(8)

    const indexOfLastDog = currentPage * dogsPerPage
    const indexOfFirstDog = indexOfLastDog - dogsPerPage
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog)

    const paged = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getDogs());
    }, [dispatch])

    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch])

    function handleTemperamentFilter(e){
        e.preventDefault()
        dispatch(filterByTemperament(e.target.value))
        setCurrentPage(1);
        setOrder(e.target.value)
    }

    function handleCreatedFilter(e){
        e.preventDefault();
        dispatch(filterCreatedBy(e.target.value))
        setCurrentPage(1);
        setOrder(e.target.value);
    }

    function handleAlphabeticOrder(e){
        e.preventDefault()
        dispatch(alphabeticOrder(e.target.value))
        setCurrentPage(1)
        setOrder(e.target.value)
    }

    function handleWeightOrder(e){
        e.preventDefault(e)
        if(e.target.value === "Light" || e.target.value === "Heavy") {
            dispatch(weightOrder(e.target.value))
            setCurrentPage(1)
            setOrder(e.target.value)
        }
    }

    function handleClick(e) {
        e.preventDefault();
        dispatch(getDogs())
    }


    return (
        <div className="fondo">
            <div className="home_buttons">
                <Link  to='dog'>
                    <button className="create_button">Create Dog</button>
                </Link>
                <button className="reload_dogs" onClick={e => {handleClick(e)}}>Reload Dogs</button>
            </div>
            <div>
                <div className="home_all_select">
                    <div className="home_select">
                        <select className="home_select_box" onChange={e => handleAlphabeticOrder(e)}>
                            <option value="" hidden>Alphabetic Order</option>
                            <option value="AtoZ">A to Z</option>
                            <option value="ZtoA">Z to A</option>
                        </select>
                    </div>
                    <div className="home_select">
                        <select className="home_select_box" onChange={e => handleWeightOrder(e)}>
                            <option value="" hidden>Weight Order</option>
                            <option value="Light">Light</option>
                            <option value="Heavy">Heavy</option>
                        </select>
                    </div>
                    <div className="home_select">
                        <select className="home_select_box" onChange={e => handleTemperamentFilter(e)}>
                            <option value="" hidden>Temperaments</option>
                            <option value="All">All Temperaments</option>
                            {allTemperaments.map(temperament => (
                                <option value={temperament.name} key={temperament.name}>{temperament.name}</option>
                                ))}
                        </select>
                    </div>
                    <div className="home_select">
                        <select className="home_select_box" onChange={e => handleCreatedFilter(e)}>
                            <option value="" hidden>Dogs</option>
                            <option value="All">All Dogs</option>
                            <option value="Api">Existent</option>
                            <option value="Created">Created</option>
                        </select>
                    </div>
                </div>
                <Paged setCurrentPage={setCurrentPage} currentPage={currentPage} dogsPerPage={dogsPerPage} allDogs={(allDogs.length)} paged={paged}/>
                <SearchBar/>
            </div>
            <div>
                <ul className="card_grid">
                    { currentDogs?.map(el => {
                        return (
                            <Card
                                id={el.id}
                                key={el.id}
                                name={el.name}
                                image={el.image}
                                weight={el.weight ? el.weight : el.weight_min + (' - ') + el.weight_max }
                                temperaments={el.temperament ? el.temperament: el.temperaments?.map((e, index) => el.temperaments.length -1 === index? e.name : e.name + (', '))}
                            />
                        )
                    })}
                </ul>
            </div>
        </div>
    )

}
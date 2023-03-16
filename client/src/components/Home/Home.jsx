import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux'
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import SearchBar from "../SearchBar/SeachBar";
import { getDogs, getTemperaments } from "../../actions";



export default function Home(){

    const dispatch = useDispatch()
    const allDogs = useSelector(state => state.dogs)
    const allTemperaments = useSelector(state => state.temperaments)

    const [currentPage, setCurrentPage] = useState(1)
    const [dogsPerPage, setDogsPerPage] = useState(9)
    const lastIndex = currentPage * dogsPerPage;
    const firstIndex = lastIndex - dogsPerPage
    const currentDogs = allDogs.slice(firstIndex, lastIndex)

    const paginado = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {
        dispatch(getDogs())
        dispatch(getTemperaments())
    }, [dispatch])

    return (
        <div>
            <header>
                <div>
                    <Link to='/'>
                        <div>DogPedia</div>
                    </Link>
                    <div>
                        <SearchBar/>
                        <div>
                            <select>
                                <option disabled selected defaultValue>Alphabetic Order</option>
                                <option value="A-Z">A-Z</option>
                                <option value="Z-A">Z-A</option>
                            </select>
                            <select>
                                <option disabled selected defaultValue>Weight Order</option>
                                <option value="Max">Max Weight</option>
                                <option value="Min">Min Weight</option>
                            </select>
                            <select>
                                <option disabled selected defaultValue>Temperaments</option>
                                <option value="All">All</option>
                                {allTemperaments?.map(el => (
                                    <option value={el.name} key={el.id}>{el.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div>
                    <Link to='/dog'>
                        <button>Create Dog</button>
                    </Link>
                </div>
            </header>

            <hr />

            <div>
                <div>
                    {currentDogs?.map(el => {
                        return (
                            <div>
                                <Link to={'/dog/'+ el.id}>
                                    {<Card 
                                        key={el.id} 
                                        image={el.image} 
                                        name={el.name} 
                                        temperaments={el.temperaments[0].name ? el.temperaments.map(el => el.name): el.temperaments}
                                    />}
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
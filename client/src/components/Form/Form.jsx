import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { postDog, getTemperaments } from "../../actions";
import { useHistory, Link } from "react-router-dom";

export default function Form () {
    const dispatch = useDispatch()
    const history = useHistory()
    const allTemperaments = useSelector(state => state.temperaments).sort((a,b) => {
        if(a.name < b.name) return -1;
        if(b.name < a.name) return 1;
        return 0;
    })

    function validate(data){
        const error = {};
        if(!data.name) error.name = 'Name required';
        if(!data.height_min) error.height_min = 'Min height required';
        if(!data.height_max) error.height_max = 'Max height required';
        if(!data.weight_min) error.weight_min = 'Min weight required';
        if(!data.weight_max) error.weight_max = 'Max weight required';
        if(!data.life_span) error.life_span = 'Life span required';

        return error;
    }

    const [input, setInput] = useState({
        name: "",
        height_min: "",
        height_max: "",
        weight_min: "",
        weight_max: "",
        life_span: "",
        image: "",
        temperaments: [],
    });

    const [error, setError] = useState({
        name: "",
        height_min: "",
        height_max: "",
        weight_min: "",
        weight_max: "",
        life_span: "",
        image: "",
        temperaments: "",
    });

    useEffect(() => {
        dispatch(getTemperaments());
    }, [dispatch])

    // function handleChange(e){
    //     setInput({
    //         ...input,
    //         [e.target.name]: e.target.value
    //     })
    //     console.log(input)
    //     setError(validate({
    //         ...input,
    //         [e.target.name]: e.target.value
    //     }))
    // }

    function handleChange(e) {
        if(e === document.form[6]){
            console.log("handle :", e);
            setInput(prevData => {
                let txT = e.value.split(",");
                const state = {
                    ...prevData,
                    [e.name]: txT
                };
                const validations = validate(state);
                setError(validations);
                return state;
            })
        } else if (e.target.name === 'temperaments') {
            setInput(prevData => {
                let txT = e.target.value.split(',');
                const state = {
                    ...prevData,
                    [e.target.name]: txT,
                }
                const validations = validate(state)
                setError(validations)
                return state;
            })
        } else {
            if (e.target.name === 'image') {
                console.log(e.target.value);
                document.img1.src = e.target.value;
            }
            setInput(prevData => {
                let txT = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
                const state = {
                    ...prevData,
                    [e.target.name]: txT,
                };
                const validations = validate(state);
                setError(validations)
                return state
            })
        }
    }

    function handleTemperamentsSelect(id){
        setInput({
            ...input,
            temperaments: [...input.temperaments, id.target.value]
        })
    };

    function handleDeleteTemperaments(e){
        e.preventDefault()
        setInput({
            ...input,
            temperaments: input.countries.filter(c => c!== e)
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(input)
        dispatch(postDog(input))
        setInput({
            name: "",
            height_min: "",
            height_max: "",
            weight_min: "",
            weight_max: "",
            life_span: "",
            image: "",
            temepraments: []
        });
        alert("Dogs created successfully!")
        history.push("/home")
    }

    return (
        <div>
            <Link to='/home'>
                <button>Home</button>
            </Link>
            <div>
                <h1>Lets create a new dog breed!</h1>
            </div>
            <img src="" alt=""/>
            <div>
                <form name="form" id="form_id" onSubmit={handleSubmit}>
                    <div>
                        <label>Dog Name: </label>
                        <input placeholder="Dog Name" type="text" value={input.name} name="name" onChange={e => handleChange(e)}/>
                        {error.name && (
                            <p>{error.name}</p>
                        )}
                    </div>
                    <div>
                        <label>Image: </label>
                        <input placeholder="Image" type="src" value={input.image} name="image" alt="not found" onChange={e => handleChange(e)}/>
                        {error.image && (
                            <p>{error.image}</p>
                        )}
                    </div>
                    <div>
                        <label>Height: </label>
                        <input placeholder="Height Min" type="text" value={input.height_min} name="height_min" onChange={e => handleChange(e)}/>
                        {error.height_min && (
                            <p>{error.height_min}</p>
                        )}-
                        <input placeholder="Height Max" type="text" value={input.height_max} name="height_max" onChange={e => handleChange(e)}/>
                        {error.height_max && (
                            <p>{error.height_max}</p>
                        )}
                    </div>
                    <div>
                        <label>Weight: </label>
                        <input placeholder="Weight Min" type="text" value={input.weight_min} name="weight_min" onChange={e => handleChange(e)}/>
                        {error.weight_min && (
                            <p>{error.weight_min}</p>
                        )}-
                        <input placeholder="Weight Max" type="text" value={input.weight_max} name="weight_max" onChange={e => handleChange(e)}/>
                        {error.weight_max && (
                            <p>{error.weight_max}</p>
                        )}
                    </div>
                    <div>
                        <label>Life Span: </label>
                        <input placeholder="Life Span" type="text" value={input.life_span} name="life_span" onChange={e => handleChange(e)}/>
                        {error.life_span && (
                            <p>{error.life_span}</p>
                        )}
                    </div>
                    <div>
                        <label>Temperaments: </label>
                        <select onChange={e => handleTemperamentsSelect(e)}>
                            {error.temperaments && (
                                <p>{error.temperaments}</p>
                            )}
                            <option value="" hidden>Select Temperaments</option>
                            {allTemperaments.map(temp => (
                                <option key={temp.id} value={temp.name}>{temp.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <ol>
                            {input.temperaments.map(el => (
                                <div>
                                    <li>{el}</li>
                                    <button onClick={e => handleDeleteTemperaments(e)}>X</button>
                                </div>
                            ))}
                        </ol>
                    </div>
                    <div>
                        <button type="submit">Create Dog</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
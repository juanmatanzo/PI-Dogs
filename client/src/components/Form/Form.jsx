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
        let error = {};
        if(!input.name.trim()) { //input es mi estado local
            error.name = 'Write a name, please'; 
        }else if(parseInt(input.name)){
            error.name = 'Name is invalid, please use at least one letter at the beginning'
        }
    
        if(!input.image) {
            error.image = 'Upload an image, please';  
    
        }
        if(!input.temperaments) {
            error.temperaments = 'Select one or more temperaments, please';
    
        }
        if(input.height_min < 0 || input.height_min > 100){
            error.height_min = 'Require field, please write a valid number between 1 and 100'
        }
        if(input.height_max < 1 || input.height_max > 100){
            error.height_max = 'Require field, please write a valid number between 1 and 100'
        }
        if(input.height_max < input.height_min){
            error.height_max = 'The minimum value cannot be greater than the maximum value'
        }
    
        if(input.weight_min < 0 || input.weight_min > 100){
            error.weight_min = 'Require field, please write a valid number between 1 and 100'
        }
        if(input.weight_max < 1 || input.weight_max > 100){
            error.weight_max = 'Require field, please write a valid number between 1 and 100'    
        }
        if(input.weight_max < input.weight_min){
            error.weight_max = 'The minimum value cannot be greater than the maximum value'
        }
    
        if(input.life_span < 0 || input.life_span > 19){
            error.life_span = 'Require field, please write a valid number between 1 and 19'
        }

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

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setError(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
        console.log(input)
    }

    // function handleChange(e) {
    //     if(e === document.form[6]){
    //         console.log("handle :", e);
    //         setInput(prevData => {
    //             let txT = e.value.split(",");
    //             const state = {
    //                 ...prevData,
    //                 [e.name]: txT
    //             };
    //             const validations = validate(state);
    //             setError(validations);
    //             return state;
    //         })
    //     } else if (e.target.name === 'temperaments') {
    //         setInput(prevData => {
    //             let txT = e.target.value.split(',');
    //             const state = {
    //                 ...prevData,
    //                 [e.target.name]: txT,
    //             }
    //             const validations = validate(state)
    //             setError(validations)
    //             return state;
    //         })
    //     } else {
    //         if (e.target.name === 'image') {
    //             console.log(e.target.value);
    //             document.img1.src = e.target.value;
    //         }
    //         setInput(prevData => {
    //             let txT = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
    //             const state = {
    //                 ...prevData,
    //                 [e.target.name]: txT,
    //             };
    //             const validations = validate(state);
    //             setError(validations)
    //             return state
    //         })
    //     }
    // }

    function handleTemperamentsSelect(e){
        setInput({
            ...input,
            temperaments: [...input.temperaments, e.target.value]
        })
    };

    function handleDeleteTemperaments(e){
        e.preventDefault()
        setInput({
            ...input,
            temperaments: input.temperaments.filter(c => c!== e)
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        setError(
            validate({
                ...input,
                [e.target.name]: e.target.value
            })
        );
        if(!Object.keys(error).length && input.name && input.image && input.height_min && input.height_max && input.weight_min && input.weight_max && input.life_span && input.temperaments){
            input.height_max += ' cm';
            input.weight_max += ' kg';
            input.life_span += ' years';
            dispatch(postDog(input))
            alert("Dogs created successfully!")
            setInput({
                name: "",
                image: "",
                height_min: "",
                height_max: "",
                weight_min: "",
                weight_max: "",
                life_span: "",
                temepraments: []
            });
        } else {
            alert("Error: Dog not created")
            return;
        }
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
                        <button type="submit">Create Dog</button>
                    </div>
                </form>
                {input.temperaments.map(el => (
                    <div>
                        <ul>
                            <li>
                                <p>{el}</p>
                                <button onClick={e => handleDeleteTemperaments(e)}>X</button>
                            </li>
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}
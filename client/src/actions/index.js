import axios from 'axios';

export function getDogs(){
    return async function(dispatch) {
        let json = await axios.get('/dogs');
        return dispatch({
            type: 'GET_DOGS',
            payload: json.data
        })
    }
}

export function getTemperaments(){
    return async function(dispatch){
        let json = await axios.get('/temperaments');
        return dispatch({
            type: 'GET_TEMPERAMENTS',
            payload: json.data
        })
    }
}
import axios from 'axios';

export function getDogs(){
    return async function(dispatch) {
        let json = await axios.get('http://localhost:3001/dogs');
        return dispatch({
            type: 'GET_DOGS',
            payload: json.data
        })
    }
}

export function getDogByName(name){
    return async function (dispatch){
        try{
            var json = await axios.get(`http://localhost:3001/dogs?name=${name}`)
            return dispatch ({
                type: 'GET_DOG_BY_NAME',
                payload: json.data
            })
        } catch(e) {
            console.log(e)
        }
    }
}

export function getDogDetails(id) {
    return async function (dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/dogs/${id}`)
            return dispatch({
                type: 'GET_DETAILS',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function getTemperaments(){
    return async function(dispatch){
        let json = await axios.get('http://localhost:3001/temperaments');
        return dispatch({
            type: 'GET_TEMPERAMENTS',
            payload: json.data
        })
    }
}

export function filterByTemperament(payload){
    return {
        type: 'FILTER_BY_TEMPERAMENT',
        payload
    }
}

export function filterCreatedBy(payload){
    return {
        type: 'FILTER_CREATED_BY',
        payload
    }
}

export function alphabeticOrder(payload){
    return {
        type: payload === 'AtoZ' ? "ALPHABETIC_ORDER_ASC" : "ALPHABETIC_ORDER_DESC"
    }
}

export function weightOrder(payload) {
    return {
        type: "ORDER_BY_WEIGHT",
        payload
    }
}

export function changePage(page){
    return {
        type: "CHANGE_PAGE",
        payload: page
    }
}

export function postDog(payload){
    return async function(dispatch) {
        const data = await axios.post(`http://localhost:3001/dog`, payload);
        console.log(data);
        return data
    }
}
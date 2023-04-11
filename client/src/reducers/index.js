const initialState = {
    dogs: [],
    allDogs: [],
    temperaments: [],
    details: [],
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_DOGS': {
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            }
        }
        case "GET_DOG_BY_NAME": {
            return {
                ...state,
                dogs: action.payload,
            };
        }
        case 'GET_DETAILS':{
            return{
                ...state,
                details: action.payload
            }
        }
        case 'GET_TEMPERAMENTS': {
            return {
                ...state,
                temperaments: action.payload
            }
        }
        case 'FILTER_BY_TEMPERAMENT' : {
            const allBreeds = state.dogs
            const temperamentFiltered = action.payload === 'All'? 
            state.allDogs : allBreeds.filter(el => {
               return el.temperament? el.temperament.includes(action.payload) :
                    el.temperaments?.map(el => el.name).includes(action.payload)      
            })
                return {
                    ...state,
                    dogs: temperamentFiltered     
            }
        }
        case "FILTER_CREATED_BY": {
            const filterCreated = action.payload === 'Created' ? state.allDogs.filter(el => el.createdInDb) : state.allDogs.filter(el => !el.createdInDb)
            return {
                ...state,
                dogs: action.payload === 'All' ? state.allDogs : filterCreated
            } 
        }
        case "ALPHABETIC_ORDER_ASC":{
            return {
                ...state,
                dogs: state.dogs.sort((a, b) => {
                    if (a.name < b.name) return -1;
                    if (b.name < a.name) return 1;
                    return 0;
                })
            }
        }
        case "ALPHABETIC_ORDER_DESC":{
            return {
                ...state,
                dogs: state.dogs.sort((a, b) => {
                    if (a.name > b.name) return -1;
                    if (b.name > a.name) return 1;
                    return 0;
                })
            }
        }
        case 'ORDER_BY_WEIGHT':{
            let sortWeight = action.payload === 'Light'?
                state.dogs.slice().sort(function(a, b) {
                    if(parseInt(a.weight_min) < parseInt(b.weight_min)) {return -1}
                    if(parseInt(b.weight_min) < parseInt(a.weight_min)) {return 1}
                    return 0;
                }) : 
                state.dogs.slice().sort(function(a, b) {
                if(parseInt(a.weight_min) > parseInt(b.weight_min)) {return -1}
                if(parseInt(a.weight_min) > parseInt(b.weight_min)) {return 1}
                return 0;     
                });
            return  {
                ...state,
                dogs: sortWeight,
            }
        };
        case "CHANGE_PAGE": {
            return {
                ...state,
                actualPage: action.payload
            }
        }
        default : {
            return {
                ...state
            }
        }
    }
}
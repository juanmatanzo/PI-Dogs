const initialState = {
    dogs: [],
    temperaments: [],
    detail: [],
    dogBackUp: [],
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_DOGS': {
            return {
                ...state,
                dogs: action.payload,
                dogBackUp: action.payload
            }
        }
        case 'GET_TEMPERAMENTS': {
            return {
                ...state,
                temperaments: action.payload
            }
        }
        default : {
            return {
                ...state
            }
        }
    }
}
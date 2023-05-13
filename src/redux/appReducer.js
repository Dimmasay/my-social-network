//Action Type
import {toIdentifyTC} from "./authReducer";

const INITIALIZATION_IS_SUCCESS = '/appReducer/INITIALIZATION_IS_SUCCESS'

let initialState = {
    initialized: false,
}

let appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZATION_IS_SUCCESS: {
            return {
                ...state,
                initialized: true,
            }
        }
        default:
            return state
    }
}


//Action Create
export const initializationSuccessAC = () => ({type: INITIALIZATION_IS_SUCCESS})


//Thunk Create
export const initializedAppTC = () => async (dispatch) => {
    await dispatch(toIdentifyTC())
    dispatch(initializationSuccessAC())
}


export default appReducer
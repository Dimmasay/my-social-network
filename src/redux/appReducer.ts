//Action Type
import {toIdentifyTC} from "./authReducer.ts";

const INITIALIZATION_IS_SUCCESS = '/appReducer/INITIALIZATION_IS_SUCCESS'

export type InitialStateType = {
    initialized: boolean,
}

let initialState: InitialStateType = {
    initialized: false,
}

let appReducer = (state = initialState, action: any): InitialStateType => {
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
type InitializationSuccessActionType = {
    type: typeof INITIALIZATION_IS_SUCCESS
}
export const initializationSuccessAC = (): InitializationSuccessActionType => ({type: INITIALIZATION_IS_SUCCESS})


//Thunk Create
export const initializedAppTC = () => async (dispatch: any) => {
    await dispatch(toIdentifyTC())
    dispatch(initializationSuccessAC())
}


export default appReducer
//Action Type
import {toIdentifyTC} from "./authReducer.ts";
import {Dispatch} from "react";
import {AppStateType} from "./redux";

const INITIALIZATION_IS_SUCCESS = '/appReducer/INITIALIZATION_IS_SUCCESS'

export type InitialStateType = {
    initialized: boolean,
}

let initialState: InitialStateType = {
    initialized: false,
}


type ActionsTypes = InitializationSuccessActionType

let appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
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

type DispatchType = Dispatch<ActionsTypes | toIdentifyTC>
type GetStateType = () => AppStateType
//Thunk Create
export const initializedAppTC = () => async (dispatch: DispatchType, getState: GetStateType) => {
    await dispatch(toIdentifyTC())
    dispatch(initializationSuccessAC())
}


export default appReducer
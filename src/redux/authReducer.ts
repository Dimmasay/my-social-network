//Action Type

import {authAPI, LoginMeType} from "../api/api.ts";
import {Dispatch} from "react";
import {AppStateType} from "./redux";

const TO_IDENTIFY = '.authReducer/TO_IDENTIFY'
const SET_LOGOUT = '.authReducer/SET_LOGOUT'

export type InitialStateType = {
    isAuth: boolean,
    id: number | null,
    login: string | null,
    email: string | null
}

const initialState: InitialStateType = {
    isAuth: false,
    id: null,
    login: null,
    email: null
}

type ActionsTypes = ToIdentifyActionType | LogOutActionType
const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case TO_IDENTIFY:
            return {
                ...state,
                isAuth: true,
                id: action.id,
                login: action.login,
                email: action.email,
            }
        case SET_LOGOUT:
            return {
                ...state,
                isAuth: false,
                id: null,
                login: null,
                email: null,
            }
        default :
            return state
    }
}

//Action Creators
type ToIdentifyActionType = {
    type: typeof TO_IDENTIFY,
    id: number,
    login: string,
    email: string
}
export const toIdentifyAC = ({id, login, email }: { id: number, login: string, email: string }): ToIdentifyActionType => ({
    type: TO_IDENTIFY,
    id,
    login,
    email
})

export type LogOutActionType = {
    type: typeof SET_LOGOUT
}
export const logOutAC = (): LogOutActionType => ({type: SET_LOGOUT})

//@ts-ignore
type DispatchType = Dispatch<ActionsTypes | toIdentifyTC>
type GetStateType = ()=>AppStateType

//Thunk Creators
export const toIdentifyTC = () => async (dispatch: DispatchType, getState: GetStateType) => {
    let response = await authAPI.getAuth()
    try {
        response.data.resultCode === 0 && dispatch(toIdentifyAC(response.data.data))
    } catch (e) {
        alert(e)
    }


}
export const logInTC = (userData: LoginMeType) => async (dispatch: DispatchType, getState: GetStateType) => {
    let response = await authAPI.logIn(userData)
    try {
        response.data.resultCode === 0 && dispatch(toIdentifyTC())

    } catch (e) {
        alert(e)
    }
}
export const logOutTC = () => async (dispatch: DispatchType, getState: GetStateType) => {
    let response = await authAPI.logOut()
    if (response.data.resultCode === 0) {
        dispatch(logOutAC())
    }
}

export default authReducer
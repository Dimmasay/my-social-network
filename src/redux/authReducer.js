//Action Type

import {authAPI} from "../api/api";

const TO_IDENTIFY = '.authReducer/TO_IDENTIFY'
const SET_LOGOUT = '.authReducer/SET_LOGOUT'

const initialState = {
    isAuth: false,
    id: null,
    login: null,
    email: null
}
const authReducer = (state = initialState, action) => {
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
export const toIdentifyAC = ({id, login, email}) => ({type: TO_IDENTIFY, id, login, email})
export const logOutAC = () => ({type: SET_LOGOUT})


//Thunk Creators
export const toIdentifyTC = () => async (dispatch) => {
    let response = await authAPI.getAuth()
    try {
        response.data.resultCode === 0 && dispatch(toIdentifyAC(response.data.data))
    } catch (e) {
        alert(e)
    }


}
export const logInTC = (userData) => async (dispatch) => {
    let response = await authAPI.logIn(userData)
    try {
        response.data.resultCode === 0 && dispatch(toIdentifyTC())

    } catch (e) {
        alert(e)
    }
}
export const logOutTC = () => async (dispatch) => {
    let response = await authAPI.logOut()
    if (response.data.resultCode === 0) {
        dispatch(logOutAC())
    }
}

export default authReducer
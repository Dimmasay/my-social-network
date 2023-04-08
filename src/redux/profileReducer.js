import {profileAPI} from "../api/api";

const ADD_POST = '.profileReducer/ADD_POST'
const SET_PROFILE = '.profileReducer/SET_PROFILE'
const SET_STATUS = '.profileReducer/SET_STATUS'

const initialState = {
    status: '',
    profile: null,
    posts: [
        {id: 1, text: 'Post text text  1', likes: 15},
        {id: 2, text: 'Post text text 2', likes: 5},
        {id: 3, text: 'Post text text 3', likes: 7}
    ],
}
const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, {
                    id: 4, text: action.post, likes: 0
                }]
            }
        case SET_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        default :
            return state
    }
}

//Action Creators
export const addPostAC = (post) => ({type: ADD_POST, post})
export const setProfileAC = (profile) => ({type: SET_PROFILE, profile})
export const setStatusAC = (status) => ({type: SET_STATUS, status})


//Thunk Creators
export const getProfileTC = (userId) => async (dispatch) => {
    let response = await profileAPI.getUserProfile(userId)
    dispatch(setProfileAC(response.data))
}
export const getStatusTC = (userId) => async (dispatch) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatusAC(response.data))
}
export const updateProfileTC = (myId, profile) => async (dispatch) => {
    let response = await profileAPI.updateProfile(profile)
    if (response) {
        dispatch(getProfileTC(myId))
    }
}
export const updateStatusTC = (myId, status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(getStatusTC(myId))
    }
}
export const updateAvatarTC = (myId, photo) => async (dispatch) => {
    let response = await profileAPI.updateAvatar(photo)
    if (response.data.resultCode === 0) {
        dispatch(getProfileTC(myId))
    }
}

export default profileReducer
import {profileAPI} from "../api/api";

const ADD_POST = '.profileReducer/ADD_POST'
const SET_PROFILE = '.profileReducer/SET_PROFILE'
const SET_STATUS = '.profileReducer/SET_STATUS'
const LIKE_POST = '.profileReducer/LIKE_POST'

const initialState = {
    status: '',
    profile: null,
    posts: [
        {
            id: 1,
            text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
            likes: 15
        },
        {
            id: 2,
            text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English.',
            likes: 5
        },
        {
            id: 3,
            text: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
            likes: 7
        }
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
        case LIKE_POST:
            return {
                ...state,
                posts: state.posts.map(post => {
                    if(post.id === action.idPost){
                        return {...post, likes: post.likes + 1}
                    } else {
                       return post
                    }
                })
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
export const likePostAC = (idPost) => ({type: LIKE_POST, idPost})
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
import {profileAPI} from "../api/api";
// import {toIdentifyAC} from "./authReducer";

const ADD_POST = '.profileReducer/ADD_POST'
const SET_PROFILE = '.profileReducer/SET_PROFILE'
const SET_STATUS = '.profileReducer/SET_STATUS'
const LIKE_POST = '.profileReducer/LIKE_POST'
const UPDATE_IS_SUCCESS = '.profileReducer/UPDATE_IS_SUCCESS'


// enum ProfileActionType {
//     ADD_POST = '.profileReducer/ADD_POST',
//     SET_PROFILE = '.profileReducer/SET_PROFILE',
//     SET_STATUS = '.profileReducer/SET_STATUS',
//     LIKE_POST = '.profileReducer/LIKE_POST',
//     UPDATE_IS_SUCCESS = '.profileReducer/UPDATE_IS_SUCCESS',
// }

type PostType = {
    id: number,
    text: string,
    likes: number
}
type ProfileContactsType = {
    facebook: string | null,
    website: string | null,
    vk: string | null,
    twitter: string | null,
    instagram: string | null,
    youtube: string | null,
    github: string | null,
    mainLink: string | null
}
type ProfilePhotosType = {
    small: string | null,
    large: string | null
}
export type ProfileType = {
    aboutMe: string | null,
    contacts: ProfileContactsType,
    lookingForAJob: boolean,
    lookingForAJobDescription: string | null,
    fullName: string,
    userId: number,
    photos: ProfilePhotosType
}

export type InitialStateType = {
    isUpdate: boolean,
    status: string,
    profile: ProfileType,
    posts: PostType []
}


const initialState: InitialStateType = {
    isUpdate: false,
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
const profileReducer = (state = initialState, action): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, {
                    id: state.posts[state.posts.length - 1].id + 1,
                    text: action.post,
                    likes: 0
                }]
            }
        case LIKE_POST:
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (post.id === action.idPost) {
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
        case UPDATE_IS_SUCCESS:
            return {
                ...state,
                isUpdate: action.value
            }
        default :
            return state
    }
}

//Action Creators
type AddPostActionType = {
    type: typeof ADD_POST,
    post: string
}
export const addPostAC = (post: string): AddPostActionType => ({type: ADD_POST, post})

type LikePostActionType = {
    type: typeof LIKE_POST,
    idPost: number
}
export const likePostAC = (idPost: number): LikePostActionType => ({type: LIKE_POST, idPost})

type SetProfileActionType = {
    type: typeof SET_PROFILE,
    profile: ProfileType
}
export const setProfileAC = (profile: ProfileType): SetProfileActionType => ({type: SET_PROFILE, profile})

type SetStatusActionType = {
    type: typeof SET_STATUS,
    status: string
}
export const setStatusAC = (status: string): SetStatusActionType => ({type: SET_STATUS, status})

type SetUpdateActionType = {
    type: typeof UPDATE_IS_SUCCESS,
    value: boolean
}
export const setUpdateAC = (value: boolean): SetUpdateActionType => ({type: UPDATE_IS_SUCCESS, value})


//Thunk Creators
export const getProfileTC = (userId: number) => async (dispatch: any) => {
    let response = await profileAPI.getUserProfile(userId)
    dispatch(setProfileAC(response.data))
}
export const getStatusTC = (userId: number) => async (dispatch: any) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatusAC(response.data))
}
export const updateProfileTC = (myId: number, profile: ProfileType, setStatus: any) => async (dispatch: any) => {
    let response = await profileAPI.updateProfile(profile)

    if (response.data.resultCode === 0) {
        dispatch(getProfileTC(myId))
        dispatch(setUpdateAC(true))
    } else {
        setStatus(response.data.messages[0])
        dispatch(setUpdateAC(false))
    }
}
export const updateStatusTC = (myId: number, status: any) => async (dispatch: any) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(getStatusTC(myId))
    }
}
export const updateAvatarTC = (myId: number, photo: any) => async (dispatch: any) => {
    let response = await profileAPI.updateAvatar(photo)
    if (response.data.resultCode === 0) {
        dispatch(getProfileTC(myId))
    }
}

export default profileReducer
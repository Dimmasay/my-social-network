import {usersAPI} from "../api/api";

const SET_USERS = '/userReducer/SET_USERS'
const SET_TOTAL_COUNT = '/userReducer/SET_TOTAL_COUNT'
const SET_PAGE = '/userReducer/SET_PAGE'

const IN_FOLLOWING_PROCESS = '/userReducer/IN_FOLLOWING_PROCESS'
const FOLLOW_USER = '/userReducer/FOLLOW_USER'
const UNFOLLOW_USER = '/userReducer/UNFOLLOW_USER'

const initialState = {
    users: [],
    page: 1,
    count: 10,
    totalCount: null,
    inFollowingProcess: []
}
const userReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_USERS:
            return {
                ...state,
                users: action.users
            }
        case SET_TOTAL_COUNT:
            return {
                ...state,
                totalCount: action.value
            }
        case SET_PAGE:
            return {
                ...state,
                page: action.page
            }
        case IN_FOLLOWING_PROCESS:
            return {
                ...state,
                inFollowingProcess:
                    action.value
                        ? [...state.inFollowingProcess, action.userId]
                        : [state.inFollowingProcess.filter(id => id !== action.userId)]
            }
        case FOLLOW_USER:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: true}

                    }
                    return user
                })
            }
        case UNFOLLOW_USER:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: false}
                    }
                    return user
                })
            }
        default :
            return state
    }
}

//Action Creators
export const setUsersAC = (users) => ({type: SET_USERS, users})
export const setTotalCountAC = (value) => ({type: SET_TOTAL_COUNT, value})
export const setPageAC = (page) => ({type: SET_PAGE, page})
export const inFollowingProcessAC = (userId, value) => ({type: IN_FOLLOWING_PROCESS, userId, value})
export const followUserAC = (userId) => ({type: FOLLOW_USER, userId})
export const unFollowUserAC = (userId) => ({type: UNFOLLOW_USER, userId})

//Thunk Creators
export const setUsersTC = (page, count, friend) => async (dispatch) => {
    let data = await usersAPI.getUsers(page, count, friend)
    dispatch(setUsersAC(data.items))
    dispatch(setTotalCountAC(data.totalCount))
}
export const followUserTC = (userId) => async (dispatch) => {
    dispatch(inFollowingProcessAC(userId, true))
    let response = await usersAPI.followUser(userId)
    response.data.resultCode === 0 &&
    dispatch(followUserAC(userId))
    dispatch(inFollowingProcessAC(userId, false))

}
export const unFollowUserTC = (userId) => async (dispatch) => {
    dispatch(inFollowingProcessAC(userId, true))
    let response = await usersAPI.unFollowUser(userId)
    response.data.resultCode === 0 &&
    dispatch(unFollowUserAC(userId))
    dispatch(inFollowingProcessAC(userId, false))
}
export default userReducer
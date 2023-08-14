import {usersAPI} from "../api/api";
import {ProfileType} from "./profileReducer";

const SET_USERS = '.userReducer/SET_USERS'
const SET_TOTAL_COUNT = '.userReducer/SET_TOTAL_COUNT'
const SET_PAGE = '.userReducer/SET_PAGE'
const SET_PREV_FRIENDS = '.userReducer/SET_PREV_FRIENDS'

const IN_FOLLOWING_PROCESS = '.userReducer/IN_FOLLOWING_PROCESS'
const FOLLOW_USER = '.userReducer/FOLLOW_USER'
const UNFOLLOW_USER = '.userReducer/UNFOLLOW_USER'


export type UserInitialStateType = {
    prevFriends: ProfileType[],
    quantityPrevFriends: number,
    users: ProfileType[],
    page: number,
    count: number,
    totalCount: boolean,
    inFollowingProcess: ProfileType[]
}

const initialState: UserInitialStateType = {
    prevFriends: [],
    quantityPrevFriends: 3,
    users: [],
    page: 1,
    count: 16,
    totalCount: null,
    inFollowingProcess: []
}
const userReducer = (state = initialState, action): UserInitialStateType => {
    switch (action.type) {

        case SET_USERS:
            return {
                ...state,
                users: action.users
            }
        case SET_PREV_FRIENDS:
            return {
                ...state,
                prevFriends: action.prevFriends,
                quantityPrevFriends: action.quantity,
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
                    if (user.userId === action.userId) {
                        return {...user, followed: true}

                    }
                    return user
                })
            }
        case UNFOLLOW_USER:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.userId === action.userId) {
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
type SetUsersActionType = {
    type: typeof SET_USERS,
    users: ProfileType[]
}
export const setUsersAC = (users: ProfileType[]): SetUsersActionType => ({type: SET_USERS, users})

type SetPrevFriendsActionType = {
    type: typeof SET_PREV_FRIENDS,
    prevFriends: ProfileType[],
    quantity :number
}
export const setPrevFriendsAC = (prevFriends: ProfileType[], quantity: number): SetPrevFriendsActionType => ({type: SET_PREV_FRIENDS, prevFriends, quantity})

type SetTotalCountActionType = {
    type: typeof SET_TOTAL_COUNT,
    value: number
}
export const setTotalCountAC = (value: number): SetTotalCountActionType => ({type: SET_TOTAL_COUNT, value})

type SetPageActionType = {
    type:typeof SET_PAGE,
    page: number
}
export const setPageAC = (page: number):SetPageActionType => ({type: SET_PAGE, page})

type InFollowingProcessActionType = {
    type: typeof IN_FOLLOWING_PROCESS,
    userId: number,
    value: boolean
}
export const inFollowingProcessAC = (userId: number, value: boolean):InFollowingProcessActionType => ({type: IN_FOLLOWING_PROCESS, userId, value})

type FollowUserActionType = {
    type: typeof FOLLOW_USER,
    userId: number
}
export const followUserAC = (userId: number): FollowUserActionType => ({type: FOLLOW_USER, userId})

type UnFollowUserActonType = {
    type: typeof UNFOLLOW_USER,
    userId: number
}
export const unFollowUserAC = (userId: number): UnFollowUserActonType => ({type: UNFOLLOW_USER, userId})

//Thunk Creators
export const setUsersTC = (page: number, count: number, friend: boolean) => async (dispatch: any) => {

    let data = await usersAPI.getUsers(page, count, friend)
    dispatch(setUsersAC(data.items))
    dispatch(setTotalCountAC(data.totalCount))

}
export const setPrevFriendsTC = (page: number, count: number, friend:boolean = true) => async (dispatch:any) => {
    let data = await usersAPI.getUsers(page, count, friend)
    dispatch(setPrevFriendsAC(data.items, count))

}
export const followUserTC = (userId: number) => async (dispatch: any) => {
    dispatch(inFollowingProcessAC(userId, true))
    let response = await usersAPI.followUser(userId)
    response.data.resultCode === 0 &&
    dispatch(followUserAC(userId))
    dispatch(inFollowingProcessAC(userId, false))

}
export const unFollowUserTC = (userId: number) => async (dispatch: any) => {
    dispatch(inFollowingProcessAC(userId, true))
    let response = await usersAPI.unFollowUser(userId)
    response.data.resultCode === 0 &&
    dispatch(unFollowUserAC(userId))
    dispatch(inFollowingProcessAC(userId, false))
}
export default userReducer
import axios, {AxiosResponse} from "axios";
import {ProfileType} from "../redux/profileReducer";
import {UserPhotosType, UserType} from "../redux/userReducer";
// const axios = require('axios')


//@ts-ignore
const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "Api-Key": 'b2f42c92-a12d-4024-aa96-79bbcb29ee47'
    },
});


type ResponseType = {
    resultCode: number
    messages: string[],
    data: object
}
type PhotoPutType = {
    resultCode: number
    messages: string[],
    data: {
        small: string,
        large: string
    }
}
type ResponseGetUsersType = {
    items: UserType [],
    totalCount: number,
    error: string | null,
}
type ResponseMeType = {
    resultCode: 0
    messages: [],
    data: {
        id: number,
        email: string,
        login: string,
    }
}
type ResponseMeLoginType = {
    resultCode: 0
    messages: [],
    data: {
        userId: number
    }
}
export type LoginMeType = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: boolean

}
export const profileAPI = {
    getUserProfile: (userId: number) => {
        return instance.get(`profile/${userId}`)
            .then((res: AxiosResponse<ProfileType>) => res)
    },
    getStatus: (userId: number) => {
        return instance.get(`profile/status/${userId}`)
            .then((res: AxiosResponse<string>) => res.data)
    },
    updateProfile: (data: ProfileType) => {
        return instance.put(`profile/`, data)
            .then((res: AxiosResponse<ResponseType>) => res)
    },
    updateStatus: (status: string) => {
        return instance.put(`profile/status`, {status})
            .then((res: AxiosResponse<ResponseType>) => res)
    },
    updateAvatar: (photo: any) => {
        const formData = new FormData;
        formData.append('image', photo)
        return instance.put(`/profile/photo/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res: AxiosResponse<PhotoPutType>) => res)
    }
}


export const usersAPI = {
    getUsers: (page :number, count: number, friend: boolean = null) => {
        return instance.get(`users?count=${count}&page=${page}&friend=${friend}`)
            .then((res: AxiosResponse<ResponseGetUsersType>) => res.data)
    },
    followUser: (userId: number) => {
        return instance.post(`follow/${userId}`)
            .then((res: AxiosResponse<ResponseType>) => res)
    },
    unFollowUser: (userId: number) => {
        return instance.delete(`follow/${userId}`)
            .then((res: AxiosResponse<ResponseType>) => res)
    }
}

export const authAPI = {
    getAuth: () => {
        return instance.get('auth/me')
            .then((res: AxiosResponse<ResponseMeType>) => res)
    },
    logIn: (userData: LoginMeType) => {
        return instance.post('auth/login', userData)
            .then((res: AxiosResponse<ResponseMeLoginType>) => res)
    },
    logOut: () => {
        return instance.delete('auth/login')
            .then((res: AxiosResponse<ResponseType>) => res)
    }
}
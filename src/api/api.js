import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    credentials: 'same-origin',
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'b2f42c92-a12d-4024-aa96-79bbcb29ee47'
    }

});

export const profileAPI = {
    getUserProfile: (userId) => {
        return instance.get(`profile/${userId}`)
    },
    getStatus: (userId) => {
        return instance.get(`profile/status/${userId}`)
    },
    updateProfile: (data) => {
        debugger
        return instance.put(`profile/`, data)
            .then((response) => {
                return response
            })
    },
    updateStatus: (status) => {
        return instance.put(`profile/status`, {status})
            .then((response) => {
                return response
            })
    },
    updateAvatar: (photo) => {
        const formData = new FormData;
        formData.append('image', photo)
        return instance.put(`/profile/photo/`, formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}

export const usersAPI = {
    getUsers: (page, count, friend = null) => {
        return instance.get(`users?count=${count}&page=${page}&friend=${friend}`)
            .then((response) => {
                return response.data
            })
    },
    followUser: (userId) => {
        return instance.post(`follow/${userId}`)
            .then((response) => {
                return response
            })
    },
    unFollowUser: (userId) => {
        return instance.delete(`follow/${userId}`)
            .then((response) => {
                return response
            })
    }
}

export const authAPI = {
    getAuth: () => {
        return instance.get('auth/me')
            .then((response) => {
                return response
            })
    },
    logIn: (userData) => {
        return instance.post('auth/login', userData)
            .then((response) => {
                return response
            })
    },
    logOut: () => {
        return instance.delete('auth/login')
            .then((response) => {
                return response
            })
    }
}
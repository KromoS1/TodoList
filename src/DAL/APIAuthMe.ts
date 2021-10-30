import axios from 'axios'
import {ResponseTypeGeneric} from "../redux/types/TypesResponse";
import {AuthMeType} from "../redux/types/Types";

export const axiosInstance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '23cf7b54-6cd9-4cb1-a851-3767976432ef'
    },
})

export const APIAuthMe = {
    me(): Promise<ResponseTypeGeneric<AuthMeType>> {
        return axiosInstance.get<ResponseTypeGeneric<AuthMeType>>("auth/me").then(res => res.data);
    },
    login(payload: { email: string, password: string, rememberMe?: boolean, captcha?: boolean })
        : Promise<ResponseTypeGeneric<{ userId: number }>> {
        return axiosInstance.post<ResponseTypeGeneric<{ userId: number }>>("auth/login", {...payload}).then(res => res.data);
    },
    logOut(): Promise<ResponseTypeGeneric> {
        return axiosInstance.delete<ResponseTypeGeneric>("auth/login").then(res => res.data);
    }
}

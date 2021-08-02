import axios from 'axios'
import {apiKey} from "./Api-key";
import {ResponseTypeGeneric} from "../redux/types/TypesResponse";
import {AuthMeType} from "../redux/types/Types";


const axiosInstance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': apiKey
    }
})

export const APIAuthMe = {
    me(){
        return axiosInstance.get<ResponseTypeGeneric<AuthMeType>>("auth/me")
            .then(response => response.data);
    },
    login(email:string,password:string,rememberMe?:boolean,captcha?:boolean){
        return axiosInstance.post<ResponseTypeGeneric<{userId:number}>>("auth/login",{email,password,rememberMe,captcha})
            .then(response => response.data)
    },
    logOut(){
        return axiosInstance.delete<ResponseTypeGeneric>("auth/login")
            .then(response => response.data)
    }
}
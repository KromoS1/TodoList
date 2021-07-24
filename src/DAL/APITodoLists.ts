import axios from "axios";
import {FilterValuesType} from "../AppWithRedux";

export type TodolistType= {
    id: string
    addedDate: string
    order: number
    title: string
    filter:FilterValuesType
}

type ResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    data: T
}

const axiosInstance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        "API-KEY": "23cf7b54-6cd9-4cb1-a851-3767976432ef"
    }
})

export const APITodoLists = {
    get() {
        return axiosInstance.get<TodolistType[]>("todo-lists")
            .then(res => res.data)
    },
    create(title:string) {
        return axiosInstance.post<ResponseType<{item:TodolistType}>>("todo-lists", {title})
            .then(response => response.data)
    },
    updateTitle(title: string, id: string) {
        return axiosInstance.put<ResponseType>(`todo-lists/${id}`, {title})
            .then(response => response.data.resultCode)
    },
    delete(id: string) {
        return axiosInstance.delete<ResponseType>(`todo-lists/${id}`)
            .then(response => response.data.resultCode)
    },
}


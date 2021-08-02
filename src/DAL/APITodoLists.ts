import axios from "axios";
import {TodoListDomainType} from '../redux/types/Types';
import {ResponseType} from '../redux/types/TypesResponse';
import {apiKey} from "./Api-key";


const axiosInstance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        "API-KEY": apiKey
    }
})

export const APITodoLists = {
    get() {
        return axiosInstance.get<TodoListDomainType[]>("todo-lists")
            .then(res => res.data)
    },
    create(title:string) {
        return axiosInstance.post<ResponseType<{item:TodoListDomainType}>>("todo-lists", {title})
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


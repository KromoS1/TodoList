import axios from 'axios';
import {APIModelPropertyTaskType, TaskType} from '../redux/types/Types';
import {ResponseTypeGet, ResponseTypeGeneric} from '../redux/types/TypesResponse';
import {apiKey} from "./Api-key";


const axiosInstance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists',
    withCredentials: true,
    headers: {
        'API-KEY': apiKey
    }
})

export const APITasks = {
    get(id: string) {
        return axiosInstance.get<ResponseTypeGet<TaskType[]>>(`/${id}/tasks`)
            .then(response => response.data.items)
    },
    create(id: string, title: string) {
        return axiosInstance.post<ResponseTypeGeneric<{item:TaskType}>>(`/${id}/tasks`, {title})
            .then(response => response.data)
    },
    updateTitle(todoListId:string,idTask:string,property:APIModelPropertyTaskType) {
        return axiosInstance.put<ResponseTypeGeneric<{item:TaskType}>>(`/${todoListId}/tasks/${idTask}`,{...property})
            .then(response => response.data)
    },
    delete(todoListId:string,idTask:string) {
        return axiosInstance.delete<ResponseTypeGeneric>(`/${todoListId}/tasks/${idTask}`)
            .then(response => response.data.resultCode)
    }
}
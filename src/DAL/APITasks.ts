import axios from 'axios';
import {PropertyNameType} from '../Tests/TaskReducer';

export type TaskType = {
    id: string
    todoListId: string
    title: string
    completed: boolean
    description: string
    status: number
    priority: number
    order: number
    startDate: string
    addedDate: string
    deadline: string
};

type ResponseTypeGet<T = []> = {
    error:null
    totalCount:number
    items:T
}

type ResponseType<T = {}> = {
    data: T
    resultCode: number
    messages: string
}

type ResponseTypeUpdateTitle<T = []> = {
    data:T
    fieldErrors:[]
    messages:[]
    resultCode:number
}

const axiosInstance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists',
    withCredentials: true,
    headers: {
        'API-KEY': '23cf7b54-6cd9-4cb1-a851-3767976432ef'
    }
})

export const APITasks = {
    get(id: string) {
        return axiosInstance.get<ResponseTypeGet<TaskType[]>>(`/${id}/tasks`)
            .then(response => response.data.items)
    },
    create(id: string, title: string) {
        return axiosInstance.post<ResponseType<{item:TaskType}>>(`/${id}/tasks`, {title})
            .then(response => response.data)
    },
    updateTitle(todoListId:string,idTask:string,property:PropertyNameType) {
        return axiosInstance.put<ResponseTypeUpdateTitle<{item:TaskType}>>(`/${todoListId}/tasks/${idTask}`,{...property})
            .then(response => response.data)
    },
    delete(todoListId:string,idTask:string) {
        return axiosInstance.delete<ResponseType>(`/${todoListId}/tasks/${idTask}`)
            .then(response => response.data.resultCode)
    }
}
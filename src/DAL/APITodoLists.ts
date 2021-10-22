import {TodoListDomainType} from '../redux/types/Types';
import {ResponseTypeGeneric} from '../redux/types/TypesResponse';
import { axiosInstance } from './APIAuthMe';

export const APITodoLists = {
    get() {
        return axiosInstance.get<TodoListDomainType[]>("todo-lists")
            .then(res => res.data)
    },
    create(title:string) {
        return axiosInstance.post<ResponseTypeGeneric<{item:TodoListDomainType}>>("todo-lists", {title})
            .then(response => response.data)
    },
    updateTitle(title: string, id: string) {
        return axiosInstance.put<ResponseTypeGeneric>(`todo-lists/${id}`, {title})
            .then(response => response.data)
    },
    delete(id: string) {
        return axiosInstance.delete<ResponseTypeGeneric>(`todo-lists/${id}`)
            .then(response => response.data)
    },
}


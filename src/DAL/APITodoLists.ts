import {TodoListDomainType} from '../redux/types/Types';
import {ResponseTypeGeneric} from '../redux/types/TypesResponse';
import {axiosInstance} from './APIAuthMe';

export const APITodoLists = {
    get():Promise<TodoListDomainType[]> {
        return axiosInstance.get<TodoListDomainType[]>("todo-lists").then(res => res.data);
    },
    create(title:string):Promise<ResponseTypeGeneric<{item:TodoListDomainType}>> {
        return axiosInstance.post<ResponseTypeGeneric<{item:TodoListDomainType}>>("todo-lists", {title}).then(res => res.data);
    },
    updateTitle(title: string, id: string):Promise<ResponseTypeGeneric> {
        return axiosInstance.put<ResponseTypeGeneric>(`todo-lists/${id}`, {title}).then(res => res.data);
    },
    delete(id: string):Promise<ResponseTypeGeneric> {
        return axiosInstance.delete<ResponseTypeGeneric>(`todo-lists/${id}`).then(res => res.data);
    },
}


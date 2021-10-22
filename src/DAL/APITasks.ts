import {APIModelPropertyTaskType, TaskType} from '../redux/types/Types';
import {ResponseTypeGeneric, ResponseTypeGet} from '../redux/types/TypesResponse';
import {axiosInstance} from "./APIAuthMe";

export const APITasks = {
    get(id: string) {
        return axiosInstance.get<ResponseTypeGet<TaskType[]>>(`/todo-lists/${id}/tasks`)
            .then(response => response.data.items)
    },
    create(id: string, title: string) {
        return axiosInstance.post<ResponseTypeGeneric<{ item: TaskType }>>(`/todo-lists/${id}/tasks`, {title})
            .then(response => response.data)
    },
    updateTitle(todoListId: string, idTask: string, property: APIModelPropertyTaskType) {
        return axiosInstance.put<ResponseTypeGeneric<{ item: TaskType }>>(`/todo-lists/${todoListId}/tasks/${idTask}`, {...property})
            .then(response => response.data)
    },
    delete(todoListId: string, idTask: string) {
        return axiosInstance.delete<ResponseTypeGeneric>(`/todo-lists/${todoListId}/tasks/${idTask}`)
            .then(response => response.data.resultCode)
    }
}

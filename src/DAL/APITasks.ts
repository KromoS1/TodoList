import {APIModelPropertyTaskType, TaskType} from '../redux/types/Types';
import {ResponseTypeGeneric, ResponseTypeGet} from '../redux/types/TypesResponse';
import {axiosInstance} from "./APIAuthMe";

export const APITasks = {
    get(id: string): Promise<ResponseTypeGet<TaskType[]>> {
        return axiosInstance.get<ResponseTypeGet<TaskType[]>>(`/todo-lists/${id}/tasks`).then(res => res.data);
    },
    create(id: string, title: string): Promise<ResponseTypeGeneric<{ item: TaskType }>> {
        return axiosInstance.post<ResponseTypeGeneric<{ item: TaskType }>>(`/todo-lists/${id}/tasks`, {title}).then(res => res.data);
    },
    updateTitle(todoListId: string, idTask: string, property: APIModelPropertyTaskType)
        : Promise<ResponseTypeGeneric<{ item: TaskType }>> {
        return axiosInstance.put<ResponseTypeGeneric<{ item: TaskType }>>(`/todo-lists/${todoListId}/tasks/${idTask}`, {...property})
            .then(res => res.data);
    },
    delete(todoListId: string, idTask: string): Promise<ResponseTypeGeneric> {
        return axiosInstance.delete<ResponseTypeGeneric>(`/todo-lists/${todoListId}/tasks/${idTask}`).then(res => res.data);
    }
}

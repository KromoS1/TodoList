import {call, put, takeEvery} from "redux-saga/effects";
import {ResponseTypeGeneric, ResponseTypeGet} from "../types/TypesResponse";
import {APIModelPropertyTaskType, TaskStateType, TaskType, UpdateModelPropertyTaskType} from "../types/Types";
import {APITasks} from "../../DAL/APITasks";
import {handleServerAppError, handleServerNetworkError} from "../../utils/errorUtils";
import {actionsStatusApp, actionsTask, actionsTodoList} from "../actions/Actions";

export function* getTasksWorker(action:ReturnType<typeof getTasks>){
    yield put(actionsStatusApp.setStatusApp("load"));
    try {
        const res:ResponseTypeGet<TaskType[]> = yield call(APITasks.get,action.idTodolist);
        yield put(actionsTask.getTask(action.idTodolist, res.items));
        yield put(actionsStatusApp.setStatusApp("idle"));
    } catch (error) {
        yield* handleServerNetworkError(error);
    }
}

export function* createTaskWorker(action:ReturnType<typeof createTask>){
    yield put(actionsStatusApp.setStatusApp("load"));
    yield put(actionsTodoList.isDisable(true,action.idTodolist));
    try {
        const res:ResponseTypeGeneric<{ item: TaskType }> = yield call(APITasks.create,action.idTodolist, action.title);
        if (res.resultCode === 0) {
            yield put(actionsTask.addTask(res.data.item));
            yield put(actionsStatusApp.setStatusApp("succeeded"));
            yield put(actionsStatusApp.setMessageStatus("Task created succeeded."));
            yield put(actionsTodoList.isDisable(false,action.idTodolist));
        }else{
            yield* handleServerAppError<{item:TaskType}>(res);
            yield put(actionsTodoList.isDisable(false,action.idTodolist));
        }
    } catch (error) {
        yield* handleServerNetworkError(error);
        yield put(actionsTodoList.isDisable(false,action.idTodolist));
    }
}

export function* updateTaskWorker(action:ReturnType<typeof updateTask>){
    yield put(actionsStatusApp.setStatusApp("load"));
    yield put(actionsTodoList.isDisable(true, action.todoListId));
    const task = action.tasks[action.todoListId].find(tl => tl.id === action.idTask);
    if (!task) {
        throw new Error("task not found in the state");
    }
    const modelAPI: APIModelPropertyTaskType = {
        title: task.title,
        order: task.order,
        description: task.description,
        priority: task.priority,
        status: task.status,
        addedDate: task.addedDate,
        startDate: task.startDate,
        deadline: task.deadline,
        ...action.model
    }
    try {
        const res:ResponseTypeGeneric<{ item: TaskType }> =
            yield call(APITasks.updateTitle,action.todoListId, action.idTask, modelAPI)
        if (res.resultCode === 0) {
            yield put(actionsTask.changeTask(action.todoListId, action.idTask, res.data.item));
            yield put(actionsStatusApp.setStatusApp("succeeded"));
            yield put(actionsStatusApp.setMessageStatus("Task change succeeded."));
            yield put(actionsTodoList.isDisable(false,action.todoListId));
        }else{
            yield* handleServerAppError<{item:TaskType}>(res);
        }
    } catch (error) {
        yield* handleServerNetworkError(error);
        yield put(actionsTodoList.isDisable(false, action.todoListId));
    }
}

export function* deleteTaskWorker(action:ReturnType<typeof deleteTask>){
    yield put(actionsStatusApp.setStatusApp("load"));
    yield put(actionsTodoList.isDisable(true,action.todoListId))
    try {
        const res:ResponseTypeGeneric = yield call(APITasks.delete,action.todoListId, action.idTask)
        if (res.resultCode === 0) {
            yield put(actionsTask.removeTask(action.idTask, action.todoListId));
            yield put(actionsStatusApp.setStatusApp("succeeded"));
            yield put(actionsStatusApp.setMessageStatus("Task remove succeeded."));
            yield put(actionsTodoList.isDisable(false,action.todoListId))
        }
    } catch (error) {
        yield* handleServerNetworkError(error);
        yield put(actionsTodoList.isDisable(false,action.todoListId));
    }
}

export const getTasks = (idTodolist: string) => ({type:'TASK-WORKER/GET-TASKS',idTodolist});
export const createTask = (idTodolist: string, title: string) => ({type:'TASK-WORKER/CREATE-TASKS',idTodolist,title});
export const updateTask = (todoListId: string, idTask: string, model: UpdateModelPropertyTaskType,tasks: TaskStateType) =>
    ({type:'TASK-WORKER/UPDATE-TASKS',todoListId,idTask,model,tasks})
export const deleteTask = (todoListId: string, idTask: string) => ({type:'TASK-WORKER/DELETE-TASK',todoListId,idTask});

export function* taskWatcher() {
    yield takeEvery('TASK-WORKER/GET-TASKS',getTasksWorker);
    yield takeEvery('TASK-WORKER/CREATE-TASKS',createTaskWorker);
    yield takeEvery('TASK-WORKER/UPDATE-TASKS',updateTaskWorker);
    yield takeEvery('TASK-WORKER/DELETE-TASK',deleteTaskWorker);
}

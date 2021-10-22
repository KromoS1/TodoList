import {APITasks} from '../../DAL/APITasks';
import {
    ActionsType,
    APIModelPropertyTaskType,
    TaskStateType,
    TaskType,
    UpdateModelPropertyTaskType
} from '../types/Types';
import {AppRootStateType, AppThunkType} from '../store';
import {handleServerAppError, handleServerNetworkError} from "../../utils/errorUtils";
import {actionsStatusApp, actionsTask, actionsTodoList} from "../actions/Actions";

const initialState: TaskStateType = {}
const actions = {
    ...actionsTask,
    ...actionsStatusApp,
    ...actionsTodoList,
}

export const TaskReducer = (state: TaskStateType = initialState, action: ActionsType<typeof actions>): TaskStateType => {
    switch (action.type) {
        case 'GET-TASK':
            return {...state, [action.todoListId]: [...action.tasks]}
        case 'REMOVE-TASK':
            return {...state, [action.todoListId]: state[action.todoListId].filter(el => el.id !== action.idTask)}
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'ADD-TASKS-FOR-TODOLIST':
            return {...state, [action.todoListId]: []}
        case 'REMOVE-TODOLIST':
            const key = action.todoListId;
            const copyState = {...state};
            delete copyState[key];
            return copyState;
        case 'CHANGE-TASK':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => t.id === action.idTask ? action.task : t)
            }
        default:
            return state
    }
}

export const getTasks = (idTodolist: string): AppThunkType => async dispatch => {
    dispatch(actions.setStatusApp("load"));
    try {
        const tasks = await APITasks.get(idTodolist);
        dispatch(actions.getTask(idTodolist, tasks));
        dispatch(actions.setStatusApp("idle"));
    } catch (error) {
        handleServerNetworkError(error, dispatch);
    }
}

export const createTaskTC = (idTodolist: string, title: string): AppThunkType => async dispatch => {
    dispatch(actions.setStatusApp("load"));
    dispatch(actions.isDisable(true,idTodolist));
    try {
        const data = await APITasks.create(idTodolist, title);
        if (data.resultCode === 0) {
            dispatch(actions.addTask(data.data.item));
            dispatch(actions.setStatusApp("succeeded"));
            dispatch(actions.setMessageStatus("Task created succeeded."));
            dispatch(actions.isDisable(false,idTodolist));
        }else{
            handleServerAppError<{item:TaskType}>(data, dispatch);
            dispatch(actions.isDisable(false,idTodolist));
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch);
        dispatch(actions.isDisable(false,idTodolist));
    }
}

export const updateTask = (todoListId: string, idTask: string, model: UpdateModelPropertyTaskType): AppThunkType =>
    async (dispatch, getState: () => AppRootStateType) => {
        dispatch(actions.setStatusApp("load"));
        dispatch(actions.isDisable(true,todoListId));
        const task = getState().tasks[todoListId].find(tl => tl.id === idTask);
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
            ...model
        }
        try {
            const data = await APITasks.updateTitle(todoListId, idTask, modelAPI)
            if (data.resultCode === 0) {
                dispatch(actions.changeTask(todoListId, idTask, data.data.item));
                dispatch(actions.setStatusApp("succeeded"));
                dispatch(actions.setMessageStatus("Task change succeeded."));
                dispatch(actions.isDisable(false,todoListId));
            }else{
                handleServerAppError<{item:TaskType}>(data, dispatch);
            }
        } catch (error) {
            handleServerNetworkError(error, dispatch);
            dispatch(actions.isDisable(false,todoListId));
        }

    }

export const deleteTask = (todoListId: string, idTask: string): AppThunkType => async dispatch => {
    dispatch(actions.setStatusApp("load"));
    dispatch(actions.isDisable(true,todoListId))
    try {
        const resultCode = await APITasks.delete(todoListId, idTask)
        if (resultCode === 0) {
            dispatch(actions.removeTask(idTask, todoListId));
            dispatch(actions.setStatusApp("succeeded"));
            dispatch(actions.setMessageStatus("Task remove succeeded."));
            dispatch(actions.isDisable(false,todoListId))
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch);
        dispatch(actions.isDisable(false,todoListId));
    }
}

import {TaskStateType} from '../AppWithRedux';
import {Dispatch} from 'redux';
import {APITasks, TaskType} from '../DAL/APITasks';

type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never
export type ActionsType<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesType<T>>
export type PropertyNameType = {
    title?: string
    completed?: boolean
    description?: string
    status?: number
    priority?: number
    order?: number
    startDate?: string
    addedDate?: string
    deadline?: string
}

const initialState: TaskStateType = {}

export const actionsTasks = {
    getTaskAC: (todoListId: string,tasks:TaskType[]) => ({type: 'GET-TASK', todoListId,tasks} as const),
    addTaskAC: (task:TaskType,todoListId:string) =>({type: 'ADD-TASK',task,todoListId} as const),
    removeTaskAC: (idTask: string, todoListId: string) => ({type: 'REMOVE-TASK', todoListId, idTask} as const),
    removeTodoListAC: (todoListId: string) => ({type: 'REMOVE-TODOLIST', todoListId} as const),
    changeTaskAC: (todoListId:string,idTask:string,task:TaskType) => ({type:"CHANGE-TASK",todoListId,idTask,task} as const),
}


export const TaskReducer = (state: TaskStateType = initialState, action: ActionsType<typeof actionsTasks>): TaskStateType => {
    switch (action.type) {
        case 'GET-TASK':
            return {...state,[action.todoListId]: [...action.tasks]}
        case 'REMOVE-TASK':
            return {...state, [action.todoListId]: state[action.todoListId].filter(el => el.id !== action.idTask)}
        case 'ADD-TASK':
            return {...state, [action.todoListId]: [action.task,...state[action.todoListId]]}
        case 'REMOVE-TODOLIST':
            const key = action.todoListId;
            const copyState = {...state};
            delete copyState[key];
            return copyState;
        case 'CHANGE-TASK':
            return {...state,
                [action.todoListId]: state[action.todoListId].map(t => t.id === action.idTask ? action.task : t)
            }
        default:
            return state
    }
}


export const getTasks = (idTodolist:string) => (dispatch:Dispatch) => {
    APITasks.get(idTodolist).then(items => {
        dispatch(actionsTasks.getTaskAC(idTodolist,items));
    })
}

export const createTaskTC = (idTodolist:string,title:string) => (dispatch:Dispatch) => {
    APITasks.create(idTodolist,title).then(data => {
        if (data.resultCode === 0) {
            dispatch(actionsTasks.addTaskAC(data.data.item,data.data.item.todoListId))
        }
    })
}

export const updateTask = (todoListId:string, idTask:string,
                           property:PropertyNameType) => (dispatch:Dispatch) => {
    APITasks.updateTitle(todoListId,idTask,{...property}).then(data => {
        if(data.resultCode === 0) {
            dispatch(actionsTasks.changeTaskAC(todoListId,idTask,data.data.item));
        }
    })
}

export const deleteTask = (todoListId:string,idTask:string) => (dispatch:Dispatch) => {
    APITasks.delete(todoListId,idTask).then(resultCode => {
        if (resultCode === 0) {
            dispatch(actionsTasks.removeTaskAC(idTask,todoListId));
        }
    })
}
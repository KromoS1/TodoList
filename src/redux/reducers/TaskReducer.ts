import {APITasks} from '../../DAL/APITasks';
import {ActionsType, UpdateModelPropertyTaskType, TaskStateType, APIModelPropertyTaskType} from '../types/Types';
import {AppRootStateType, AppThunkType} from '../store';
import { actions } from '../actions/Actions';


const initialState: TaskStateType = {}

export const TaskReducer = (state: TaskStateType = initialState, action: ActionsType<typeof actions>): TaskStateType => {
    switch (action.type) {
        case 'GET-TASK':
            return {...state,[action.todoListId]: [...action.tasks]}
        case 'REMOVE-TASK':
            return {...state, [action.todoListId]: state[action.todoListId].filter(el => el.id !== action.idTask)}
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task,...state[action.task.todoListId]]}
        case 'ADD-TASKS-FOR-TODOLIST':
            return {...state,[action.todoListId]:[]}
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

export const getTasks = (idTodolist:string):AppThunkType =>async dispatch => {
    dispatch(actions.toggleIsLoad(true));
    const tasks = await APITasks.get(idTodolist)
    dispatch(actions.getTask(idTodolist,tasks));
    dispatch(actions.toggleIsLoad(false));
}

export const createTaskTC = (idTodolist:string,title:string):AppThunkType => async dispatch => {
    dispatch(actions.toggleIsLoad(true));
    const data = await APITasks.create(idTodolist,title)
        if (data.resultCode === 0) {
            dispatch(actions.addTask(data.data.item));
            dispatch(actions.toggleIsLoad(false));
        }
}

export const updateTask = (todoListId:string, idTask:string,model:UpdateModelPropertyTaskType):AppThunkType =>
    async( dispatch,getState:()=>AppRootStateType) => {
    dispatch(actions.toggleIsLoad(true));
    const task = getState().tasks[todoListId].find(tl => tl.id === idTask);
    if (!task){
        throw new Error("task not found in the state");
    }
    const modelAPI: APIModelPropertyTaskType ={
        title:task.title,
        order:task.order,
        description:task.description,
        priority:task.priority,
        status:task.status,
        addedDate:task.addedDate,
        startDate:task.startDate,
        deadline:task.deadline,
        ...model
    }

    const data = await APITasks.updateTitle(todoListId,idTask,modelAPI)
        if(data.resultCode === 0) {
            dispatch(actions.changeTask(todoListId,idTask,data.data.item));
            dispatch(actions.toggleIsLoad(false));
        }
}

export const deleteTask = (todoListId:string,idTask:string):AppThunkType => async dispatch => {
    dispatch(actions.toggleIsLoad(true));
    const resultCode = await APITasks.delete(todoListId,idTask)
        if (resultCode === 0) {
            dispatch(actions.removeTask(idTask,todoListId));
            dispatch(actions.toggleIsLoad(false));
        }
}
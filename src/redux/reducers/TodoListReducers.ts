import {APITodoLists} from '../../DAL/APITodoLists';
import {ActionsType, TodoListDomainType} from '../types/Types';
import {AppThunkType} from '../store';
import {actions} from '../actions/Actions';
import {handleServerAppError, handleServerNetworkError} from "../../utils/errorUtils";

const initialState: TodoListDomainType[] = [];


export const TodoListReducers = (state: TodoListDomainType[] = initialState, action: ActionsType<typeof actions>): TodoListDomainType[] => {
    switch (action.type) {
        case 'GET-TODO-LISTS':
            return action.todoLists.map(tl => ({...tl, filter: "all", isLoad: false}));
        case 'ADD-TODOLIST':
            return [...state, {...action.todoList, filter: "all"}];
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.todoListID ? {...tl, title: action.title} : tl);
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.todoListID ? {...tl, filter: action.filter} : tl);
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.todoListId);
        }
        case "IS-DISABLE":
            return state.map(tl => tl.id === action.todoListId ? {...tl, disable: action.disable} : tl);
        default:
            return state
    }
}

export const getTodoListsTC = (): AppThunkType => async dispatch => {
    dispatch(actions.setStatusApp("load"));
    try {
        const todoLists = await APITodoLists.get();
        dispatch(actions.getTodoLists(todoLists));
        dispatch(actions.setStatusApp("idle"));
    } catch (error) {
        handleServerNetworkError(error, dispatch);
    }
}

export const addTodolistTC = (title: string): AppThunkType => async dispatch => {
    dispatch(actions.setStatusApp("load"));
    try {
        const todoList = await APITodoLists.create(title);
        if (todoList.resultCode === 0) {
            dispatch(actions.addTodoList(todoList.data.item))
            dispatch(actions.addTasksTodoList(todoList.data.item.id))
            dispatch(actions.setStatusApp("succeeded"));
            dispatch(actions.setMessageStatus("Todo list created succeeded."));
        } else {
            handleServerAppError<{ item: TodoListDomainType }>(todoList, dispatch);
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch);
    }
}

export const deleteTodoListTC = (id: string): AppThunkType => async dispatch => {
    dispatch(actions.setStatusApp("load"));
    dispatch(actions.isDisable(true, id));
    try {
        const data = await APITodoLists.delete(id)
        if (data.resultCode === 0) {
            dispatch(actions.removeTodoList(id));
            dispatch(actions.removeTodoList(id));
            dispatch(actions.setStatusApp("succeeded"));
            dispatch(actions.setMessageStatus("Todo list remove succeeded."));
            dispatch(actions.isDisable(false, id));
        }else{
            handleServerAppError(data, dispatch);
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch);
        dispatch(actions.isDisable(false, id));
    }
}

export const updateTitleTodoListTC = (id: string, title: string): AppThunkType => async dispatch => {
    dispatch(actions.setStatusApp("load"));
    dispatch(actions.isDisable(true, id));
    try {
        const data = await APITodoLists.updateTitle(title, id)
        if (data.resultCode === 0) {
            dispatch(actions.changeTodoListTitle(id, title));
            dispatch(actions.setStatusApp("succeeded"));
            dispatch(actions.setMessageStatus("Todo list change succeeded."));
            dispatch(actions.isDisable(false, id));
        }else{
            handleServerAppError(data, dispatch);
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch);
        dispatch(actions.isDisable(false, id));
    }
}
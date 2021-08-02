import {APITodoLists} from '../../DAL/APITodoLists';
import {ActionsType, TodoListDomainType} from '../types/Types';
import {AppThunkType} from '../store';
import { actions } from '../actions/Actions';

const initialState: TodoListDomainType[] = [];


export const TodoListReducers = (state: TodoListDomainType[] = initialState, action: ActionsType<typeof actions>): TodoListDomainType[] => {
    switch (action.type) {
        case 'GET-TODO-LISTS':
            return action.todoLists.map(tl => ({...tl,filter:"all"}));
        case 'ADD-TODOLIST':
            return [{...action.todoList,filter:"all"},...state];
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.todoListID ? {...tl, title: action.title} : tl);
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.todoListID ? {...tl, filter: action.filter} : tl);
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.todoListId);
        }
        default:
            return state
    }
}

export const getTodoListsTC = (): AppThunkType => async dispatch => {
    dispatch(actions.toggleIsLoad(true));
    const todoLists = await APITodoLists.get();
    dispatch(actions.getTodoLists(todoLists));
    dispatch(actions.toggleIsLoad(false));
}

export const addTodolistTC = (title: string): AppThunkType => async dispatch => {
    dispatch(actions.toggleIsLoad(true));
    const todoList = await APITodoLists.create(title);
    if (todoList.resultCode === 0) {
        dispatch(actions.addTodoList(todoList.data.item))
        dispatch(actions.addTasksTodoList(todoList.data.item.id))
        dispatch(actions.toggleIsLoad(false));
    }
}

export const deleteTodoListTC = (id: string): AppThunkType => async dispatch => {
    dispatch(actions.toggleIsLoad(true));
    const resultCode = await APITodoLists.delete(id)
    if (resultCode === 0) {
        dispatch(actions.removeTodoList(id));
        dispatch(actions.removeTodoList(id));
        dispatch(actions.toggleIsLoad(false));
    }
}

export const updateTitleTodoListTC = (id: string, title: string):AppThunkType =>async dispatch => {
    dispatch(actions.toggleIsLoad(true));
    const resultCode = await APITodoLists.updateTitle(title, id)
        if (resultCode === 0) {
            dispatch(actions.changeTodoListTitle(id, title));
            dispatch(actions.toggleIsLoad(false));
        }
}
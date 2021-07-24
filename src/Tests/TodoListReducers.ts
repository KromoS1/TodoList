import {FilterValuesType} from "../AppWithRedux";
import {Dispatch} from "redux";
import {APITodoLists, TodolistType} from "../DAL/APITodoLists";
import {APITasks} from '../DAL/APITasks';
import {actionsTasks} from './TaskReducer';

type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never
export type ActionsType<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesType<T>>

const initialState: TodolistType[] = [];

export const actionsTodoList = {
    getTodolists: (todoLists:TodolistType[]) => ({type:"GET-TODO-LISTS",todoLists} as const),
    addTodoListAC: (title: string, todolistID: string, addedDate: string, order: number) =>
        ({type: "ADD-TODOLIST", title, todolistID, addedDate, order} as const),
    removeTodoListAC: (todoListID: string) => ({type: "REMOVE-TODOLIST", todoListID} as const),
    changeTodoListTitleAC: (todoListID: string, title: string) =>
        ({type: "CHANGE-TODOLIST-TITLE", todoListID, title} as const),
    changeTodoListFilterAC: (todoListID: string, filter: FilterValuesType) =>
        ({type: "CHANGE-TODOLIST-FILTER", todoListID, filter} as const)
}


export const TodoListReducers = (state: TodolistType[] = initialState, action: ActionsType<typeof actionsTodoList>): TodolistType[] => {
    switch (action.type) {
        case "GET-TODO-LISTS":
            return [...state,...action.todoLists]
        case "ADD-TODOLIST":
            const newTodoList: TodolistType =
                {
                    title: action.title, filter: "all", id: action.todolistID,
                    addedDate: action.addedDate, order: action.order
                };
            return [...state, newTodoList];
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.todoListID);
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.todoListID ? {...tl, title: action.title} : tl);
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.todoListID ? {...tl, filter: action.filter} : tl);
        default:
            return state
    }
}

export const getTodolistsTC = () => (dispatch: Dispatch) => {
    APITodoLists.get().then(data => {
        dispatch(actionsTodoList.getTodolists(data));
    })
}

export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    APITodoLists.create(title).then(data => {
        if (data.resultCode === 0) {
            const item = data.data.item;
            dispatch(actionsTodoList.addTodoListAC(title, item.id,
                item.addedDate, item.order))
        }
    })
}

export const deleteTodoListTC = (id:string) => (dispatch:Dispatch) => {
    APITodoLists.delete(id).then(resultCode => {
        if (resultCode === 0 ){
            dispatch(actionsTodoList.removeTodoListAC(id));
            dispatch(actionsTasks.removeTodoListAC(id));
        }
    })
}

export const updateTitleTodoListTC = (id:string,title:string) => (dispatch:Dispatch) => {
    APITodoLists.updateTitle(title,id).then(resultCode => {
        if (resultCode === 0){
            dispatch(actionsTodoList.changeTodoListTitleAC(id,title));
        }
    })
}
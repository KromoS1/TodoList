import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";


type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never
export type ActionsType<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesType<T>>


export const actionsTodoList = {
    removeTodoListAC: (todoListID:string) => ({type:"REMOVE-TODOLIST", todoListID:todoListID} as const),
    addTodoListAC : (title: string) => ({type: "ADD-TODOLIST", title: title,idTodoList:v1()}as const),
    changeTodoListTitleAC: (todoListID: string,title: string) =>
        ({type:"CHANGE-TODOLIST-TITLE", todoListID:todoListID, title:title}as const),
    changeTodoListFilterAC: ( todoListID: string,filter: FilterValuesType) =>
        ({type: "CHANGE-TODOLIST-FILTER", todoListID:todoListID,filter:filter}as const)
}


export const TodoListReducers = (state: TodoListType[], action: ActionsType< typeof actionsTodoList>):TodoListType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.todoListID);
        case "ADD-TODOLIST":
            const newTodoList: TodoListType = {title: action.title, filter: "all",id:action.idTodoList};
            return [...state,newTodoList];
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.todoListID ? {...tl, title: action.title} : tl);
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.todoListID ? {...tl, filter: action.filter} : tl);
        default: return state
    }
}

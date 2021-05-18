import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";


type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never
export type ActionsType<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesType<T>>


const actions = {
    RemoveTodoListAC: (todoListID:string) => ({type:"REMOVE-TODOLIST", todoListID:todoListID} as const),
    AddTodoListAC : (title: string) => ({type: "ADD-TODOLIST", title: title}as const),
    ChangeTodoListTitleAC: (todoListID: string,title: string) =>
        ({type:"CHANGE-TODOLIST-TITLE", todoListID:todoListID, title:title}as const),
    ChangeTodoListFilterAC: ( todoListID: string,filter: FilterValuesType) =>
        ({type: "CHANGE-TODOLIST-FILTER", todoListID:todoListID,filter:filter}as const)
}


export const TodoListReducers = (todoList: TodoListType[], action: ActionsType< typeof actions>):TodoListType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todoList.filter(tl => tl.id !== action.todoListID);
            break;
        case "ADD-TODOLIST":
            const newTodoList: TodoListType = {id: v1(), title: action.title, filter: "all"};
            return [...todoList,newTodoList];
            break;
        case "CHANGE-TODOLIST-TITLE":
            return todoList.map(tl => tl.id === action.todoListID ? {...tl, title: action.title} : tl);
            break;
        case "CHANGE-TODOLIST-FILTER":
            return todoList.map(tl => tl.id === action.todoListID ? {...tl, filter: action.filter} : tl);
        default: return todoList
    }
}
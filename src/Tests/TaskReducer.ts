import {TaskStateType} from "../AppWithRedux";
import {v1} from "uuid";


type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never
export type ActionsType<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesType<T>>

const initialState: TaskStateType = {}

export const actionsTasks  = {
    removeTaskAC: (idTask:string, idTodoList:string) => ({type:"REMOVE-TASK", idTodoList, idTask} as const),
    addTaskAC: (title: string, idTodoList: string) => ({type:"ADD-TASK",title,idTodoList} as const),
    changeTaskStatusAC : (idTask: string, isDone: boolean, idTodoList: string) => ({type:"CHANGE-TASK-STATUS",idTask,isDone,idTodoList} as const),
    changeTaskTitleAC : (idTask: string, newTitle: string, idTodoList: string) =>({type:"CHANGE-TASK-TITLE",idTask,newTitle,idTodoList} as const),
    addTodoListAC : (idTodoList:string) => ({type: "ADD-TODOLIST", idTodoList }as const),
    removeTodoListAC: (idTodoList:string) => ({type:"REMOVE-TODOLIST", idTodoList} as const)
}


export const TaskReducer = (state: TaskStateType = initialState, action: ActionsType< typeof actionsTasks>):TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {...state, [action.idTodoList]: state[action.idTodoList].filter(el => el.id !== action.idTask)}
        case "ADD-TASK":
            const newTask = {id: v1(), title: action.title, isDone: false}
            return {...state,[action.idTodoList]: [newTask, ...state[action.idTodoList]]}
        case "CHANGE-TASK-STATUS":
            return {...state,[action.idTodoList] : state[action.idTodoList].map(t => t.id === action.idTask ? {...t, isDone: action.isDone} : t)}
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.idTodoList]: state[action.idTodoList].map(t => t.id === action.idTask ? {...t, title: action.newTitle} : t)
            }
        case "ADD-TODOLIST":
          return {...state,[action.idTodoList]:[]}
        case "REMOVE-TODOLIST":
            const key = action.idTodoList;
            const copyState = {...state};
            delete copyState[key];
            return copyState;

        default: return state
    }
}

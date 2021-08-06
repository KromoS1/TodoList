import {AuthMeType, FilterValuesType, TaskType, TodoListDomainType} from '../types/Types';
import {StatusType} from "../reducers/StatusAppReducer";

export const actions = {
    getTodoLists: (todoLists: TodoListDomainType[]) => ({type: 'GET-TODO-LISTS', todoLists} as const),
    addTodoList: (todoList: TodoListDomainType) => ({type: 'ADD-TODOLIST', todoList} as const),
    removeTodoList: (todoListId: string) => ({type: 'REMOVE-TODOLIST', todoListId} as const),
    changeTodoListTitle: (todoListID: string, title: string) => ({
        type: 'CHANGE-TODOLIST-TITLE',
        todoListID,
        title
    } as const),
    changeTodoListFilter: (todoListID: string, filter: FilterValuesType) => ({
        type: 'CHANGE-TODOLIST-FILTER',
        todoListID,
        filter
    } as const),
    getTask: (todoListId: string, tasks: TaskType[]) => ({type: 'GET-TASK', todoListId, tasks} as const),
    addTask: (task: TaskType) => ({type: 'ADD-TASK', task,} as const),
    addTasksTodoList: (todoListId: string) => ({type: 'ADD-TASKS-FOR-TODOLIST', todoListId} as const),
    removeTask: (idTask: string, todoListId: string) => ({type: 'REMOVE-TASK', todoListId, idTask} as const),
    changeTask: (todoListId: string, idTask: string, task: TaskType) => ({
        type: 'CHANGE-TASK',
        todoListId,
        idTask,
        task
    } as const),
    setMeData: (data:AuthMeType,isAuth:boolean) => ({type: "SET-ME-DATA",data,isAuth} as const),
    setIsAuth:(isAuth:boolean) => ({type:"SET-IS-AUTH",isAuth} as const),
    setMeId:(id:number) => ({type:"SET-ME-ID",id} as const),
    logOut:() => ({type:"LOG-OUT"} as const),
    setStatusApp: (status:StatusType) => ({type:"SET/APP-STATUS",status} as const),
    setMessageStatus:(message?:string) => ({type:"SET-MESSAGE-STATUS",message} as const),
    isDisable:(disable:boolean, todoListId:string) => ({type:"IS-DISABLE",disable,todoListId} as const),
    setAppInitialized:(isInitialized:boolean) => ({type:"SET-APP-INITIALIZED",isInitialized} as const),
};
type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never
export type ActionsType<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesType<T>>

// todolist type

export type TodoListDomainType = TodolistType & {
    filter: FilterValuesType
    disable: boolean
}
export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistPropsType = {
    todoList:TodoListDomainType
    tasks: TaskType[]
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTodoListTitle: (todoListID: string, title: string) => void
};

export type TodoListContainerType = {
    todoLists: TodoListDomainType[]
    tasks: TaskStateType
}


///task type
export type TaskType = {
    id: string
    todoListId: string
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    order: number
    startDate: string
    addedDate: string
    deadline: string
};

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4,
}

export type TaskStateType = {
    [key: string]: TaskType[]
}

export type TaskTypeProps = {
    task: TaskType
    todoListId: string
    disable:boolean
    removeTask: (idTask: string, todoListID: string) => void
    changeTask: (todolistId: string, idTask: string, task: UpdateModelPropertyTaskType) => void
}

export type TaskContainerPropsType = {
    tasks: TaskType[]
    todoListId: string
    filter: FilterValuesType
    disable:boolean
}

export type UpdateModelPropertyTaskType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    order?: number
    startDate?: string
    addedDate?: string
    deadline?: string
}

export type APIModelPropertyTaskType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    order: number
    startDate: string
    addedDate: string
    deadline: string
}

//isAuth types
export type AuthMeType = {
    id: number
    login: string
    email: string
}

export type MeProfileType = AuthMeType & {
    password: string
    rememberMe?: boolean
    captcha?: boolean
    isAuth:boolean
}

export type FormDataLoginType = {
    email: string,
    password: string,
    rememberMe: boolean
    captcha?: boolean
}

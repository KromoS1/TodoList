type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never
export type ActionsType<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesType<T>>

// todolist type

export type TodoListDomainType = TodolistType & {
    filter: FilterValuesType
    isLoad?: boolean
}
export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistPropsType = {
    todoListId: string
    title: string,
    tasks: TaskType[]
    filter: FilterValuesType
    // removeTask: (id: string, todoListID: string) => void
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTodoListTitle: (todoListID: string, title: string) => void
    // changeTask: (todolistId: string, idTask: string, model: UpdateModelPropertyTaskType) => void
};


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
    isLoad?: boolean
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
    removeTask: (idTask: string, todoListID: string) => void
    changeTask: (todolistId: string, idTask: string, task: UpdateModelPropertyTaskType) => void
}

export type TaskContainerPropsType = {
    tasks: TaskType[]
    todoListId: string
    filter: FilterValuesType
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

//addItemForm
export type AddItemFormType = {
    addItem: (title: string) => void
}

//editableSpan
export type EditableSpanType = {
    title: string
    changeTitle: (newTitle: string) => void
    type: 'title' | 'priority'
    click?: () => void
};

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

export type FormDataType = {
    email: string,
    password: string,
    rememberMe: boolean
    captcha: boolean
}
import React, {useState} from 'react';
import './App.css';
import TodoList from "./Components/TodoList";
import {v1} from "uuid";


export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
};
type TaskStateType = {
    [key: string]: Array<TaskType>
}
export type FilterValuesType = "all" | "active" | "completed";
type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
};

function App() {
    const todoListId_1 = v1();
    const todoListId_2 = v1();
    const [todoList, setTodoList] = useState<Array<TodoListType>>([
        {id: todoListId_1, title: "what to learn", filter: "all"},
        {id: todoListId_2, title: "what to buy", filter: "all"}
    ]);

    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListId_1]: [{id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest APi", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}
        ],
        [todoListId_2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Meat", isDone: true},
            {id: v1(), title: "Beer", isDone: false},
            {id: v1(), title: "Cheese", isDone: false}
        ]
    });

    const getTask = (todoList: TodoListType) => { // UI
        switch (todoList.filter) {
            case "active" :
                return tasks[todoList.id].filter(t => !t.isDone);
            case "completed" :
                return tasks[todoList.id].filter(t => t.isDone);
            default:
                return tasks[todoList.id]
        }
    }

    const addTask = (title: string, todoListID: string) => {
        const newTask = {id: v1(), title: title, isDone: false}
        tasks[todoListID] = [newTask, ...tasks[todoListID]];
        setTasks({...tasks});
    }
    const removeTask = (id: string, todoListID: string) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(el => el.id !== id)});
    }
    const changeFilter = (value: FilterValuesType, todoListID: string) => {
        setTodoList(todoList.map(tl => tl.id === todoListID ? {...tl, filter: value} : tl));
    }
    const changeStatus = (id: string, isDone: boolean, todoListID: string) => {
        tasks[todoListID] = tasks[todoListID].map(t => t.id === id ? {...t, isDone: isDone} : t)
        setTasks({...tasks});
    }
    const removeTodoList = (todoListID:string) => {
        setTodoList(todoList.filter(tl => tl.id !== todoListID));
        delete tasks[todoListID];
    }

    const todoListsComponent = todoList.map(tl => {
        return (
            <TodoList title={tl.title}
                      key={tl.id}
                      todoListID={tl.id}
                      tasks={getTask(tl)}
                      filter={tl.filter}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeCheckboxStatus={changeStatus}
                      removeTodoList={removeTodoList}
            />

        )
    })
    return (
        <div className="App">
            {todoListsComponent}
        </div>
    );
}

export default App;

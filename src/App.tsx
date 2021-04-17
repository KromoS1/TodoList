import React, {useState} from 'react';
import './App.css';
import TodoList from "./Components/TodoList";
import {v1} from "uuid";

export type TaskType = {
    id: string,
    title: string;
    isDone: boolean;
};
export type FilterValuesType = "all" | "active" | "completed";

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest APi", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false}
    ]);

    let [filter, setFilter] = useState<FilterValuesType>("all");

    const getTask = () => {
        switch (filter){
            case "active":
                return tasks.filter(el => !el.isDone)
            case "completed":
                return tasks.filter(el => el.isDone)
            default:
                return tasks
        }
    }

    const addTask = (title: string) => {
        let task = {id: v1(), title:title, isDone:false}
        setTasks([task,...tasks]);
    }

    const removeTask = (id: string) => {
        let filteredTask = tasks.filter(el => el.id !== id);
        setTasks(filteredTask);
    }

    const changeFilter = (value: FilterValuesType) => {
        setFilter(value);
    }

    return (
        <div className="App">
            <TodoList title={"What to learn"}
                      tasks={getTask()}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
            />
        </div>
    );
}

export default App;

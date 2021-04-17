import React, {ChangeEvent,KeyboardEvent,useState} from "react";
import {FilterValuesType, TaskType} from "../App";

type PropsType = {
    title: string,
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
};

const TodoList = (props: PropsType) => {
    let [title, setTitle] = useState("");
    const tasks = props.tasks.map(el => {
        const onClickHandler = () => {props.removeTask(el.id)}
        return <li key={el.id}>
            <input type="checkbox" checked={el.isDone}/>
            <span>{el.title}</span>
            <button onClick={onClickHandler}>x</button>
        </li>
    });
    const addTask = () => {
        props.addTask(title)
        setTitle("");
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter"){
            addTask();
        }
    }
    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}/>
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {tasks}
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
}

export default TodoList;
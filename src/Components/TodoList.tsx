import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType,TaskType} from "../App";

type PropsType = {
    todoListID: string
    title: string,
    tasks:Array<TaskType>
    filter: FilterValuesType
    removeTask: (id: string,todoListID:string) => void
    changeFilter: (value: FilterValuesType,todoListID:string) => void
    addTask: (title: string, todoListID:string) => void
    changeCheckboxStatus: (id: string, isDone: boolean,todoListID:string) => void
    removeTodoList: (todoListID: string) => void
};

const TodoList:React.FC<PropsType> = ({
todoListID, title,filter,tasks,
removeTask, changeFilter,addTask, changeCheckboxStatus,removeTodoList
}) => {
    let [titleInput, setTitleInput] = useState("");
    let [error,setError] = useState<string | null>(null);

    const taskJSXElement = tasks.map(el => {
        const onClickHandler = () => {removeTask(el.id,todoListID)}
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            changeCheckboxStatus(el.id,newIsDoneValue,todoListID);
        }
        return <li className={el.isDone ? "is-done" : ""} key={el.id}>
            <input type="checkbox"
                   checked={el.isDone}
                   onChange={changeStatus}
            />
            <span>{el.title}</span>
            <button onClick={onClickHandler}>x</button>
        </li>
    });

    const add = () => {
        if (titleInput === "") return;
        if (titleInput.trim() === "") {
            setTitleInput("");
            setError("Title is required!");
            return;
        }
        addTask(titleInput.trim(),todoListID)
        setTitleInput("");
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleInput(e.currentTarget.value);
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter"){
            add();
        }
    }
    const onAllClickHandler = () => changeFilter("all",todoListID);
    const onActiveClickHandler = () => changeFilter("active",todoListID);
    const onCompletedClickHandler = () => changeFilter("completed",todoListID);
    const onClickRemoveTodoList = () => removeTodoList(todoListID);

    return (
        <div>
            <h3>{title}<button onClick={onClickRemoveTodoList}>X</button></h3>
            <div>
                <input value={titleInput}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? "error" : ""}
                       onClick={() => setError(null)}
                />
                <button onClick={add}>+</button>
                {error && <div className={"error-message"}>{error}</div> }
            </div>
            <ul>
                {taskJSXElement}
            </ul>
            <div>
                <button className={filter === "all" ? "active-filter" : "" }
                        onClick={onAllClickHandler}>All</button>
                <button className={filter === "active" ? "active-filter" : "" }
                    onClick={onActiveClickHandler}>Active</button>
                <button className={filter === "completed" ? "active-filter" : "" }
                    onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
}

export default TodoList;
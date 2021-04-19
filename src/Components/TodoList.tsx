import React, {ChangeEvent,KeyboardEvent,useState} from "react";
import {FilterValuesType, TaskType} from "../App";

type PropsType = {
    title: string,
    arrTasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeCheckboxStatus: (id: string, isDone: boolean) => void
};

const TodoList:React.FC<PropsType> = ({
    title,arrTasks,filter,removeTask,changeFilter,addTask,changeCheckboxStatus
                                      }) => {
    let [titleInput, setTitleInput] = useState("");
    let [error,setError] = useState<string | null>(null);
    const tasks = arrTasks.map(el => {
        const onClickHandler = () => {removeTask(el.id)}
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            changeCheckboxStatus(el.id,newIsDoneValue);
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
        addTask(titleInput.trim())
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
    const onAllClickHandler = () => changeFilter("all");
    const onActiveClickHandler = () => changeFilter("active");
    const onCompletedClickHandler = () => changeFilter("completed");

    return (
        <div>
            <h3>{title}</h3>
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
                {tasks}
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
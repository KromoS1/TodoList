import React, {ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "../App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

type PropsType = {
    todoListID: string
    title: string,
    tasks: TaskType[]
    filter: FilterValuesType
    removeTask: (id: string, todoListID: string) => void
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeCheckboxStatus: (id: string, isDone: boolean, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTaskTitle: (id: string, newTitle: string, todoListID: string) => void
    changeTodoListTitle: (todoListID: string, title: string) => void
};

const TodoList: React.FC<PropsType> = (props) => {

    const taskJSXElement = props.tasks.map(el => {
        const onClickHandler = () => {
            props.removeTask(el.id, props.todoListID)
        }
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            props.changeCheckboxStatus(el.id, newIsDoneValue, props.todoListID);
        }
        const changeTaskTitle = (title: string) => {
            props.changeTaskTitle(el.id, title, props.todoListID);
        }
        return <li className={el.isDone ? "is-done" : ""} key={el.id}>
            <input type="checkbox"
                   checked={el.isDone}
                   onChange={changeTaskStatus}
            />
            <EditableSpan title={el.title} changeTitle={changeTaskTitle}/>
            <button onClick={onClickHandler}>x</button>
        </li>
    });

    const addTask = (title: string) => props.addTask(title, props.todoListID);
    const onAllClickHandler = () => props.changeFilter("all", props.todoListID);
    const onActiveClickHandler = () => props.changeFilter("active", props.todoListID);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.todoListID);
    const onClickRemoveTodoList = () => props.removeTodoList(props.todoListID);
    const changeTodoListTitle = (title:string) => props.changeTodoListTitle(props.todoListID,title);

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <button onClick={onClickRemoveTodoList}>X</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {taskJSXElement}
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""}
                        onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === "active" ? "active-filter" : ""}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === "completed" ? "active-filter" : ""}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    );
}

export default TodoList;
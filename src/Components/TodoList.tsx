import React, {ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "../App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {
    BottomNavigation,
    Checkbox,
    CheckboxProps,
    FormControlLabel,
    IconButton,
    makeStyles,
    withStyles
} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {ButtonFilter} from "./ButtonFilter";
import {green} from "@material-ui/core/colors";

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
        const onClickRemoveTask = () => {
            props.removeTask(el.id, props.todoListID)
        }
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            props.changeCheckboxStatus(el.id, newIsDoneValue, props.todoListID);
        }
        const changeTaskTitle = (title: string) => {
            props.changeTaskTitle(el.id, title, props.todoListID);
        }
        return <div className={"task"} key={el.id} >
            <FormControlLabel label={""} control={
                <GreenCheckbox checked={el.isDone} onChange={changeTaskStatus} />
            }/>
            <EditableSpan title={el.title} changeTitle={changeTaskTitle}/>
            <IconButton onClick={onClickRemoveTask}>
                <Delete/>
            </IconButton>
        </div>
    });

    const addTask = (title: string) => props.addTask(title, props.todoListID);
    const onAllClickHandler = () => props.changeFilter("all", props.todoListID);
    const onActiveClickHandler = () => props.changeFilter("active", props.todoListID);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.todoListID);
    const onClickRemoveTodoList = () => props.removeTodoList(props.todoListID);
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(props.todoListID, title);

    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    return (
        <div>
            <h3 className={"task_title"}>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton onClick={onClickRemoveTodoList}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {taskJSXElement}
            </div>

            <BottomNavigation
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                showLabels
                className={classes.root}>
                    <ButtonFilter title={"all"} filter={props.filter} onClickHandler={onAllClickHandler} />
                <ButtonFilter title={"active"} filter={props.filter} onClickHandler={onActiveClickHandler} />
                <ButtonFilter title={"completed"} filter={props.filter} onClickHandler={onCompletedClickHandler} />*/}
            </BottomNavigation>
        </div>
    );
}

export default TodoList;

const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

const useStyles = makeStyles({
    root: {
        width: 270,
    },
});


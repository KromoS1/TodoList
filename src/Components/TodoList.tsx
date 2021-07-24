import React, {useCallback, useEffect} from 'react';
import {FilterValuesType} from "../AppWithRedux";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {BottomNavigation, IconButton, makeStyles} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {ButtonFilter} from "./ButtonFilter";
import {Task} from "./Task";
import {APITasks, TaskType} from '../DAL/APITasks';
import {getTasks, PropertyNameType} from '../Tests/TaskReducer';
import {useDispatch} from 'react-redux';

type PropsType = {
    todoListIDP: string
    titleP: string,
    tasksP: TaskType[]
    filterP: FilterValuesType
    removeTaskP: (id: string, todoListID: string) => void
    changeFilterP: (value: FilterValuesType, todoListID: string) => void
    addTaskP: (title: string, todoListID: string) => void
    // changeCheckboxStatusP: (id: string, isDone: boolean, todoListID: string) => void
    removeTodoListP: (todoListID: string) => void
    // changeTaskTitleP: (id: string, newTitle: string, todoListID: string) => void
    changeTodoListTitleP: (todoListID: string, title: string) => void
    changeTask: (todolistId:string,idTask:string,task:PropertyNameType) => void
};

export const TodoList = React.memo((props: PropsType) => {

    const dispatch = useDispatch();
    useEffect(() => {
        const tasks = getTasks(todoListIDP);
        dispatch(tasks);
    },[])

    const {
        todoListIDP,
        titleP,
        tasksP,
        filterP,
        removeTaskP,
        changeFilterP,
        addTaskP,
        // changeCheckboxStatusP,
        removeTodoListP,
        // changeTaskTitleP,
        changeTodoListTitleP,
    } = props

    let taskJSXElement;

    if (tasksP !== undefined) {
        let taskForTodoList = tasksP;
        if (filterP === "active") {
            taskForTodoList = props.tasksP.filter(t => !t.completed)
        }
        if (filterP === "completed") {
            taskForTodoList = props.tasksP.filter(t => t.completed)
        }

        taskJSXElement = taskForTodoList.map(el =>
            <Task key={el.id}
                  taskP={el}
                  todoListIDP={todoListIDP}
                  removeTaskP={removeTaskP}
                  // changeCheckboxStatusP={changeCheckboxStatusP}
                  // changeTaskTitleP={changeTaskTitleP}
                  changeTask={props.changeTask}
            />);

    }

    const addTask = useCallback((title: string) => {
        addTaskP(title, todoListIDP);
    }, [addTaskP, todoListIDP]);

    const onAllClickHandler = useCallback(() =>
        changeFilterP("all", todoListIDP), [changeFilterP, todoListIDP]);
    const onActiveClickHandler = useCallback(() =>
        changeFilterP("active", todoListIDP), [changeFilterP, todoListIDP]);
    const onCompletedClickHandler = useCallback(() =>
        changeFilterP("completed", todoListIDP), [changeFilterP, todoListIDP]);
    const onClickRemoveTodoList = () => removeTodoListP(todoListIDP);

    const changeTodoListTitle = useCallback((title: string) =>
        changeTodoListTitleP(todoListIDP, title), [changeTodoListTitleP, todoListIDP]);

    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    return (
        <div>
            <h3 className={"task_title"}>
                <EditableSpan titleP={titleP} changeTitleP={changeTodoListTitle}/>
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
                <ButtonFilter titleP={"all"} filterP={filterP} onClickHandlerP={onAllClickHandler}/>
                <ButtonFilter titleP={"active"} filterP={filterP} onClickHandlerP={onActiveClickHandler}/>
                <ButtonFilter titleP={"completed"} filterP={filterP} onClickHandlerP={onCompletedClickHandler}/>}
            </BottomNavigation>
        </div>
    );
})

const useStyles = makeStyles({
    root: {
        width: 270,
    },
});


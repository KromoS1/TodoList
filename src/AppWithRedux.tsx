import React, {useCallback} from 'react';
import './App.css';
import {TodoList} from "./Components/TodoList";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {AddItemForm} from "./Components/AddItemForm";
import {actionsTodoList} from "./Tests/TodoListReducers";
import {actionsTasks} from "./Tests/TaskReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./redux/store";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
};
export type TaskStateType = {
    [key: string]: TaskType[]
}
export type FilterValuesType = "all" | "active" | "completed";
export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
};

export function AppWithRedux() {
    console.log("App is called");
    const todoLists = useSelector<AppRootStateType,TodoListType[]>(state=> state.todoLists);
    const tasks = useSelector<AppRootStateType,TaskStateType>(state=> state.tasks);
    const dispatch = useDispatch();

    const addTask = useCallback((title: string, todoListID: string) => {
        dispatch(actionsTasks.addTaskAC(title,todoListID));
    },[dispatch]);
    const removeTask = useCallback((id: string, todoListID: string) => {
        dispatch(actionsTasks.removeTaskAC(id,todoListID));
    },[dispatch]);
    const changeTaskStatus = useCallback((id: string, isDone: boolean, todoListID: string) => {
        dispatch(actionsTasks.changeTaskStatusAC(id,isDone,todoListID));
    },[dispatch]);
    const changeTaskTitle = useCallback((id: string, newTitle: string, todoListID: string) => {
        dispatch(actionsTasks.changeTaskTitleAC(id,newTitle,todoListID));
    },[dispatch]);

    //todolist
    const changeTaskFilter = useCallback((value: FilterValuesType, todoListID: string) => {
        dispatch(actionsTodoList.changeTodoListFilterAC(todoListID,value));
    },[dispatch]);
    const changeTodoListTitle = useCallback((todoListID: string, title: string) => {
        dispatch(actionsTodoList.changeTodoListTitleAC(todoListID,title));
    },[dispatch]);
    const addTodoList = useCallback((title: string) => {
        const action = actionsTodoList.addTodoListAC(title);
        dispatch(action);
    },[dispatch]);
    const removeTodoList = useCallback((todoListID: string) => {
        dispatch(actionsTodoList.removeTodoListAC(todoListID));
    },[dispatch]);

    const todoListsComponent = todoLists.map(tl => {
        let taskForTodoList = tasks[tl.id];
        return (
            <Grid item key={tl.id}>
                <Paper elevation={5} className={"paper_style"}>
                    <TodoList titleP={tl.title}
                              todoListIDP={tl.id}
                              tasksP={taskForTodoList}
                              filterP={tl.filter}
                              removeTaskP={removeTask}
                              changeFilterP={changeTaskFilter}
                              addTaskP={addTask}
                              changeCheckboxStatusP={changeTaskStatus}
                              removeTodoListP={removeTodoList}
                              changeTaskTitleP={changeTaskTitle}
                              changeTodoListTitleP={changeTodoListTitle}
                    />
                </Paper>
            </Grid>
        )
    })

    return (
        <div>
            <AppBar position="static">
                <Toolbar style={{justifyContent:"space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        TodoList
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={5}>
                    {todoListsComponent}
                </Grid>
            </Container>
        </div>
    );
}
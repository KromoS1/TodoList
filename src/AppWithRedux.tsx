import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TodoList} from './Components/TodoList';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {AddItemForm} from './Components/AddItemForm';
import {
    actionsTodoList,
    addTodolistTC,
    deleteTodoListTC,
    getTodolistsTC,
    updateTitleTodoListTC
} from './Tests/TodoListReducers';
import {updateTask, createTaskTC, deleteTask, PropertyNameType} from './Tests/TaskReducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './redux/store';
import {TodolistType} from './DAL/APITodoLists';
import {TaskType} from './DAL/APITasks';


export type TaskStateType = {
    [key: string]: TaskType[]
}
export type FilterValuesType = "all" | "active" | "completed";

export function AppWithRedux() {

    useEffect(() => {
        const getLists = getTodolistsTC();
        dispatch(getLists);
    },[])

    const dispatch = useDispatch();
    const todoLists = useSelector<AppRootStateType,TodolistType[]>(state=> state.todoLists);
    const tasks = useSelector<AppRootStateType,TaskStateType>(state=> state.tasks);

    const addTask = useCallback((title: string, todoListID: string) => {
        const action = createTaskTC(todoListID,title);
        dispatch(action);
    },[dispatch]);

    const removeTask = useCallback((id: string, todoListID: string) => {
        const action = deleteTask(todoListID,id);
        dispatch(action);
    },[dispatch]);

    const changeTask = useCallback((todolistId:string,idTask:string,task:PropertyNameType) => {
        const action = updateTask(todolistId,idTask,task);
        dispatch(action);
    },[dispatch])

    //todolist
    const changeTaskFilter = useCallback((value: FilterValuesType, todoListID: string) => {
        dispatch(actionsTodoList.changeTodoListFilterAC(todoListID,value));
    },[dispatch]);

    const changeTodoListTitle = useCallback((todoListID: string, title: string) => {
        const action = updateTitleTodoListTC(todoListID,title);
        dispatch(action);
    },[dispatch]);

    const addTodoList = useCallback((title: string) => {
        const action = addTodolistTC(title);
        dispatch(action);
    },[dispatch]);

    const removeTodoList = useCallback((todoListID: string) => {
        const action = deleteTodoListTC(todoListID);
        dispatch(action);
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
                              removeTodoListP={removeTodoList}
                              changeTodoListTitleP={changeTodoListTitle}
                              changeTask={changeTask}
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
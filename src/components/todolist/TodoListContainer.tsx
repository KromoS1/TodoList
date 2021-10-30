import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../redux/store';
import {FilterValuesType, TaskStateType, TodoListContainerType, TodoListDomainType} from '../../redux/types/Types';
import React, {useCallback, useEffect} from 'react';
import {Grid, Paper} from '@material-ui/core';
import {TodoList} from './TodoList';
import {Redirect} from "react-router-dom";
import {Snackbars} from "../common/SnackBars";
import {AddItemFormContainer} from "../FormComponents/AddItemFormFormik";
import {actionsTodoList} from "../../redux/actions/Actions";
import {createTask} from "../../redux/saga/taskWatcher";
import {addTodolist, deleteTodoList, getTodoLists, updateTitleTodoList} from "../../redux/saga/todoListWatcher";

const TodoListContainer: React.FC<TodoListContainerType> = props => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTodoLists());
    }, [dispatch])

    const addTask = useCallback((title: string, todoListID: string) => {
        dispatch(createTask(todoListID, title));
    }, [dispatch]);
    const changeTaskFilter = useCallback((value: FilterValuesType, todoListID: string) => {
        dispatch(actionsTodoList.changeTodoListFilter(todoListID, value));
    }, [dispatch]);
    const changeTodoListTitle = useCallback((todoListID: string, title: string) => {
        dispatch(updateTitleTodoList(todoListID, title));
    }, [dispatch]);
    const removeTodoList = useCallback((todoListID: string) => {
        dispatch(deleteTodoList(todoListID));
    }, [dispatch]);

    const todoListsJSX = props.todoLists.map(tl => {
        let taskForTodoList = props.tasks[tl.id];
        return (
            <Grid item key={tl.id}>
                <Paper elevation={10} className={'paper_style'}>
                    <TodoList todoList={tl}
                              tasks={taskForTodoList}
                              changeFilter={changeTaskFilter}
                              addTask={addTask}
                              removeTodoList={removeTodoList}
                              changeTodoListTitle={changeTodoListTitle}
                    />
                </Paper>
            </Grid>
        )
    })

    return (
        <>
            {todoListsJSX}
        </>
    )
}

export const TodoPage = () => {
    const isAuth = useSelector<AppRootStateType, boolean>(state => state.isAuth.isAuth);
    const todoLists = useSelector<AppRootStateType, TodoListDomainType[]>(state => state.todoLists);
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks);
    const dispatch = useDispatch();

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodolist(title));
    }, [dispatch]);

    if (!isAuth) {
        return <Redirect to={"/login"}/>
    }

    return (
        <>
            <Grid container style={{padding: '20px'}}>
                <AddItemFormContainer onSubmit={addTodoList} disable={false}/>
            </Grid>
            <Grid container spacing={5} style={{marginTop: '25px', justifyContent: "center"}}>
                <TodoListContainer todoLists={todoLists} tasks={tasks}/>
            </Grid>
            <Snackbars/>
        </>
    )
}

import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../redux/store';
import {FilterValuesType, TaskStateType, TodoListDomainType} from '../../redux/types/Types';
import React, {useCallback, useEffect} from 'react';
import {deleteTodoListTC, getTodoListsTC, updateTitleTodoListTC} from '../../redux/reducers/TodoListReducers';
import {createTaskTC} from '../../redux/reducers/TaskReducer';
import {actions} from '../../redux/actions/Actions';
import {Container, Grid, Paper} from '@material-ui/core';
import {TodoList} from './TodoList';
import {HeaderContainer} from "../header/Header";
import {AddItemFormContainer} from "../common/AddItemForm";
import {Redirect} from "react-router-dom";

const TodoListContainer = () => {

    const dispatch = useDispatch();
    const todoLists = useSelector<AppRootStateType, TodoListDomainType[]>(state => state.todoLists);
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks);

    useEffect(() => {
        dispatch(getTodoListsTC());
    }, [dispatch])

    const addTask = useCallback((title: string, todoListID: string) => {
        dispatch(createTaskTC(todoListID, title));
    }, [dispatch]);
    const changeTaskFilter = useCallback((value: FilterValuesType, todoListID: string) => {
        dispatch(actions.changeTodoListFilter(todoListID, value));
    }, [dispatch]);
    const changeTodoListTitle = useCallback((todoListID: string, title: string) => {
        dispatch(updateTitleTodoListTC(todoListID, title));
    }, [dispatch]);
    const removeTodoList = useCallback((todoListID: string) => {
        dispatch(deleteTodoListTC(todoListID));
    }, [dispatch]);

    const todoListsJSX = todoLists.map(tl => {
        let taskForTodoList = tasks[tl.id];
        return (
            <Grid item key={tl.id}>
                <Paper elevation={8} className={'paper_style'}>
                    <TodoList title={tl.title}
                              todoListId={tl.id}
                              tasks={taskForTodoList}
                              filter={tl.filter}
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

    return (
        <>
            {
                !isAuth
                    ? <Redirect to={"/login"}/>
                    : <>
                        <HeaderContainer/>
                        <Container fixed>
                            <Grid container style={{padding: '20px'}}>
                                <AddItemFormContainer/>
                            </Grid>
                            <Grid container spacing={5}>
                                <TodoListContainer/>
                            </Grid>
                        </Container>
                    </>
            }
        </>
    )
}
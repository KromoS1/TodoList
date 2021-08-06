import React, {useCallback, useEffect, useState} from 'react';
import {BottomNavigation, IconButton, makeStyles} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {ButtonFilter} from '../common/ButtonFilter';
import {TaskContainer} from '../task/Task';
import {getTasks} from '../../redux/reducers/TaskReducer';
import {useDispatch} from 'react-redux';
import {TodolistPropsType} from '../../redux/types/Types';
import {AddItemFormContainer} from "../FormComponents/AddItemFormFormik";
import {EditableSpanFormik} from "../FormComponents/EditableSpanFormik";

export const TodoList: React.FC<TodolistPropsType> = React.memo(props => {

    const dispatch = useDispatch();
    const classes = useStyles();
    const [value, setValue] = useState<number>(0);

    useEffect(() => {
        dispatch(getTasks(props.todoList.id));
    }, [dispatch,props.todoList.id])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todoList.id);
    }, [props]);

    const onAllClickHandler = useCallback(() => props.changeFilter('all', props.todoList.id), [props]);
    const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.todoList.id), [props]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.todoList.id), [props]);

    const onClickRemoveTodoList = () => props.removeTodoList(props.todoList.id);
    const changeTodoListTitle = useCallback((title: string) => {
        props.changeTodoListTitle(props.todoList.id, title);
    }, [props]);

    return (
        <div>
            <h3 className={'task_title'}>
                <EditableSpanFormik title={props.todoList.title}
                                    changeTitle={changeTodoListTitle}
                                    type={"title"}
                                    disable={props.todoList.disable}/>
                <IconButton onClick={onClickRemoveTodoList} disabled={props.todoList.disable}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemFormContainer onSubmit={addTask} disable={props.todoList.disable}/>
            <div >
                <TaskContainer todoListId={props.todoList.id}
                               tasks={props.tasks}
                               filter={props.todoList.filter}
                               disable={props.todoList.disable}/>
            </div>
            <BottomNavigation value={value}
                              showLabels
                              className={classes.root}
                              onChange={(event, newValue) => {setValue(newValue);}}>
                <ButtonFilter titleP={'all'} filterP={props.todoList.filter} onClickHandlerP={onAllClickHandler}/>
                <ButtonFilter titleP={'active'} filterP={props.todoList.filter} onClickHandlerP={onActiveClickHandler}/>
                <ButtonFilter titleP={'completed'} filterP={props.todoList.filter} onClickHandlerP={onCompletedClickHandler}/>}
            </BottomNavigation>
        </div>
    );
})

const useStyles = makeStyles({
    root: {
        width: 270,
    },
});


import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from '../common/AddItemForm';
import {EditableSpan} from '../common/EditableSpan';
import {BottomNavigation, IconButton, makeStyles} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {ButtonFilter} from '../common/ButtonFilter';
import {TaskContainer} from '../task/Task';
import {getTasks} from '../../redux/reducers/TaskReducer';
import {useDispatch} from 'react-redux';
import {TodolistPropsType} from '../../redux/types/Types';


export const TodoList: React.FC<TodolistPropsType> = React.memo(props => {

    const dispatch = useDispatch();
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    useEffect(() => {
        dispatch(getTasks(props.todoListId));
    }, [dispatch, props.todoListId])


    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todoListId);
    }, [props]);

    const onAllClickHandler = useCallback(() => props.changeFilter('all', props.todoListId), [props]);
    const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.todoListId), [props]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.todoListId), [props]);

    const onClickRemoveTodoList = () => props.removeTodoList(props.todoListId);
    const changeTodoListTitle = useCallback((title: string) => props.changeTodoListTitle(props.todoListId, title), [props]);

    return (
        <div>
            <h3 className={'task_title'}>
                <EditableSpan type={'title'} title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton onClick={onClickRemoveTodoList}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                <TaskContainer todoListId={props.todoListId} tasks={props.tasks} filter={props.filter}/>
            </div>
            <BottomNavigation value={value}
                              showLabels
                              className={classes.root}
                              onChange={(event, newValue) => {setValue(newValue);}}>
                <ButtonFilter titleP={'all'} filterP={props.filter} onClickHandlerP={onAllClickHandler}/>
                <ButtonFilter titleP={'active'} filterP={props.filter} onClickHandlerP={onActiveClickHandler}/>
                <ButtonFilter titleP={'completed'} filterP={props.filter} onClickHandlerP={onCompletedClickHandler}/>}
            </BottomNavigation>
        </div>
    );
})

const useStyles = makeStyles({
    root: {
        width: 270,
    },
});


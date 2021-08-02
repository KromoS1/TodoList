import React, {ChangeEvent, useCallback, useState} from 'react';
import {Checkbox, CheckboxProps, FormControlLabel, IconButton, withStyles} from '@material-ui/core';
import {EditableSpan} from '../common/EditableSpan';
import {Delete} from '@material-ui/icons';
import {green} from '@material-ui/core/colors';
import {PageForChangeTask} from './PageForChangeTask';
import {
    TaskContainerPropsType,
    TaskStatuses,
    TaskTypeProps,
    UpdateModelPropertyTaskType
} from '../../redux/types/Types';
import {deleteTask, updateTask} from '../../redux/reducers/TaskReducer';
import {useDispatch} from 'react-redux';

export const Task: React.FC<TaskTypeProps> = React.memo(props => {

    const [showDetails, setShowDetails] = useState<boolean>(false);

    const onClickRemoveTask = () => {
        props.removeTask(props.task.id, props.todoListId)
    }
    const showDetailsTask = () => {
        setShowDetails(!showDetails);
    }

    const onChangeTask = useCallback((model: UpdateModelPropertyTaskType) => {
        props.changeTask(props.todoListId, props.task.id, model);
    }, [props])
    const changeTaskTitle = useCallback((title: string) => {
        onChangeTask({title});
    }, [onChangeTask])
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        e.currentTarget.checked
            ? onChangeTask({status: TaskStatuses.InProgress})
            : onChangeTask({status: TaskStatuses.New})
    }

    const taskJSX = (
        <>
            <div className={'task'} key={props.task.id}>
                <FormControlLabel label={''} control={
                    <GreenCheckbox checked={props.task.status === TaskStatuses.InProgress}
                                   onChange={changeTaskStatus}/>
                }/>
                <EditableSpan type={'title'} title={props.task.title} changeTitle={changeTaskTitle} click={showDetailsTask}/>
                <IconButton onClick={onClickRemoveTask}>
                    <Delete/>
                </IconButton>
            </div>
        </>
    )

    return (
        showDetails
            ? <>
                <PageForChangeTask task={props.task} changeTask={onChangeTask} showDetails={showDetailsTask}/>
                {taskJSX}
            </>
            : <>
                {taskJSX}
            </>
    )
})

export const TaskContainer: React.FC<TaskContainerPropsType> = props => {
    let taskJSX;
    const dispatch = useDispatch();

    const changeTask = useCallback((todolistId: string, idTask: string, model: UpdateModelPropertyTaskType) => {
        dispatch(updateTask(todolistId, idTask, model));
    }, [dispatch]);
    const removeTask = useCallback((id: string, todoListID: string) => {
        dispatch(deleteTask(todoListID, id));
    }, [dispatch]);

    if (props.tasks !== undefined) {
        let taskForTodoList = props.tasks;
        if (props.filter === 'active') {
            taskForTodoList = props.tasks.filter(t => t.status === TaskStatuses.New)
        }
        if (props.filter === 'completed') {
            taskForTodoList = props.tasks.filter(t => t.status === TaskStatuses.InProgress)
        }
        taskJSX = taskForTodoList.map(el =>
            <Task key={el.id}
                  task={el}
                  todoListId={props.todoListId}
                  removeTask={removeTask}
                  changeTask={changeTask}
            />);
    }

    return (
        <>
            {taskJSX}
        </>
    )

}

const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);
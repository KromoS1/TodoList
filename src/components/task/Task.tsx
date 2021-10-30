import React, {ChangeEvent, useCallback, useState} from 'react';
import {Checkbox, CheckboxProps, IconButton, withStyles} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {green} from '@material-ui/core/colors';
import {PageUpdateTask} from './PageUpdateTask';
import {
    TaskContainerPropsType, TaskStateType,
    TaskStatuses,
    TaskTypeProps,
    UpdateModelPropertyTaskType
} from '../../redux/types/Types';
import {useDispatch, useSelector} from 'react-redux';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {EditableSpanFormik} from "../FormComponents/EditableSpanFormik";
import {deleteTask, updateTask} from "../../redux/saga/taskWatcher";
import {AppRootStateType} from "../../redux/store";

export const Task: React.FC<TaskTypeProps> = React.memo(props => {
    const [showDetails, setShowDetails] = useState<boolean>(false);

    const onClickRemoveTask = useCallback(() => {
        props.removeTask(props.task.id, props.todoListId)
    }, [props]);
    const showDetailsTask = useCallback(() => {
        setShowDetails(!showDetails);
    }, [showDetails]);

    const onChangeTask = useCallback((model: UpdateModelPropertyTaskType) => {
        props.changeTask(props.todoListId, props.task.id, model);
    }, [props]);
    const changeTaskTitle = useCallback((title: string) => {
        onChangeTask({title});
    }, [onChangeTask]);
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        e.currentTarget.checked
            ? onChangeTask({status: TaskStatuses.InProgress})
            : onChangeTask({status: TaskStatuses.New})
    }

    const taskJSX = (
        <>
            <div className={'task'} key={props.task.id}>
                <GreenCheckbox checked={props.task.status === TaskStatuses.InProgress}
                               onChange={changeTaskStatus} disabled={props.disable}/>
                <EditableSpanFormik type={'title'}
                                    title={props.task.title}
                                    changeTitle={changeTaskTitle}
                                    disable={props.disable}/>
                <IconButton onClick={showDetailsTask} disabled={props.disable}>
                    <ExpandMoreIcon/>
                </IconButton>
                <IconButton onClick={onClickRemoveTask} disabled={props.disable}>
                    <Delete/>
                </IconButton>
            </div>
        </>
    )

    return (
        showDetails
            ? <>
                <PageUpdateTask task={props.task} changeTask={onChangeTask} showDetails={showDetailsTask}/>
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
    const tasksAll = useSelector<AppRootStateType,TaskStateType>(state => state.tasks);

    const changeTask = useCallback((todolistId: string, idTask: string, model: UpdateModelPropertyTaskType) => {
        dispatch(updateTask(todolistId, idTask, model,tasksAll));
    }, [dispatch,tasksAll]);
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
                  disable={props.disable}
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

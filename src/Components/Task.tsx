import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, CheckboxProps, FormControlLabel, IconButton, withStyles} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {green} from "@material-ui/core/colors";
import {TaskType} from '../DAL/APITasks';
import {PropertyNameType} from '../Tests/TaskReducer';

type TaskTypeProps = {
    taskP: TaskType
    todoListIDP:string
    removeTaskP: (idTask: string, todoListID: string) => void
    changeTask: (todolistId:string,idTask:string,task:PropertyNameType) => void
}

export const Task = React.memo((props:TaskTypeProps) => {
    const {taskP,
        todoListIDP,
        removeTaskP,
    } = props;

    let isDone:boolean;
    let taskCopy = {...taskP};
    taskCopy.status === 1 ? isDone = true : isDone = false;

    const onClickRemoveTask = () => {
        removeTaskP(taskP.id, todoListIDP)
    }
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        e.currentTarget.checked ? taskCopy.status = 1 : taskCopy.status = 0
        onChangeTask({...taskCopy})
    }
    const changeTaskTitle = useCallback((title: string) => {
        taskCopy.title = title;
        onChangeTask({...taskCopy});
    },[taskP.id,todoListIDP])

     const onChangeTask = useCallback((task:PropertyNameType) => {
         props.changeTask(todoListIDP,taskP.id,{...task});
     },[])

    return <div className={"task"} key={taskP.id} >
        <FormControlLabel label={""} control={
            <GreenCheckbox checked={isDone} onChange={changeTaskStatus} />
        }/>
        <EditableSpan titleP={taskP.title} changeTitleP={changeTaskTitle}/>
        <IconButton onClick={onClickRemoveTask}>
            <Delete/>
        </IconButton>
    </div>
})

const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);
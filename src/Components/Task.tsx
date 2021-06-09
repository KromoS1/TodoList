import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, CheckboxProps, FormControlLabel, IconButton, withStyles} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {green} from "@material-ui/core/colors";
import {TaskType} from "../AppWithRedux";

type TaskTypeProps = {
    taskP: TaskType
    todoListIDP:string
    removeTaskP: (idTask: string, todoListID: string) => void
    changeCheckboxStatusP: (id: string, isDone: boolean, todoListID: string) => void
    changeTaskTitleP: (id: string, newTitle: string, todoListID: string) => void
}

export const Task = React.memo((props:TaskTypeProps) => {
    const {taskP,
        todoListIDP,
        removeTaskP,
        changeCheckboxStatusP,
        changeTaskTitleP,} = props;

    const onClickRemoveTask = () => {
        removeTaskP(taskP.id, todoListIDP)
    }
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        changeCheckboxStatusP(taskP.id, newIsDoneValue, todoListIDP);
    }
    const changeTaskTitle = useCallback((title: string) => {
        changeTaskTitleP(taskP.id, title, todoListIDP);
    },[changeTaskTitleP,taskP.id,todoListIDP])
    return <div className={"task"} key={taskP.id} >
        <FormControlLabel label={""} control={
            <GreenCheckbox checked={taskP.isDone} onChange={changeTaskStatus} />
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
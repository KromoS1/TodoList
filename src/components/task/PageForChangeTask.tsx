import React, {ChangeEvent, useEffect, useState} from 'react';
import {Box, Button, IconButton, makeStyles, Paper, TextField} from '@material-ui/core';
import {getTasks} from '../../redux/reducers/TaskReducer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {DatesTask} from '../common/DatesTask';
import SaveIcon from '@material-ui/icons/Save';
import {EditableSpan} from '../common/EditableSpan';
import {useDispatch} from 'react-redux';
import {TaskPriorities, TaskType, UpdateModelPropertyTaskType} from '../../redux/types/Types';

type PropsType = {
    task: TaskType
    changeTask: (property: UpdateModelPropertyTaskType) => void
    showDetails: () => void
}

export const PageForChangeTask: React.FC<PropsType> = props => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTasks(props.task.todoListId));
    }, [dispatch, props.task.todoListId])

    const [textDesc, setTextDesc] = useState<string>(props.task.description);
    const [task, setTask] = useState<TaskType>({...props.task});
    const date: string[] = [];
    const classes = useStyles();

    const onChangeText = (e: ChangeEvent<HTMLInputElement>) => setTextDesc(e.currentTarget.value);

    const saveDate = (dateComp: string) => {
        date.push(dateComp)
    }

    const savePriority = (newPriority: string) => {
        const priority: TaskPriorities = Number(newPriority);
        setTask({...task, priority});
    }

    const saveTask = () => {
        const property: UpdateModelPropertyTaskType = {
            priority: task.priority,
            description: textDesc,
            addedDate: date[0],
            startDate: date[1],
            deadline: date[2],
        }
        props.changeTask(property);
        props.showDetails();
    }

    return (
        <Box className={classes.root} zIndex={'tooltip'}>
            <Paper elevation={20} className={classes.box}>
                <form>
                    <div className={classes.header}>
                        <div>
                            <IconButton onClick={() => props.showDetails()}>
                                <ChevronLeftIcon/>
                            </IconButton>
                        </div>
                        <div className={classes.font}>
                            <span>{task.title}</span>
                        </div>
                        <div className={classes.font}>
                            <EditableSpan title={task.priority + ''} changeTitle={savePriority} type={'priority'}/>
                        </div>
                    </div>
                    <div className={classes.content}>
                        <div className={classes.dates}>
                            <DatesTask date={task.addedDate} nameDate={'Added Start'} saveDate={saveDate}/>
                            <DatesTask date={task.startDate} nameDate={'Start Date'} saveDate={saveDate}/>
                            <DatesTask date={task.deadline} nameDate={'Dead line'} saveDate={saveDate}/>
                        </div>
                        <div className={classes.description}>
                            <TextField variant={'outlined'}
                                       value={textDesc}
                                       label={'Description'}
                                       onChange={onChangeText}
                                       multiline
                                       rows={8}
                                       fullWidth
                            />
                        </div>
                    </div>
                    <div>
                        <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            className={classes.button}
                            onClick={saveTask}
                            startIcon={<SaveIcon/>}
                        >
                            Save
                        </Button>
                    </div>
                </form>
            </Paper>
        </Box>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
            width: '47vw',
            height: '42vh',
        },
        top: '200px',
        left: '400px',
        position: 'absolute',
        backgroundColor: '#3f51b5',
        borderRadius: '15px',
    },
    box: {
        backgroundColor: '#ffffff'
    },
    font: {
        fontSize: '24px',
        fontWeight: 'bold',
        marginRight: '35px'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '10px 20px 10px 10px'
    },
    content: {
        display: 'flex',
        justifyContent: 'space-around'
    },
    dates: {},
    description: {
        width: '350px'
    },
    button: {
        margin: theme.spacing(2.5),
    },
}));



import React, {ChangeEvent, useState} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

type PropsType = {
    nameDate:string
    date: string
    saveDate:(date:string) => void
}

export const DatesTask = (props:PropsType) => {
    const {date,nameDate} = props
    const [dateValue,setDateValue] = useState<string>(date);

    const changeDate = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setDateValue(e.currentTarget.value);
        props.saveDate(dateValue);
    }

    const classes = useStyles();

    return (
        <form className={classes.container} noValidate>
            <TextField
                id="datetime-local"
                label={nameDate}
                type="datetime-local"
                defaultValue={dateValue}
                onChange={changeDate}
                className={classes.textFieldTitle}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </form>
    )
}


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
            margin:'10px 0 0 0'
        },
        textFieldTitle: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 210,
        },
    }),
);
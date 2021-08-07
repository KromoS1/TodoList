import React, {useCallback, useState} from 'react';
import {makeStyles, MenuItem, TextField, Tooltip} from "@material-ui/core";
import {FormikProps, useFormik, withFormik} from "formik";
import * as Yup from "yup";
import {createStyles, Theme} from "@material-ui/core/styles";

interface ValuesType {
    title: string
    onSubmit: (newTitle: string) => void
    type: 'title' | 'priority'
    disable?: boolean
}
interface FormProps {
    title: string
    changeTitle: (newTitle: string) => void
    type: 'title' | 'priority'
    disable?: boolean
}

const priorities = [
    {
        value: '1',
        label: '1',
    },
    {
        value: '2',
        label: '2',
    },
    {
        value: '3',
        label: '3',
    },
    {
        value: '4',
        label: '4',
    },
];

const Form: React.FC<FormProps & FormikProps<ValuesType>> = React.memo(props => {

    const [priority, setPriority] = useState('4');

    const classes = useStyles();
    const schema = Yup.object().shape({
        title: Yup.string().max(100, "Too long").trim()
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPriority(event.target.value);
    };

    const formik = useFormik({
        initialValues: {
            title: props.title,
            type: props.type,
            disable: props.disable
        },
        validationSchema: schema,
        onSubmit: (values, {resetForm}) => {
            props.changeTitle(values.title);
            resetForm({})
        }
    })

    if (props.type === "priority") {
        return (
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    id="standard-select-currency"
                    select
                    label="Select"
                    value={priority}
                    onChange={handleChange}
                    helperText="Please select your priority"
                    disabled={formik.values.disable} autoFocus
                >
                    {priorities.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>

                <div style={({position: "fixed"})}>{formik.errors.title ? <div>{formik.errors.title}</div> : null}</div>
            </form>
        )
    } else {
        return (
            <form onSubmit={formik.handleSubmit}>
                <TextField {...formik.getFieldProps("title")}
                           className={classes.textFieldTitle}
                           disabled={formik.values.disable} autoFocus/>
                <div style={({position: "fixed"})}>{formik.errors.title ? <div>{formik.errors.title}</div> : null}</div>
            </form>
        )
    }
})


const EditableSpanForm = withFormik<FormProps, ValuesType>({
    mapPropsToValues: props => {
        return {
            title: props.title,
            disable: props.disable,
            onSubmit: props.changeTitle,
            type: props.type,
        };
    },
    handleSubmit: (values, form) => {
        form.props.changeTitle(values.title);
    },
})(Form);


export const EditableSpanFormik: React.FC<FormProps> = props => {
    const [editMode, setEditMode] = useState<boolean>(false);

    const saveTitle = useCallback((title: string) => {
        props.changeTitle(title);
        setEditMode(false);
    }, [props])


    const titleForSpan = (): string => {
        if (props.title.length > 23) {
            return props.title.substr(0, 23) + "...";
        } else {
            return props.title;
        }
    }

    return (
        <>
            {
                editMode
                    ? <EditableSpanForm type={'title'} title={props.title}
                                        changeTitle={saveTitle}
                                        disable={props.disable}/>
                    : <Tooltip title={props.title} placement={"top"}>
                    <span onClick={() => {
                        setEditMode(true)
                    }}>{titleForSpan()}</span>
                    </Tooltip>
            }</>
    )
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        textFieldTitle: {
            maxWidth: '130px',
        },
        textFieldPriority: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: '25ch',
            }
        },
    })
)
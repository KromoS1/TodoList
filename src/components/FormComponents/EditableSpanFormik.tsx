import React, {useState} from 'react';
import {makeStyles, TextField} from "@material-ui/core";
import {FormikProps, useFormik, withFormik} from "formik";
import * as Yup from "yup";
import {createStyles} from "@material-ui/core/styles";

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


const Form: React.FC<FormProps & FormikProps<ValuesType>> = React.memo(props => {

    const classes = useStyles();
    const schema = Yup.object().shape({
        title: Yup.string().min(2, "Too short!").max(100, "Too long").trim()
    })

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
                <TextField {...formik.getFieldProps("title")}
                           type={"number"}
                           variant={'standard'}
                           disabled={formik.values.disable} autoFocus/>
                <div style={({position: "fixed"})}>{formik.errors.title ? <div>{formik.errors.title}</div> : null}</div>
            </form>
        )
    } else {
        return (
            <form onSubmit={formik.handleSubmit}>
                <TextField {...formik.getFieldProps("title")}
                           variant={'standard'}
                           className={classes.textField}
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

    const saveTitle = (title: string) => {
        props.changeTitle(title);
        setEditMode(false);
    }

    return (
        <>
            {
                editMode
                    ? <EditableSpanForm type={'title'} title={props.title}
                                        changeTitle={saveTitle}
                                        disable={props.disable}/>
                    : <span onClick={() => {
                        setEditMode(true)
                    }}>{props.title}</span>
            }</>
    )
}

const useStyles = makeStyles(() =>
    createStyles({
        textField: {
            maxWidth: '130px',
        },
    })
)
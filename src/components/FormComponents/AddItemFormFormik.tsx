import React from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";
import {FormikProps, useFormik, withFormik} from "formik";
import * as Yup from "yup";

interface ValuesType {
    title: string
}

interface FormProps {
    disable: boolean
    onSubmit: (title: string) => void
}

const Form: React.FC<FormProps & FormikProps<ValuesType>> = React.memo(props => {

    const formik = useFormik({
        initialValues: {
            title: ""
        },
        validationSchema: Yup.object().shape({
            title: Yup.string().min(2, "Too short!").max(100, "Too long").trim()
        }),
        onSubmit: (values, {resetForm}) => {
            props.onSubmit(values.title);
            resetForm({})
        }
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <TextField {...formik.getFieldProps("title")}
                       variant={"outlined"} disabled={props.disable} size={'small'} label={"Title"}/>
            <IconButton color={"primary"} disabled={props.disable} type={"submit"}>
                <AddBox/>
            </IconButton>
            <div style={({position:"fixed"})}>{formik.errors.title ? <div>{formik.errors.title}</div> : null}</div>
        </form>
    )
})


export const AddItemFormContainer = withFormik<FormProps, ValuesType>({
    mapPropsToValues: props => {
        return {
            title: "",
            disable: props.disable,
            onSubmit: props.onSubmit
        };
    },
    handleSubmit: (values, form) => {
        form.props.onSubmit(values.title);
    },
})(Form);




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
            title: Yup.string().trim("spaces are not allowed at the beginning of the task name.").max(100, "Too long")
        }),
        onSubmit: (values, {resetForm}) => {
            props.onSubmit(values.title);
            resetForm({})
        }
    })

    return (
        <form onSubmit={formik.handleSubmit} style={({position:"absolute"})}>
            <TextField {...formik.getFieldProps("title")}
                       variant={"outlined"} disabled={props.disable}
                       size={'small'}
                       label={formik.errors.title ? "Error" : "Title"}
                        error={formik.errors.title !== undefined}
                       helperText={formik.errors.title ? formik.errors.title : null}
            />
            <IconButton color={"primary"} disabled={props.disable} type={"submit"}>
                <AddBox/>
            </IconButton>
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




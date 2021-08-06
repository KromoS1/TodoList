import React from "react";
import {Button, Checkbox, FormControlLabel, makeStyles, Paper, TextField} from "@material-ui/core";
import {createStyles} from "@material-ui/core/styles";
import {FormikProps, useFormik, withFormik} from "formik";
import {FormDataLoginType} from "../../redux/types/Types";
import * as Yup from 'yup';

interface ValuesType {
    email: string
    password: string
    rememberMe: boolean
}
interface FormFormikProps {
    onSubmit: (formData: FormDataLoginType) => void
}
interface MyFormProps {
    initialEmail?: string;
    initialPassword?: string;
    initialRememberMe?: boolean;
    initialCaptcha?: boolean
    onSubmit: (formData: FormDataLoginType) => void
}

const Form: React.FC<FormFormikProps & FormikProps<ValuesType>> = React.memo(props => {
    const classes = useStyles();
    const {touched, errors} = props;

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email('Invalid email').required('Required'),
            password: Yup.string().min(8,'Must be 8 characters or more').required('Required'),
        }),
        onSubmit: values => {
            props.onSubmit(values)
        }
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <Paper elevation={8} className={classes.paper}>
                <h1>Login</h1>
                <TextField label={"Email"}
                           {...formik.getFieldProps("email")}/>
                {touched.email && errors.email && <div>{errors.email}</div>}
                <TextField label={"Password"}
                           type={"password"}
                           {...formik.getFieldProps("password")}/>
                {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                <FormControlLabel control={<Checkbox color={"primary"}
                                                     checked={formik.values.rememberMe}
                                                     {...formik.getFieldProps("rememberMe")}/>}
                                  label={"Remember me"}/>
                <Button type="submit" variant={"outlined"} color={"primary"}>
                    Submit
                </Button>
            </Paper>
        </form>
    )
})

export const FormLoginContainer = withFormik<MyFormProps, ValuesType>({
    mapPropsToValues: props => {
        return {
            email: props.initialEmail || '',
            password: props.initialPassword || '',
            rememberMe: props.initialRememberMe || false,
            onSubmit: props.onSubmit
        };
    },
    handleSubmit: (values,form) => {
        form.props.onSubmit(values);
    },
})(Form);

const useStyles = makeStyles(() =>
    createStyles({
        paper: {
            minWidth: '300px',
            minHeight: '350px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around',
        },
    })
)
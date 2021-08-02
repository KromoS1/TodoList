import {useDispatch, useSelector} from "react-redux";
import {authMe, login} from "../../redux/reducers/IsAuthReducer";
import {Redirect} from "react-router-dom";
import {AppRootStateType} from "../../redux/store";
import {HeaderContainer} from "../header/Header";
import {Button, Container, Grid, makeStyles, Paper} from "@material-ui/core";
import {createStyles} from "@material-ui/core/styles";
import {RenderTextField} from "../common/componentsUIForForm/RenderTextField";
import React from 'react'
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import {asyncValidate, validate} from "../common/componentsUIForForm/asyncValidate";
import {RenderCheckbox} from "../common/componentsUIForForm/RenderCheckbox";
import {FormDataType} from "../../redux/types/Types";

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = props => {
    const {handleSubmit, pristine, submitting} = props
    const classes = useStyles();

    return (
        <form onSubmit={handleSubmit}>
          <Paper elevation={8} className={classes.paper}>
              <h1>Login</h1>
              <div>
                  <Field name="email" component={RenderTextField} label="Email"/>
              </div>
              <div>
                  <Field name="password" component={RenderTextField} label="Password"/>
              </div>
              <div>
                  <Field name="rememberMe" component={RenderCheckbox} label="Remember me"/>
              </div>
              <Button type="submit" disabled={pristine || submitting} variant={"outlined"} color={"primary"}>
                  Submit
              </Button>
          </Paper>
        </form>
    )
}

const LoginFormRedux = reduxForm<FormDataType>({form: "login", validate, asyncValidate})(LoginForm);

export const LoginPage = () => {

    const dispatch = useDispatch();
    const isAuth = useSelector<AppRootStateType, boolean>(state => state.isAuth.isAuth);
    const classes = useStyles();

    const signIn = (formData: FormDataType) => {
        if (formData.rememberMe === undefined) formData.rememberMe = false;
        if (formData.captcha === undefined) formData.captcha = false;
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha));
        dispatch(authMe());
    }

    return (
        <>
            {
                isAuth
                    ? <Redirect to={'/todolists'}/>
                    : <>
                        <HeaderContainer/>
                        <Container fixed>
                            <Grid container spacing={5} className={classes.login}>
                                <LoginFormRedux onSubmit={signIn}/>
                            </Grid>
                        </Container>

                    </>
            }
        </>
    )

}

const useStyles = makeStyles(() =>
    createStyles({
        login: {
            display: 'flex',
            flexDirection: "column",
            alignContent: 'center',
            marginTop: '50px',
        },
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

import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {AppRootStateType} from "../../redux/store";
import {Grid, makeStyles} from "@material-ui/core";
import {createStyles} from "@material-ui/core/styles";
import React, {useCallback} from 'react'
import {FormDataLoginType} from "../../redux/types/Types";
import {FormLoginContainer} from "../FormComponents/LoginFormFormik";
import {login} from "../../redux/saga/isAuthWatcher";

export const LoginPage = React.memo(() => {

        const dispatch = useDispatch();
        const isAuth = useSelector<AppRootStateType, boolean>(state => state.isAuth.isAuth);
        const classes = useStyles();

        const signIn = useCallback((formData: FormDataLoginType) => {
            if (formData.rememberMe === undefined) formData.rememberMe = false;
            if (formData.captcha === undefined) formData.captcha = false;
            dispatch(login({email:formData.email,
                password:formData.password,
                rememberMe:formData.rememberMe,
                captcha:formData.captcha}));
        }, [dispatch])

        if (isAuth) {
            return <Redirect to={'/todolists'}/>
        }

        return (
            <>
                <Grid container spacing={5} className={classes.login}>
                    <FormLoginContainer onSubmit={signIn}/>
                </Grid>
            </>
        )
    }
)

const useStyles = makeStyles(() =>
    createStyles({
        login: {
            display: 'flex',
            flexDirection: "column",
            alignContent: 'center',
            marginTop: '50px',
        },
    })
)

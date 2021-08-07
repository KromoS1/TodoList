import React, {useEffect} from 'react';
import './App.css';
import {TodoPage} from '../components/todolist/TodoListContainer';
import {Route, Switch} from "react-router-dom";
import {LoginPage} from "../components/Login/Login";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../redux/store";
import {HeaderContainer} from "../components/header/Header";
import {CircularProgress, Container, LinearProgress, makeStyles} from "@material-ui/core";
import {Snackbars} from "../components/common/SnackBars";
import {createStyles} from "@material-ui/core/styles";
import {initializeApp, StatusType} from "../redux/reducers/StatusAppReducer";

export function App() {
    const statusApp = useSelector<AppRootStateType, StatusType>(state => state.statusApp.status);
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.statusApp.isInitialized);
    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect(()=>{
        dispatch(initializeApp());
    },[dispatch])

    if (!isInitialized){
        return <div className={classes.progress}>
            <CircularProgress />
        </div>
    }

    return (
        <Switch>
            <>
                <HeaderContainer/>
                {statusApp === "load" && <LinearProgress className={classes.load}/>}
                <Container fixed className={classes.content}>
                    <Route path={"/todolists"} component={TodoPage}/>
                    <Route path={"/login"} component={LoginPage}/>
                </Container>
                <Snackbars/>
            </>
        </Switch>
    )
}

const useStyles = makeStyles(() =>
    createStyles({
        load: {
            position: "absolute",
            width: '100%',
        },
        progress:{
            position: "absolute",
            width: "100%",
            height:"100%",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
        },
        page:{
            width: "100%",
            height: "100%",
        },
        content:{
            maxWidth: "90%",
        }
    }),
);

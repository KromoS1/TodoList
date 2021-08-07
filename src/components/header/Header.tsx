import {AppBar, Button, IconButton, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {StatusType} from "../../redux/reducers/StatusAppReducer";
import {logOut} from "../../redux/reducers/IsAuthReducer";

type HeaderType = {
    status: StatusType
    isAuth: boolean
    userLogin: string
    logout: () => void
}

const Header: React.FC<HeaderType> = props => {
    return (
        <AppBar position="static">
            <Toolbar style={{justifyContent: "space-between"}}>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <Menu/>
                </IconButton>
                <Typography variant="h6">
                    TodoList
                </Typography>
                {
                    props.isAuth
                        ? <>
                            <Button onClick={props.logout} color={"inherit"}>Log out</Button>
                        </>
                        : <Button color="inherit">Login</Button>
                }
            </Toolbar>
        </AppBar>
    )
}

export const HeaderContainer = () => {
    const status = useSelector<AppRootStateType, StatusType>(state => state.statusApp.status);
    const isAuth = useSelector<AppRootStateType, boolean>(state => state.isAuth.isAuth);
    const userLogin = useSelector<AppRootStateType, string>(state => state.isAuth.login);
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(logOut());
    }

    return <Header status={status} isAuth={isAuth} userLogin={userLogin} logout={logout}/>
}
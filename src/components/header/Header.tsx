import {AppBar, Button, IconButton, LinearProgress, makeStyles, MenuItem, Toolbar, Typography} from '@material-ui/core';
import MenuHeader from '@material-ui/core/Menu';
import {Menu} from '@material-ui/icons';
import React from 'react';
import {createStyles, Theme} from '@material-ui/core/styles';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {logOut} from "../../redux/reducers/IsAuthReducer";

type PropsType = {
    isLoad: boolean
    isAuth: boolean
    userLogin: string
    logOut: () => void
}

const Header: React.FC<PropsType> = props => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        props.logOut();
    };


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
                            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                                {props.userLogin}
                            </Button>
                            <MenuHeader id="simple-menu"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Log out</MenuItem>
                            </MenuHeader>
                        </>
                        : <Button color="inherit">Login</Button>
                }
            </Toolbar>
            <div className={classes.load}>
                {
                    props.isLoad && <LinearProgress/>
                }
            </div>
        </AppBar>
    )
}

export const HeaderContainer = () => {
    const isLoad = useSelector<AppRootStateType, boolean>(state => state.isLoad);
    const isAuth = useSelector<AppRootStateType, boolean>(state => state.isAuth.isAuth);
    const userLogin = useSelector<AppRootStateType, string>(state => state.isAuth.login);
    const dispatch = useDispatch();

    const logOutFromAcc = () => {
        dispatch(logOut());
    }

    return <Header isLoad={isLoad} isAuth={isAuth} userLogin={userLogin} logOut={logOutFromAcc}/>
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        load: {
            width: '100%',
            '& > * + *': {
                marginTop: theme.spacing(2),
            },
        },
    }),
);
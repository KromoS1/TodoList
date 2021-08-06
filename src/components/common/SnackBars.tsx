import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import {StatusAppType} from "../../redux/reducers/StatusAppReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import MuiAlert, {AlertProps} from "@material-ui/lab/Alert";
import {actions} from "../../redux/actions/Actions";

const Alert = (props: AlertProps) => <MuiAlert elevation={6} variant="filled" {...props} />;

export const Snackbars = () => {

    const statusApp = useSelector<AppRootStateType, StatusAppType>(state => state.statusApp);
    const dispatch = useDispatch();


    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(actions.setStatusApp("idle"));
        dispatch(actions.setMessageStatus(""));
    };

    return (
        <>
            <Snackbar open={statusApp.status === "succeeded"} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    {statusApp.message}
                </Alert>
            </Snackbar>
            <Snackbar open={statusApp.status === "failed"} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {statusApp.message}
                </Alert>
            </Snackbar>
        </>
    );
};

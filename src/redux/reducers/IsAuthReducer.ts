import {ActionsType, MeProfileType} from '../types/Types';
import {AppThunkType} from "../store";
import {APIAuthMe} from "../../DAL/APIAuthMe";
import {stopSubmit} from "redux-form";
import {actionsIsAuth, actionsStatusApp} from "../actions/Actions";

const initialState: MeProfileType = {
    id: 0,
    login: "",
    email: "",
    password: "",
    rememberMe: false,
    captcha: false,
    isAuth: false,
}
const actions = {
    ...actionsIsAuth,
    ...actionsStatusApp,
}

export const IsAuthReducer = (state: MeProfileType = initialState, action: ActionsType<typeof actions>): MeProfileType => {
    switch (action.type) {
        case "SET-ME-DATA":
            return {...state, ...action.data,isAuth:action.isAuth};
        case "LOG-OUT":
            return {id:0,login:"",email:"",password:"",rememberMe:false,captcha:false,isAuth:false};
        default:
            return state
    }
}

export const authMe = (): AppThunkType => async dispatch => {
    dispatch(actions.setStatusApp("load"));
    try {
        const result = await APIAuthMe.me();
        dispatch(actions.setMeData(result.data,true));
        dispatch(actions.setStatusApp("idle"));
    } catch (e) {
        dispatch(actions.setStatusApp("failed"));
        dispatch(actions.setMessageStatus(e.message));
        throw new Error(e.message);
    }
}

export const login = (email: string, password: string, rememberMe?: boolean, captcha?: boolean): AppThunkType => async dispatch => {
    dispatch(actions.setStatusApp("load"));
    try {
        const result = await APIAuthMe.login(email, password, rememberMe, captcha);
        if (result.resultCode === 0)
        {
            dispatch(authMe());
            dispatch(actions.setStatusApp("idle"));
        }else{
            dispatch(stopSubmit("login",{_error:result.messages[0]}));
        }
    } catch (e) {
        dispatch(actions.setStatusApp("failed"));
        dispatch(actions.setMessageStatus(e.message));
        throw new Error(e.message);
    }
}

export const logOut = (): AppThunkType => async dispatch => {
    dispatch(actions.setStatusApp("load"));
    try {
        const result = await APIAuthMe.logOut();
        result.resultCode === 0 &&
        dispatch(actions.logOut());
        dispatch(actions.setStatusApp("idle"));
    } catch (e) {
        dispatch(actions.setStatusApp("failed"));
        dispatch(actions.setMessageStatus(e.message));
        throw new Error(e.message);
    }
}
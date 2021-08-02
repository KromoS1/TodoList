import {ActionsType, MeProfileType} from '../types/Types';
import {actions} from '../actions/Actions';
import {AppThunkType} from "../store";
import {APIAuthMe} from "../../DAL/APIAuthMe";


const initialState: MeProfileType = {
    id: 0,
    login: "",
    email: "",
    password: "",
    rememberMe: false,
    captcha: false,
    isAuth: false,
}


export const IsAuthReducer = (state: MeProfileType = initialState, action: ActionsType<typeof actions>): MeProfileType => {
    switch (action.type) {
        case "SET-ME-DATA":
            return {...state, ...action.data};
        case "SET-IS-AUTH":
            return {...state, isAuth: action.isAuth};
        case "SET-ME-ID":
            return {...state, id: action.id};
        case "LOG-OUT":
            return {...state, ...initialState};
        default:
            return state
    }
}


export const authMe = (): AppThunkType => async dispatch => {
    dispatch(actions.toggleIsLoad(true));
    try {
        const result = await APIAuthMe.me();
        dispatch(actions.setMeData(result.data));
        dispatch(actions.toggleIsLoad(false));
    } catch (e) {
        throw new Error(e.message);
    }
}

export const login = (email: string, password: string, rememberMe?: boolean, captcha?: boolean): AppThunkType => async dispatch => {
    dispatch(actions.toggleIsLoad(true));
    try {
        const result = await APIAuthMe.login(email, password, rememberMe, captcha);
        if (result.resultCode === 0) {
            dispatch(actions.setMeId(result.data.userId))
            dispatch(actions.setIsAuth(true));
            dispatch(actions.toggleIsLoad(false));
        } else {
            console.log(result)
        }
    } catch (e) {
        throw new Error(e.message);
    }
}

export const logOut = (): AppThunkType => async dispatch => {
    dispatch(actions.toggleIsLoad(true));
    try {
        const result = await APIAuthMe.logOut();
        result.resultCode === 0 &&
        dispatch(actions.logOut());
        dispatch(actions.toggleIsLoad(false));
    } catch (e) {
        throw new Error(e.message);
    }
}
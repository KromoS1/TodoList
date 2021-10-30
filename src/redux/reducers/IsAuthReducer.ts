import {ActionsType, MeProfileType} from '../types/Types';
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

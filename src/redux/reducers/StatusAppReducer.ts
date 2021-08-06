import {ActionsType} from "../types/Types";
import {actions} from "../actions/Actions";
import {AppThunkType} from "../store";
import {APIAuthMe} from "../../DAL/APIAuthMe";
import {handleServerNetworkError} from "../../utils/errorUtils";

export type StatusType = "idle" | "load" | "succeeded" | "failed"
export type StatusAppType = {
    message?: string
    status: StatusType
    isInitialized:boolean
}

const initialState: StatusAppType = {
    message: "",
    status: "idle",
    isInitialized:false,
}

export const StatusAppReducer = (state: StatusAppType = initialState, action: ActionsType<typeof actions>): StatusAppType => {
    switch (action.type) {
        case "SET/APP-STATUS":
            return {...state, status: action.status}
        case "SET-MESSAGE-STATUS":
            return {...state, message: action.message}
        case "SET-APP-INITIALIZED":
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}


export const inizializeApp = ():AppThunkType => async dispatch => {
    try {
        const me = await APIAuthMe.me();
        if (me.resultCode === 0){
            dispatch(actions.setMeData(me.data,true));
        }
        dispatch(actions.setAppInitialized(true));
    }catch (error){
        handleServerNetworkError(error, dispatch);
    }
}
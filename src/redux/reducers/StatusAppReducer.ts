import {ActionsType} from "../types/Types";
import {actionsIsAuth, actionsStatusApp} from "../actions/Actions";

export type StatusType = "idle" | "load" | "succeeded" | "failed"
export type StatusAppType = {
    message?: string
    status: StatusType
    isInitialized: boolean
}

const initialState: StatusAppType = {
    message: "",
    status: "idle",
    isInitialized: false,
}
const actions = {
    ...actionsStatusApp,
    ...actionsIsAuth,
}

export const StatusAppReducer = (state: StatusAppType = initialState, action: ActionsType<typeof actions>): StatusAppType => {
    switch (action.type) {
        case "SET-APP-STATUS":
            return {...state, status: action.status}
        case "SET-MESSAGE-STATUS":
            return {...state, message: action.message}
        case "SET-APP-INITIALIZED":
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

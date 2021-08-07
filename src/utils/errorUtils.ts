import {ResponseTypeGeneric} from "../redux/types/TypesResponse";
import {Dispatch} from "redux";
import {ActionsType} from "../redux/types/Types";
import {actionsStatusApp} from "../redux/actions/Actions";

type ErrorUtilsDispatchType = Dispatch<ActionsType<typeof actionsStatusApp>>

export const handleServerAppError = <T>(data: ResponseTypeGeneric<T>, dispatch: ErrorUtilsDispatchType) => {

    if (data.messages.length) {
        dispatch(actionsStatusApp.setMessageStatus(data.messages[0]));
    } else {
        dispatch(actionsStatusApp.setMessageStatus("Some error occurred."));
    }
    dispatch(actionsStatusApp.setStatusApp("failed"));
}

export const handleServerNetworkError = (error: { message: string }, dispatch: ErrorUtilsDispatchType) => {
    dispatch(actionsStatusApp.setMessageStatus(error.message))
    dispatch(actionsStatusApp.setStatusApp('failed'))
}
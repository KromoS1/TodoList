import {ResponseTypeGeneric} from "../redux/types/TypesResponse";
import {Dispatch} from "redux";
import {ActionsType} from "../redux/types/Types";
import {actions} from "../redux/actions/Actions";

type ErrorUtilsDispatchType = Dispatch<ActionsType<typeof actions>>

export const handleServerAppError = <T>(data: ResponseTypeGeneric<T>, dispatch: ErrorUtilsDispatchType) => {

    if (data.messages.length) {
        dispatch(actions.setMessageStatus(data.messages[0]));
    } else {
        dispatch(actions.setMessageStatus("Some error occurred."));
    }
    dispatch(actions.setStatusApp("failed"));
}

export const handleServerNetworkError = (error: { message: string }, dispatch: ErrorUtilsDispatchType) => {
    dispatch(actions.setMessageStatus(error.message))
    dispatch(actions.setStatusApp('failed'))
}
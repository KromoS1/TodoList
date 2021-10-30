import {ResponseTypeGeneric} from "../redux/types/TypesResponse";
import {actionsStatusApp} from "../redux/actions/Actions";
import {put} from "redux-saga/effects";

export function* handleServerAppError<T>(data: ResponseTypeGeneric<T>){
    if (data.messages.length) {
        yield put(actionsStatusApp.setMessageStatus(data.messages[0]));
    } else {
        yield put(actionsStatusApp.setMessageStatus("Some error occurred."));
    }
    yield put(actionsStatusApp.setStatusApp("failed"));
}

export function* handleServerNetworkError (error: { message: string }) {
    yield put(actionsStatusApp.setMessageStatus(error.message));
    yield put(actionsStatusApp.setStatusApp('failed'))
}

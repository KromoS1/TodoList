import {call, put, takeEvery} from "redux-saga/effects";
import {APIAuthMe} from "../../DAL/APIAuthMe";
import {handleServerNetworkError} from "../../utils/errorUtils";
import {actionsIsAuth, actionsStatusApp} from "../actions/Actions";
import {ResponseTypeGeneric} from "../types/TypesResponse";
import {AuthMeType} from "../types/Types";

export function* initializeAppWorker() {
    try {
        const me:ResponseTypeGeneric<AuthMeType> = yield call(APIAuthMe.me);
        if (me.resultCode === 0) {
            yield put(actionsIsAuth.setMeData(me.data, true));
        }
        yield put(actionsStatusApp.setAppInitialized(true));
    } catch (error) {
        yield* handleServerNetworkError(error);
    }
}

export const initializeApp = () => ({type: 'APP-WORKER/INITIALIZE-APP'});

export function* statusAppWatcher() {
    yield takeEvery('APP-WORKER/INITIALIZE-APP',initializeAppWorker);
}

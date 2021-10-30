import {call, put, takeEvery} from "redux-saga/effects";
import {actionsIsAuth, actionsStatusApp} from "../actions/Actions";
import {APIAuthMe} from "../../DAL/APIAuthMe";
import {stopSubmit} from "redux-form";
import {AxiosResponse} from "axios";
import {ResponseTypeGeneric} from "../types/TypesResponse";
import {AuthMeType} from "../types/Types";


export function* authMeWorker() {
    yield put(actionsStatusApp.setStatusApp("load"));
    try {
        const res:AxiosResponse<ResponseTypeGeneric<AuthMeType>> = yield call(APIAuthMe.me);
        debugger
        yield put(actionsIsAuth.setMeData(res.data.data, true));
        yield put(actionsStatusApp.setStatusApp("idle"));
    } catch (e) {
        yield put(actionsStatusApp.setStatusApp("failed"));
        yield put(actionsStatusApp.setMessageStatus(e.message));
        throw new Error(e.message);
    }
}

export function* loginWorker(action: ReturnType<typeof login>) {
    yield put(actionsStatusApp.setStatusApp("load"));
    try {
        const res:AxiosResponse<ResponseTypeGeneric<{ userId: number }>> = yield call(APIAuthMe.login, action.payload);
        if (res.data.resultCode === 0) {
            yield put(authMe());
            yield put(actionsStatusApp.setStatusApp("idle"));
        } else {
            yield put(stopSubmit("login", {_error: res.data.messages[0]}));
        }
    } catch (e) {
        yield put(actionsStatusApp.setStatusApp("failed"));
        yield put(actionsStatusApp.setMessageStatus(e.message));
        throw new Error(e.message);
    }
}

export function* logOutWorker() {
    yield put(actionsStatusApp.setStatusApp("load"));
    try {
        const res:AxiosResponse<ResponseTypeGeneric> = yield call(APIAuthMe.logOut);
        if (res.data.resultCode === 0){
            yield put(actionsIsAuth.logOut());
        }
        yield put(actionsStatusApp.setStatusApp("idle"));
    } catch (e) {
        yield put(actionsStatusApp.setStatusApp("failed"));
        yield put(actionsStatusApp.setMessageStatus(e.message));
        throw new Error(e.message);
    }
}

export const authMe = () => ({type: 'AUTH-WATCHER/AUTH-ME'});
export const login = (payload: { email: string, password: string, rememberMe?: boolean, captcha?: boolean }) =>
    ({type: 'AUTH-WATCHER/LOGIN', payload})
export const logOut = () => ({type: 'AUTH-WATCHER/LOG-OUT'});

export function* authMeWatcher() {
    yield takeEvery('AUTH-WATCHER/AUTH-ME', authMeWorker);
    yield takeEvery('AUTH-WATCHER/LOGIN', loginWorker);
    yield takeEvery('AUTH-WATCHER/LOG-OUT', logOutWorker);
}

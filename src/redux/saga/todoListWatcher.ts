import {call, put, takeEvery} from "redux-saga/effects";
import {APITodoLists} from "../../DAL/APITodoLists";
import {handleServerAppError, handleServerNetworkError} from "../../utils/errorUtils";
import {actionsStatusApp, actionsTodoList} from "../actions/Actions";
import {TodoListDomainType} from "../types/Types";
import {ResponseTypeGeneric} from "../types/TypesResponse";

export function* getTodoListWorker() {
    yield put(actionsStatusApp.setStatusApp("load"));
    try {
        const res: TodoListDomainType[] = yield call(APITodoLists.get);
        yield put(actionsTodoList.getTodoLists(res));
        yield put(actionsStatusApp.setStatusApp("idle"));
    } catch (error) {
        yield* handleServerNetworkError(error);
    }
}

export function* createTodoListWorker(action: ReturnType<typeof addTodolist>) {
    yield put(actionsStatusApp.setStatusApp("load"));
    try {
        const res: ResponseTypeGeneric<{ item: TodoListDomainType }> = yield call(APITodoLists.create, action.title);
        if (res.resultCode === 0) {
            yield put(actionsTodoList.addTodoList(res.data.item))
            yield put(actionsTodoList.addTasksTodoList(res.data.item.id))
            yield put(actionsStatusApp.setStatusApp("succeeded"));
            yield put(actionsStatusApp.setMessageStatus("Todo list created succeeded."));
        } else {
            yield* handleServerAppError<{ item: TodoListDomainType }>(res);
        }
    } catch (error) {
        yield* handleServerNetworkError(error);
    }
}

export function* updateTitleTodoListWorker(action: ReturnType<typeof updateTitleTodoList>) {
    yield put(actionsStatusApp.setStatusApp("load"));
    yield put(actionsTodoList.isDisable(true, action.id));
    try {
        const res: ResponseTypeGeneric = yield call(APITodoLists.updateTitle, action.title, action.id);
        if (res.resultCode === 0) {
            yield put(actionsTodoList.changeTodoListTitle(action.id, action.title));
            yield put(actionsStatusApp.setStatusApp("succeeded"));
            yield put(actionsStatusApp.setMessageStatus("Todo list change succeeded."));
            yield put(actionsTodoList.isDisable(false, action.id));
        } else {
            yield* handleServerAppError(res);
        }
    } catch (error) {
        yield* handleServerNetworkError(error);
        yield put(actionsTodoList.isDisable(false, action.id));
    }
}

export function* removeTodoListWorker(action: ReturnType<typeof deleteTodoList>) {
    yield put(actionsStatusApp.setStatusApp("load"));
    yield put(actionsTodoList.isDisable(true, action.id));
    try {
        const res: ResponseTypeGeneric = yield call(APITodoLists.delete, action.id);
        if (res.resultCode === 0) {
            yield put(actionsTodoList.removeTodoList(action.id));
            yield put(actionsTodoList.removeTodoList(action.id));
            yield put(actionsStatusApp.setStatusApp("succeeded"));
            yield put(actionsStatusApp.setMessageStatus("Todo list remove succeeded."));
            yield put(actionsTodoList.isDisable(false, action.id));
        } else {
            yield* handleServerAppError(res);
        }
    } catch (error) {
        yield* handleServerNetworkError(error);
        yield put(actionsTodoList.isDisable(false, action.id));
    }
}

export const getTodoLists = () => ({type: 'TODOLIST-WORKER/GET-TODOLIST'});
export const addTodolist = (title: string) => ({type: 'TODOLIST-WORKER/CREATE-TODOLIST', title});
export const updateTitleTodoList = (id: string, title: string) => ({
    type: 'TODOLIST-WORKER/UPDATE-TODOLIST',
    id,
    title
});
export const deleteTodoList = (id: string) => ({type: 'TODOLIST-WORKER/DELETE-TODOLIST', id});

export function* todoListWatcher() {
    yield takeEvery('TODOLIST-WORKER/GET-TODOLIST', getTodoListWorker);
    yield takeEvery('TODOLIST-WORKER/CREATE-TODOLIST', createTodoListWorker);
    yield takeEvery('TODOLIST-WORKER/UPDATE-TODOLIST', updateTitleTodoListWorker);
    yield takeEvery('TODOLIST-WORKER/DELETE-TODOLIST', removeTodoListWorker);
}

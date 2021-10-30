import {applyMiddleware, combineReducers, createStore} from 'redux';
import {TaskReducer} from './reducers/TaskReducer';
import {TodoListReducers} from './reducers/TodoListReducers';
import thunkMiddleware, {ThunkAction} from 'redux-thunk';
import {ActionsType} from './types/Types';
import {IsAuthReducer} from "./reducers/IsAuthReducer";
import {reducer as formReducer} from 'redux-form'
import {StatusAppReducer} from "./reducers/StatusAppReducer";
import {actionsIsAuth, actionsStatusApp, actionsTask, actionsTodoList} from "./actions/Actions";
import createSagaMiddleware from 'redux-saga';
import {statusAppWatcher} from "./saga/statusAppWatcher";
import {taskWatcher} from "./saga/taskWatcher";
import {all} from 'redux-saga/effects';
import {authMeWatcher} from "./saga/isAuthWatcher";
import {todoListWatcher} from "./saga/todoListWatcher";

const actions = {
    ...actionsTodoList,
    ...actionsTask,
    ...actionsStatusApp,
    ...actionsIsAuth,
}

const rootReducer = combineReducers({
    todoLists: TodoListReducers,
    tasks: TaskReducer,
    statusApp: StatusAppReducer,
    isAuth: IsAuthReducer,
    form: formReducer,
});

export type AppRootStateType = ReturnType<typeof rootReducer>;
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType,
    AppRootStateType,
    unknown,
    ActionsType<typeof actions>>

export const sagaMiddleware = createSagaMiddleware();
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, sagaMiddleware));
sagaMiddleware.run(rootWatcher);

function* rootWatcher() {
    yield all([
        statusAppWatcher(),
        authMeWatcher(),
        todoListWatcher(),
        taskWatcher(),
    ])
}

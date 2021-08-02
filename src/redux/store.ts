import {applyMiddleware, combineReducers, createStore} from 'redux';
import {TaskReducer} from './reducers/TaskReducer';
import {TodoListReducers} from './reducers/TodoListReducers';
import thunkMiddleware, {ThunkAction} from 'redux-thunk';
import {ActionsType} from './types/Types';
import {IsLoadReducer} from './reducers/IsLoadReducer';
import {actions} from './actions/Actions';
import {IsAuthReducer} from "./reducers/IsAuthReducer";
import {reducer as formReducer} from 'redux-form'


const rootReducer = combineReducers({
    todoLists: TodoListReducers,
    tasks: TaskReducer,
    isLoad: IsLoadReducer,
    isAuth:IsAuthReducer,
    form:formReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootStateType = ReturnType<typeof rootReducer>;

export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType,
    AppRootStateType,
    unknown,
    ActionsType<typeof actions>>
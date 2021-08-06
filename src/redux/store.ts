import {applyMiddleware, combineReducers, createStore} from 'redux';
import {TaskReducer} from './reducers/TaskReducer';
import {TodoListReducers} from './reducers/TodoListReducers';
import thunkMiddleware, {ThunkAction} from 'redux-thunk';
import {ActionsType} from './types/Types';
import {actions} from './actions/Actions';
import {IsAuthReducer} from "./reducers/IsAuthReducer";
import {reducer as formReducer} from 'redux-form'
import {StatusAppReducer} from "./reducers/StatusAppReducer";


const rootReducer = combineReducers({
    todoLists: TodoListReducers,
    tasks: TaskReducer,
    statusApp: StatusAppReducer,
    isAuth:IsAuthReducer,
    form:formReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootStateType = ReturnType<typeof rootReducer>;

export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType,
    AppRootStateType,
    unknown,
    ActionsType<typeof actions>>
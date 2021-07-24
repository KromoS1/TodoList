import {applyMiddleware, combineReducers, createStore} from 'redux';
import {TaskReducer} from "../Tests/TaskReducer";
import {TodoListReducers} from "../Tests/TodoListReducers";
import thunkMiddleware from "redux-thunk";


const rootReducer = combineReducers({
    tasks : TaskReducer,
    todoLists: TodoListReducers,
});

export const store = createStore(rootReducer,applyMiddleware(thunkMiddleware));

export type AppRootStateType = ReturnType<typeof rootReducer>;

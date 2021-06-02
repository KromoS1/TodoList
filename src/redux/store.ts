import {combineReducers, createStore} from 'redux';
import {TaskReducer} from "../Tests/TaskReducer";
import {TodoListReducers} from "../Tests/TodoListReducers";


const rootReducer = combineReducers({
    tasks : TaskReducer,
    todoLists: TodoListReducers,
});

export const store = createStore(rootReducer);

export type AppRootStateType = ReturnType<typeof rootReducer>;

//@ts-ignore
window.store = store;
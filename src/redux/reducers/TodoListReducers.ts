import {ActionsType, TodoListDomainType} from '../types/Types';
import {actionsStatusApp, actionsTodoList} from "../actions/Actions";

const initialState: TodoListDomainType[] = [];
const actions = {
    ...actionsTodoList,
    ...actionsStatusApp,
}

export const TodoListReducers = (state: TodoListDomainType[] = initialState, action: ActionsType<typeof actions>): TodoListDomainType[] => {
    switch (action.type) {
        case 'GET-TODO-LISTS':
            return action.todoLists.map(tl => ({...tl, filter: "all", isLoad: false}));
        case 'ADD-TODOLIST':
            return [{...action.todoList, filter: "all"},...state];
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.todoListID ? {...tl, title: action.title} : tl);
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.todoListID ? {...tl, filter: action.filter} : tl);
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.todoListId);
        }
        case "IS-DISABLE":
            return state.map(tl => tl.id === action.todoListId ? {...tl, disable: action.disable} : tl);
        default:
            return state
    }
}

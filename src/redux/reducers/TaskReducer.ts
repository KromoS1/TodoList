import {ActionsType, TaskStateType} from '../types/Types';
import {actionsStatusApp, actionsTask, actionsTodoList} from "../actions/Actions";

const initialState: TaskStateType = {}
const actions = {
    ...actionsTask,
    ...actionsStatusApp,
    ...actionsTodoList,
}

export const TaskReducer = (state: TaskStateType = initialState, action: ActionsType<typeof actions>): TaskStateType => {
    switch (action.type) {
        case 'GET-TASK':
            return {...state, [action.todoListId]: [...action.tasks]}
        case 'REMOVE-TASK':
            return {...state, [action.todoListId]: state[action.todoListId].filter(el => el.id !== action.idTask)}
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'ADD-TASKS-FOR-TODOLIST':
            return {...state, [action.todoListId]: []}
        case 'REMOVE-TODOLIST':
            const key = action.todoListId;
            const copyState = {...state};
            delete copyState[key];
            return copyState;
        case 'CHANGE-TASK':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => t.id === action.idTask ? action.task : t)
            }
        default:
            return state
    }
}

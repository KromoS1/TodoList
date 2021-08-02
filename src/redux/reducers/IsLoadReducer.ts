import {ActionsType} from '../types/Types';
import {actions} from '../actions/Actions';

const initialState: boolean = false


export const IsLoadReducer = (state: boolean = initialState, action: ActionsType<typeof actions>): boolean => {
    switch (action.type) {
        case 'TOGGLE-IS-LOAD':
            return action.isLoad
        default:
            return state
    }
}

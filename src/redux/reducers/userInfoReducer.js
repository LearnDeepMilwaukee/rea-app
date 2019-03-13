import {initialUserState} from '../store/initialState.js';
import {SET_CURRENT_ORG_ID, SET_CURRENT_RUN_ID} from "../actions/actionTypes";

/**
 * Reducer that performs the aciton onto the state
 * @param state Initial State
 * @param action
 * @returns {*}
 */
export default function userInfo(state = initialUserState, action) {
    switch (action.type) {
        case SET_CURRENT_ORG_ID:
            return Object.assign({}, state, {
                currentOrgId: action.newOrgId
            });
        case SET_CURRENT_RUN_ID:
            return Object.assign({}, state, {
                currentRun: action.currentRun
            });

        default:
            return state;
    }
}

import {initialUserState} from '../store/initialState.js';
import {SET_CURRENT_ORG_ID, SET_USER_TOKEN, SET_USER_ID} from "../actions/actionTypes";

/**
 * Reducer that performs the action onto the state
 * @param state The initial state for this reducer.
 * @param action The action being performed
 * @returns {*} The new state
 */
export default function getUserInfogetUserInfo(state = initialUserState, action) {
    switch (action.type) {
        case SET_CURRENT_ORG_ID:
            return Object.assign({}, state, {
                currentOrgId: action.newOrgId
            });
        case SET_USER_TOKEN:
            return Object.assign({}, state, {
                currentUserToken: action.newUserToken
            });
        case SET_USER_ID:
            return Object.assign({}, state, {
                currentUserId: action.newUserId
            });

        default:
            return state;
    }
}

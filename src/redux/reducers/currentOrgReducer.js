import initialState from './initialState';
import {GET_CURRENT_ORG_ID,SET_CURRENT_ORG_ID} from "../actions/actionTypes";

export default function currentOrg(state = initialState.currentOrgId, action) {
    let newState;
    switch (action.type) {
        case SET_CURRENT_ORG_ID:

            console.log('SET_ID Action');
            return action;
        case GET_CURRENT_ORG_ID:
            newState = action.currentOrgId;
            console.log('GET_ID Action');
            return newState;
        default:
            return state;
    }
}
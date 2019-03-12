import initialState from './initialState';
import {GET_CURRENT_ORG_ID, SET_CURRENT_ORG_ID} from "../actions/actionTypes";

export default function currentOrg(state = initialState.currentOrgId, action) {
    switch (action.type) {
        case SET_CURRENT_ORG_ID:
            state = action.newOrgId;
            return state;
        case GET_CURRENT_ORG_ID:
            return state;
        default:
            return state;
    }
}
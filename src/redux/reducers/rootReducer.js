import {combineReducers} from 'redux';
import currentOrg from "./currentOrgReducer.js";

export const rootReducer = combineReducers({
    currentOrg
});

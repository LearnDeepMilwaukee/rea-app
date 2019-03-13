import {combineReducers} from 'redux';
import getUserInfo from "./userInfoReducer.js";

/**
 * Each reducer added in here has a separate store
 */
export const rootReducer = combineReducers({
    getUserInfo
});

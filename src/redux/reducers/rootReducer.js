import {combineReducers} from 'redux';
import userInfo from "./userInfoReducer.js";


export const rootReducer = combineReducers({
    userInfo
});

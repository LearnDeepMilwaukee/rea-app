import {SET_USER_TOKEN} from "./actionTypes";

/**
 * This is an action creator, it creates an action and returns it
 * @param newUserTokenParam The new user token for the store to save
 * @returns {{type, newOrgId: *}} An action that updates the user token in the state
 */
export function setCurrentUserToken(newUserTokenParam) {
    return {type: SET_USER_TOKEN, newUserToken: newUserTokenParam};
}

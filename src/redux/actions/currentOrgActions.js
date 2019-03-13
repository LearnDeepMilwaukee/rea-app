import {SET_CURRENT_ORG_ID, SET_CURRENT_RUN_ID} from "./actionTypes";

/**
 * This is an action creator, it creates an action and returns it
 * @param newOrgIdParam The new organization Id for the store to save
 * @returns {{type, newOrgId: *}} An action that updates the orgId in the state
 */
export function setCurrentId(newOrgIdParam) {
    return {type: SET_CURRENT_ORG_ID, newOrgId: newOrgIdParam};
}

export function setCurrentRun(currentRun) {
    return {type: SET_CURRENT_RUN_ID, currentRun: currentRun};
}
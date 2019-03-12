import * as types from './actionTypes';

export function setCurrentId(newOrgIdParam) {
    return {type: types.SET_CURRENT_ORG_ID, newOrgId: newOrgIdParam};
}

export function getCurrentId() {
    return {type: types.GET_CURRENT_ORG_ID};

}
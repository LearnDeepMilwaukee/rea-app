import * as types from './actionTypes';

function url() {
    return 'www.url.com';
}

export function setCurrentId(json) {
    return {type: types.SET_CURRENT_ORG_ID, newOrgId: json.newOrgId};
}

export function getCurrentId() {
    return {type: types.GET_CURRENT_ORG_ID};

}
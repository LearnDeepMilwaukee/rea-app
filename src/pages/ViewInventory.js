import React from 'react';
// import {Header} from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css'
import getOrganizationById from "../queries/Organization/getOrganizationById.tsx";

export const GetSingleOrganization = getOrganizationById(({ organization, loading, error }) => {

    if (loading) {
        return(
            <strong>Loading...</strong>
        );
    } else if (error) {
        console.log("AAAAAAAAAAAAAAA");
        console.log(error);
        console.log("AAAAAAAAAAAAAAA");

        return(
            <p style={{color: "#F00"}}>API error</p>
        );
    } else {
        console.log("_________________________________");
        console.log(organization);

        return(
            <div>
                <Organization organization={organization}/>
            </div>
        );
    }
});

export const Organization = (props) => {
    let organization = props.organization;
    return(
        <div>
            <div>id: {organization.id}</div>
            <div>name: {organization.name}</div>
            <div>type: {organization.type}</div>
            <div>image: {organization.image}</div>
            <div>note: {organization.note}</div>
            {/*<div>ownedEconomicResources: {concatArray(organization.ownedEconomicResources)}</div>*/}
            {/*<div>agentProcesses: {concatArray(organization.agentProcesses)}</div>*/}
            {/*<div>agentPlans: {concatArray(organization.agentPlans)}</div>*/}
            {/*<div>agentEconomicEvents: {concatArray(organization.agentEconomicEvents)}</div>*/}
            {/*<div>agentCommitments: {concatArray(organization.agentCommitments)}</div>*/}
            {/*<div>agentRelationships: {concatArray(organization.agentRelationships)}</div>*/}
            {/*<div>agentRoles: {concatArray(organization.agentRoles)}</div>*/}
            {/*<div>agentRecipess: {concatArray(organization.agentRecipes)}</div>*/}
            <br/>
        </div>
    );
};


class ViewInventory extends React.Component {

    render() {
        //You need the two <br> tag so that the header does not cover up the text
        return (
            <div>
                <br/>
                <br/>
                <h1 class="ui header">Your Inventory</h1>
                <br/>
                <GetSingleOrganization organizationId={8}/> :
            </div>
        )
    }
}




export default ViewInventory;
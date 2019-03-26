import React from 'react';
// import {Header} from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css'
import getOrganizationById from "../queries/Organization/getOrganizationById.tsx";
import getEconomicResourceById from "../queries/EconomicResource/getEconomicResourceById.tsx";
import default_resource_img from "../resources/defualt_resource_img.jpg";
import {isNullOrUndefined} from "util"
import {Item, Button} from 'semantic-ui-react'

import { concatArray } from "./methods/common.tsx";

export const GetSingleOrganization = getOrganizationById(({ organization, loading, error }) => {

    if (loading) {
        return(
            <strong>Loading...</strong>
        );
    } else if (error) {
        console.log(error);

        return(
            <p style={{color: "#F00"}}>API error</p>
        );
    } else {
        // var ret_val = [];
        // console.log(organization.ownedEconomicResources);
        // let resource_count = organization.ownedEconomicResources.length;
        // for(let i = 0; i<resource_count; i++) {
        //     ret_val.push(<GetSingleEconomicResource economicResource={22}/>);
        // }
        // console.log("VALUES");
        // console.log(ret_val);
        let economicResourceList = organization.ownedEconomicResources;
        console.log("_____________________");
        console.log(economicResourceList);
        console.log("- - - - - - - - -  - -  --  - -- - - ");

        return(
            <div>
                {economicResourceList.map( (economicResource) =>
                    (<EconomicResource key={economicResource.id} economicResource={economicResource}/>)
                )}
            </div>
        );
    }
});


// export const OrganizationResources = (props) => {
//     let organization = props.organization;
//     return(
//         <div>
//             <div>id: {organization.id}</div>
//             <div>name: {organization.name}</div>
//             <div>type: {organization.type}</div>
//             <div>image: {organization.image}</div>
//             <div>note: {organization.note}</div>
//             <div>ownedEconomicResources: {concatArray(organization.ownedEconomicResources)}</div>
//             {/*<div>agentProcesses: {concatArray(organization.agentProcesses)}</div>*/}
//             {/*<div>agentPlans: {concatArray(organization.agentPlans)}</div>*/}
//             {/*<div>agentEconomicEvents: {concatArray(organization.agentEconomicEvents)}</div>*/}
//             {/*<div>agentCommitments: {concatArray(organization.agentCommitments)}</div>*/}
//             {/*<div>agentRelationships: {concatArray(organization.agentRelationships)}</div>*/}
//             {/*<div>agentRoles: {concatArray(organization.agentRoles)}</div>*/}
//             {/*<div>agentRecipess: {concatArray(organization.agentRecipes)}</div>*/}
//             <br/>
//         </div>
//     );
// };


export const GetSingleEconomicResource = getEconomicResourceById(({ economicResource, loading, error }) => {

    if (loading) {
        return(
            <strong>Loading...</strong>
        );
    } else if (error) {
        return(
            <p style={{color: "#F00"}}>API error</p>
        );
    } else {
        return(
            <div>
                <EconomicResource economicResource={economicResource}/>
            </div>
        );
    }
});





// {/*<div>*/}
//     {/*<div>Id: {economicResource.id}</div>*/}
//     {/*<div>Resource Classification: {economicResource.resourceClassifiedAs}</div>*/}
//     {/*<div>Tracking Id: {economicResource.trackingIdentifier}</div>*/}
//     {/*<div>Image: {economicResource.image}</div>*/}
//     {/*<div>currentQuantity: {economicResource.currentQuantity ? economicResource.currentQuantity.numericValue : "null"}*/}
//         {/*{economicResource.currentQuantity ? " " +  economicResource.currentQuantity.unit.name : ""}</div>*/}
//     {/*<div>Note: {economicResource.note}</div>*/}
//     {/*<div>Category: {economicResource.category}</div>*/}
//     {/*<div>Transfers: {concatArray(economicResource.transfers)}</div>*/}
//     {/*<br/>*/}
// {/*</div>*/}
export const EconomicResource = (props) => {
    let economicResource = props.economicResource;
    return(
        <Item>
            <Item.Image size="tiny" src={isNullOrUndefined(economicResource.image) || economicResource.image === "" ? default_resource_img : economicResource.image}/>
            <Item.Content>
                <Item.Header as='h1' >{economicResource.id}</Item.Header>
                <Item.Meta>
                    <span className='category'>Category: {economicResource.category}</span>
                    <span className='class'>Resource Classification: {economicResource.resourceClassifiedAs}</span>
                    <span className='trackingIdentifier'>Tracking Id: {economicResource.trackingIdentifier}</span>
                    <span className='quntitiy'>Quantity: {economicResource.currentQuantity}</span>
                    {/*<span className='units'>Quantity Unit: {economicResource.currentQuantity.unit.name }</span>*/}
                    <span className='transfers'>Transfers: {economicResource.transfers}</span>
                </Item.Meta>
                {/*<Item.Descritpion>{economicResource.note}</Item.Descritpion>*/}
                <Item.Extra>
                <Button floated='right' color='red' size='large'>Edit</Button>
            </Item.Extra>
    </Item.Content>
    </Item>
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
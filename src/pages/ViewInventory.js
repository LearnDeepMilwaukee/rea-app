/**
 * Form that displays the inventory of a current organization
 *
 * @author Donal Moloney
 * @date March 23, 2019
 */
import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import getOrganizationById from "../queries/Organization/getOrganizationById.tsx";
import getEconomicResourceById from "../queries/EconomicResource/getEconomicResourceById.tsx";
import default_resource_img from "../resources/defualt_resource_img.jpg";
import {isNullOrUndefined} from "util"
import {Item, Button, Description} from 'semantic-ui-react'

import { concatArray } from "./methods/common.tsx";

/**
 * Gets an organizations data
 */
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
        let economicResourceList = organization.ownedEconomicResources;
        economicResourceList.map( (economicResource) =>
            (console.log(economicResource.id))
        )
        return(
            <div>
                {economicResourceList.map( (economicResource) =>
                    (<GetSingleEconomicResource economicResourceId={economicResource.id}/>)
                )}
            </div>
        );
    }
});

/**
 * Gets a single economic resource that the organization owns
 */
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

/**
 * Formats economicresource data
 */
export const EconomicResource = (props) => {
    let economicResource = props.economicResource;
    return(
        <Item.Group>
            <Item>
                <Item.Image size="tiny" src={isNullOrUndefined(economicResource.image) || economicResource.image === "" ? default_resource_img : economicResource.image}/>
                <Item.Content>
                    <Item.Header as='h1' >{isNullOrUndefined(economicResource.id) || economicResource.id === "" ? "none\t\t" : economicResource.id}</Item.Header>
                    <Item.Meta>
                        <span className='category'>Category: {isNullOrUndefined(economicResource.category) || economicResource.category === "" ? "none\t\t" : economicResource.category}</span>
                        <span className='trackingIdentifier'>Tracking Id: {isNullOrUndefined(economicResource.trackingIdentifier) || economicResource.trackingIdentifier === "" ? "none\t\t" : economicResource.trackingIdentifier}</span>
                        <span className='quantity'>Quantity: {isNullOrUndefined(economicResource.currentQuantity.numericValue) || economicResource.currentQuantity.numericValue === "" ? "none\t\t" : economicResource.currentQuantity.numericValue}</span>
                        <span className='unit'>Quantity Unit: {isNullOrUndefined(economicResource.currentQuantity.unit.name) || economicResource.currentQuantity.unit.name === "" ? "none\t\t" : economicResource.currentQuantity.unit.name}</span>
                        <span className='transfers'>Transfers: {concatArray(economicResource.transfers) }</span>
                    </Item.Meta>
                    <Item.Description>Note: {isNullOrUndefined(economicResource.note) || economicResource.note === "" ? "none\t\t" : economicResource.note}</Item.Description>
                    <Item.Extra>
                        <Button floated='right' color='red' size='large'>Edit</Button>
                    </Item.Extra>
                </Item.Content>
            </Item>
        </Item.Group>
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
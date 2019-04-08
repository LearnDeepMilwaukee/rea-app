/**
 * Form that displays the inventory of a current organization
 *
 * @author Donal Moloney
 * @date March 23, 2019
 */
import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import getOrganizationById from "../../queries/Organization/getOrganizationById.tsx";
import getEconomicResourceById from "../../queries/EconomicResource/getEconomicResourceById.tsx";
import {isNullOrUndefined} from "util"
import {Item} from 'semantic-ui-react'

let default_image = require("../../resources/defaultImage.jpg");

/**
 * Gets an organizations data
 */
export const GetSingleOrganization = getOrganizationById(({ organization, loading, error }) => {
    if (loading) {
        return(
            <strong>Loading...</strong>
        );
    } else if (error) {
        return(
            <p style={{color: "#F00"}}>API error</p>
        );
    } else {
        let economicResourceList = organization.ownedEconomicResources;
        console.log(economicResourceList.length ===0);
        return(
            <div>
                <h2 className="ui header">{organization.name} Inventory</h2>
                <Item.Group divided>
                {(economicResourceList.length ===0)? <p>No Inventory Currently</p> :(economicResourceList.map( (economicResource) =>
                    (<GetSingleEconomicResource economicResourceId={economicResource.id}/>)
                ))}
                </Item.Group>
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
                <EconomicResource economicResource={economicResource}/>
        );
    }
});

/**
 * Formats economicresource data
 */
export const EconomicResource = (props) => {
    let economicResource = props.economicResource;
    return(
        <Item classname={""}>
            <Item.Image className={"ui small rounded image"} src={isNullOrUndefined(economicResource.image) || economicResource.image === "" ? default_image : economicResource.image}/>
            <Item.Content>
                <Item.Header as='h1' >{economicResource.trackingIdentifier}</Item.Header>
                <Item.Description>
                    <p>{(economicResource.note === "") ? "(no description available)" : economicResource.note}</p>
                    <p>Quantity: {economicResource.currentQuantity.numericValue} {economicResource.currentQuantity.unit.name}(s)</p>
                    <p>Added on: {economicResource.createdDate}</p>
                </Item.Description>
            </Item.Content>
        </Item>
    );
};

class OrganizationInventory extends React.Component {
    render() {
        return (
            <div className="ui container">
                <GetSingleOrganization organizationId={this.props.match.params.id}/>

            </div>
        )
    }
}

export default OrganizationInventory;
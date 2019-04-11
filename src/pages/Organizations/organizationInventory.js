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
import {Item, Button, Loader} from 'semantic-ui-react'
import {connect} from 'react-redux';

let default_image = require("../../resources/default_resource_img.jpg");
let currentOrganizationId = undefined;


const createItem = () => {
    console.log("create item")
}
/**
 * Gets an organizations data
 */
export const GetSingleOrganization = getOrganizationById(({organization, loading, error}) => {
    if (loading) {
        return (
            <Loader>Loading</Loader>
        );
    } else if (error) {
        return (
            <p style={{color: "#F00"}}>API error</p>
        );
    } else {
        let economicResourceList = organization.ownedEconomicResources;
        return (
            <div>
                <h2 className="ui header">{organization.name} Inventory</h2>
                {/*Update to check if you are apart of this org at all, not just if its your current org*/}
                {(currentOrganizationId == organization.id) ? (<Button className="ui right floated primary" onClick={createItem}>Add Item</Button>) : <div/>}


                <Item.Group divided>
                    {(economicResourceList.length === 0) ?
                        <p>Inventory Empty</p> : (economicResourceList.map((economicResource) =>
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
export const GetSingleEconomicResource = getEconomicResourceById(({economicResource, loading, error}) => {
    if (loading) {
        return (
            <Loader>Loading</Loader>
        );
    } else if (error) {
        return (
            <p style={{color: "#F00"}}>API error</p>
        );
    } else {
        return (
            <EconomicResource economicResource={economicResource}/>
        );
    }
});

/**
 * Formats economicresource data
 */
export const EconomicResource = (props) => {
    let economicResource = props.economicResource;
    return (
        <Item classname={""}>
            <Item.Image className={"ui small rounded image"}
                        src={isNullOrUndefined(economicResource.image) || economicResource.image === "" ? default_image : economicResource.image}
                        onError={i => i.target.src = default_image}/>
            <Item.Content>
                <Item.Header as='h1'>{economicResource.trackingIdentifier}</Item.Header>
                <Item.Description>
                    <p>{(economicResource.note === "") ? "(no description available)" : economicResource.note}</p>
                    <p>
                        Quantity: {economicResource.currentQuantity.numericValue} {economicResource.currentQuantity.unit.name}(s)</p>
                    <p>Added on: {economicResource.createdDate}</p>
                </Item.Description>
                <Item.Extra>
                    <Button className="ui right floated primary">Edit</Button>
                </Item.Extra>
            </Item.Content>
        </Item>
    );
};

class OrganizationInventory extends React.Component {

    render() {
        currentOrganizationId = this.props.currentOrganizationId;
        return (
            <div className="ui container">
                <GetSingleOrganization organizationId={this.props.match.params.id}/>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentOrganizationId: state.getUserInfo.currentOrgId,
    };
}

export default connect(
    mapStateToProps)(OrganizationInventory);

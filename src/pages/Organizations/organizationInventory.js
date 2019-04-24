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
import {Item, Button, Loader, Form} from 'semantic-ui-react'
import {withRouter} from "react-router-dom";

let default_image = require("../../resources/default_resource_img.jpg");

const optionsSort = [
    { key: 'alp', text: 'Alphabetical (A-Z)', value: 'alphabetical' },
    { key: 'alprev', text: 'Alphabetical (Z-A)', value: 'alphabeticalreverse' },
    { key: 'new', text: 'Date (Newest)', value: 'newest' },
    { key: 'old', text: 'Date (Oldest)', value: 'oldest' }
];

let inventoryParams = {
    nameFilter: "",
    sort: optionsSort[1]
};

let items = [];

/**
 * Formats economicresource data
 */
class InventoryCard extends React.Component {

    editItem = () => {
        // TODO
        // this.props.history.push("URL HERE");
        // window.location.reload();
    }

    render() {
        return (
            <Item classname={""}>
                <Item.Image className={"ui small rounded image"}
                            src={isNullOrUndefined(this.props.economicResource.image) || this.props.economicResource.image === "" ? default_image : this.props.economicResource.image}
                            onError={i => i.target.src = default_image}/>
                <Item.Content>
                    <Item.Header as='h1'>{this.props.economicResource.trackingIdentifier}</Item.Header>
                    <Item.Description>
                        <p>{(this.props.economicResource.note === "") ? "(no description available)" : this.props.economicResource.note}</p>
                        <p>
                            Quantity: {this.props.economicResource.currentQuantity.numericValue} {this.props.economicResource.currentQuantity.unit.name}(s)</p>
                        <p>Added on: {this.props.economicResource.createdDate}</p>
                    </Item.Description>
                    <Item.Extra>
                        <Button className="ui right floated primary" onClick={this.editItem}>Edit</Button>
                    </Item.Extra>
                </Item.Content>
            </Item>
        );
    }
}

const GetEconomicResource = getEconomicResourceById(({ economicResource, loading, error }) => {
    let retVal;
    if (loading) {
        return(
            <Loader>Loading</Loader>
        );
    } else if (error) {
        return(
            <p style={{color: "#F00"}}>API error</p>
        );
    } else {
        // currentItem.image = economicResource.image;
        // currentItem.note = economicResource.note;
        // currentItem.currentQuantity = economicResource.currentQuantity;
        // currentItem.trackingIdentifier = economicResource.trackingIdentifier;
        // currentItem.createdDate = economicResource.createdDate;
        items.push(economicResource);
        return(
            //<p>{economicResource.trackingIdentifier}</p>
            //economicResource
        );
    }
});

class OrganizationInventory extends React.Component {

    constructor() {
        super();
        this.state = {
            sorting: "alphabetical",
            typeFilter: "All",
            distanceFilter: 50,
            load: true,
            nameFilter: "",
        };

        this.onSortFilterChange = this.onSortFilterChange.bind(this);
    }


    onSortFilterChange = function (event, {value}) {
        this.setState({sorting: value});
    };

    render() {
        console.log(inventoryParams);

        const OrgInventory = getOrganizationById(({ organization, loading, error }) => {
            if (loading) {
                return(
                    <Loader>Loading</Loader>
                );
            } else if (error) {
                return(
                    <p style={{color: "#F00"}}>API error</p>
                );
            } else {
                let economicResourceList = organization.ownedEconomicResources;
                let filteredResources = [];
                // FILTER INVENTORY BY SEARCH
                for(let res of economicResourceList) {
                    //TODO
                    filteredResources.push(<GetEconomicResource economicResourceId={res.id}/>);
                    // if ((this.state.nameFilter === null) || (this.state.nameFilter === "undefined") || resource.trackingIdentifier.includes(this.state.nameFilter)) {
                    //     filteredResources.push(resource)
                    // }

                }

                return(
                    <div>
                        <h2 className="ui header">{organization.name} Inventory</h2>
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Input fluid label='Search For Org' placeholder='Search' />
                                <Form.Select fluid label='Sort' options={optionsSort} value={this.state.sorting} onChange={this.onSortFilterChange}/>
                            </Form.Group>
                            <Form.Group inline>
                                <Form.Button className="ui negative" color={'red'} onClick={this.handleReset}>Reset filters</Form.Button>
                            </Form.Group>
                        </Form>
                        {/*<Item.Group divided>*/}
                            {/*{(filteredResources.length ===0)? <p>Inventory Empty</p> :(filteredResources.map( (economicResource) =>*/}
                                {/*(<GetSingleEconomicResource economicResourceId={economicResource.id}/>)*/}
                            {/*))}*/}
                        {/*</Item.Group>*/}
                    </div>
                );
            }
        });

        return (
            <div className="ui container">
                <OrgInventory organizationId={this.props.match.params.id}/>
            </div>
        )
    }
}

export default withRouter(OrganizationInventory);

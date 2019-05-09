import React from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import getAllOrganizations from "../queries/Organization/getAllOrganizations"
import {Item, Button, Form} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import {isNullOrUndefined} from "util"
import {sortByName, sortByDistance, getDistanceBetweenPoints, filterByType, filterByDistance} from "../utilities"

let default_image = require("../resources/defaultImage.jpg");
let msoeCC = {latitude: 43.044004, longitude: -87.909020};

class OrgCard extends React.Component {


    viewInventory = () => {
        this.props.history.push("/orginventory/" + this.props.org.id);
        window.location.reload();
    }

    render() {
        return(
        <Item className={""}>
            <Item.Image className="ui small rounded image"
                        src={isNullOrUndefined(this.props.org.image) || this.props.org.image === "" ? default_image : this.props.org.image}/>

            <Item.Content>
                <Item.Header as='h1'>{this.props.org.name}</Item.Header>

                <Item.Description>
                    <p>{isNullOrUndefined(this.props.org.primaryLocation) ? "(no location available)" : this.props.org.primaryLocation.address}</p>
                    <p>{isNullOrUndefined(this.props.org.primaryLocation) ? "(distance not available)" : "Distance: " + getDistanceBetweenPoints(this.props.org.primaryLocation, msoeCC).toFixed(2) + " mi"}</p>
                </Item.Description>
                <Item.Extra>
                    <Button className="ui right floated primary" onClick={this.viewInventory}>View Inventory</Button>
                </Item.Extra>
            </Item.Content>
        </Item>
        );
    }
}



const optionsType = [
    { key: 'a', text: 'All', value: 'All' },
    { key: 'sd', text: 'School District', value: 'School District' },
    { key: 's', text: 'School', value: 'School' },
    { key: 'p', text: 'Person', value: 'Person' },
    { key: 'o', text: 'Organization', value: 'Organization' },
    { key: 'npc', text: 'Non-profit Company', value: 'Non-profit Company' },
    { key: 'n', text: 'Network', value: 'Network' },
    { key: 'm', text: 'Makerspace', value: 'Makerspace' },
    { key: 'l', text: 'Library', value: 'Library' },
    { key: 'fpc', text: 'For-profit Company', value: 'For-profit Company' },
    { key: 'ind', text: 'Individual', value: 'Individual' },
]

const optionsSort = [
    { key: 'alp', text: 'Alphabetical', value: 'alphabetical' },
    { key: 'dis', text: 'Distance', value: 'distance' },
]
class BasePage extends React.Component {

    constructor() {
        super();
        this.state = {
            sorting: "alphabetical",
            typeFilter: "All",
            distanceFilter: 50,
            load: true,
            nameFilter: "",
            myOrgsFilter: false,
            pubOrgsFilter: true,
            userEnteredDistance: ""
        };
        this.onTypeFilterChange = this.onTypeFilterChange.bind(this);
        this.onSortFilterChange = this.onSortFilterChange.bind(this);
        this.onDistanceFilterChange = this.onDistanceFilterChange.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onMyOrgsChange = this.onMyOrgsChange.bind(this);
        this.filterAndSortOrgs = this.filterAndSortOrgs.bind(this);
        // this.onPubOrgsChange = this.onPubOrgsChange.bind(this);
    }

    onSortFilterChange = function (event, {value}) {
        this.setState({sorting: value});
    };

    onTypeFilterChange = function (event, {value}) {
        this.setState({typeFilter: value});
    };

    onDistanceFilterChange = function (event) {
            this.setState({distanceFilter: parseInt(event.target.value), userEnteredDistance: parseInt(event.target.value)});
    };

    handleReset = function (event) {
        //0 mean the enter key was hit
        if(event.detail !== 0) {
            this.setState({
                distanceFilter: 50,
                sorting: "alphabetical",
                typeFilter: "All",
                nameFilter: "",
                myOrgsFilter: false,
                pubOrgsFilter: false,
                userEnteredDistance: ""
            });
        }
    };
    onNameChange = function (event) {
            this.setState({nameFilter: event.target.value});
    };
    onMyOrgsChange = function (event, {value}) {
        this.setState({myOrgsFilter: true});
        this.setState({pubOrgsFilter: false});

    };
    filterAndSortOrgs = function(organizationList){
        let filteredOrgs = [];
        for (let org of organizationList) {
            if ((this.state.nameFilter === null) || (this.state.nameFilter === "undefined") || org.name.includes(this.state.nameFilter)) {
                filteredOrgs.push(org);
            }
        }

        if (this.state.distanceFilter !== '') {
            filteredOrgs = filterByDistance(filteredOrgs, this.state.distanceFilter, msoeCC);
        }
        if (this.state.typeFilter !== "All") {
            filteredOrgs = filterByType(filteredOrgs, this.state.typeFilter);
        }
        if (this.state.sorting === "alphabetical") {
            filteredOrgs = sortByName(filteredOrgs);
        }
        else if (this.state.sorting === "distance") {
            filteredOrgs = sortByDistance(filteredOrgs, msoeCC);
        }
        const cardsArray = filteredOrgs.map(org => (
            <OrgCard org={org} history={this.props.history}/>
        ));
        return (
            <div>
                <Item.Group divided>
                    {cardsArray}
                </Item.Group>
            </div>
        );
    };


    render() {
        const OrgList = getAllOrganizations(({organizationList, loading, error}) => {
            if (loading) {
                console.log("LOADING");
                return (
                    <strong>Loading...</strong>
                );
            } else if (error) {
                console.log(error);

                return (
                    <p style={{color: "#F00"}}>API error</p>
                );
            } else {
                return this.filterAndSortOrgs(organizationList);

            }
        });
        return (
            <div className={"ui container"}>
                <Form>
                    <h2 className={"ui header"}>All Orgs</h2>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='Search For Org' placeholder='Search' value={this.state.nameFilter} onChange={this.onNameChange} />
                        <Form.Field>
                            <Form.Input fluid label='Search Distance' placeholder='Initially 50 mi' value={this.state.userEnteredDistance} onChange={this.onDistanceFilterChange} />
                        </Form.Field>
                        <Form.Select fluid label='Type' options={optionsType} value={this.state.typeFilter} onChange={this.onTypeFilterChange} />
                        <Form.Select fluid label='Sort' options={optionsSort} value={this.state.sorting} onChange={this.onSortFilterChange} />
                    </Form.Group>
                    <Form.Group inline>
                        {/*<Form.Radio label='My Orgs' value='myOrgs' checked={this.state.myOrgsFilter === true} onChange={this.onMyOrgsChange}/>*/}
                        {/*<Form.Radio label='Public Orgs' value='publicOrgs' checked={this.state.myOrgsFilter === false} onChange={this.onPubOrgsChange}/>*/}
                        <Form.Button className="ui negative" color={'red'} onClick={this.handleReset}>Reset filters</Form.Button>
                    </Form.Group>
                </Form>
                <div className={"ui container"}>
                    <OrgList/>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentUserToken: state.getUserInfo.currentUserToken,
    };
}

export default withRouter(connect(
    mapStateToProps)(BasePage));

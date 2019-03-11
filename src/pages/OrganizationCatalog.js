import React from 'react';
import getAllOrganizations from "../queries/getAllOrganizations.js"
//import getAllOrganizationTypes from "../queries/getAllOrganizationTypes.js"

import {Item, Button, Form} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import {isNullOrUndefined} from "util"
import {sortByName, sortByDistance, getDistanceBetweenPoints, filterByType, filterByDistance} from "..//utilities"
// import {getDistanceBetweenPoints, filterByType} from "..//utilities"

let default_image = require("../resources/defaultImage.jpg");
let msoeCC = {latitude: 43.044004, longitude: -87.909020};
const orgCard = (agent) => (
    <Item>
        <Item.Image src={isNullOrUndefined(agent.image) || agent.image === "" ? default_image : agent.image}/>

        <Item.Content>
            <Item.Header as='h1' >{agent.name}</Item.Header>

            <Item.Description>
                <p floated='left'>{isNullOrUndefined(agent.primaryLocation) ? "" : agent.primaryLocation.address}</p>
                <p floated='right'>{isNullOrUndefined(agent.primaryLocation) ? "" : "Distance: "+getDistanceBetweenPoints(agent.primaryLocation, msoeCC)+" mi"}</p>
            </Item.Description>
            <Item.Extra>
                <Button floated='right' color='blue' size='large'>Connect</Button>
            </Item.Extra>
        </Item.Content>
    </Item>
)

// const OrgList = getAllOrganizations(({organizationList, loading, error}) => {
//     if (loading) {
//         console.log("LOADING");
//         return (
//             <strong>Loading...</strong>
//         );
//     } else if (error) {
//         console.log(error);
//
//         return (
//             <p style={{color: "#F00"}}>API error</p>
//         );
//     } else {
//         // console.log(organizationList);
//         const cardsArray = organizationList.map(org => (
//             orgCard(org)
//         ));
//
//         let filteredOrgs = [];
//         console.log();
//         console.log("FILTERING");
//         console.log(filteredOrgs);
//         for (let org of cardsArray) {
//             if (isNullOrUndefined(this.state.nameFilter) || org.name.includes(this.state.nameFilter)) {
//                 filteredOrgs.push(org);
//                 console.log("Org matching filter " + this.state.nameFilter + ": " + org.name);
//             }
//         }
//         if (this.state.distanceFilter !== '') {
//             filteredOrgs = filterByDistance(filteredOrgs, this.state.distanceFilter, msoeCC);
//         }
//         if (this.state.typeFilter !== "All") {
//             filteredOrgs = filterByType(filteredOrgs, this.state.typeFilter);
//         }
//         if (this.state.sorting === "alphabetical") {
//             filteredOrgs = sortByName(filteredOrgs);
//         }
//         else if (this.state.sorting === "distance") {
//             filteredOrgs = sortByDistance(filteredOrgs, msoeCC);
//         }
//         return (
//             <div>
//                 <Item.Group divided>
//                     {filteredOrgs}
//                 </Item.Group>
//             </div>
//         );
//     }
// });

// const OrgTypeList = getAllOrganizationTypes(({organizationList, loading, error}) => {
//     console.log("Entered");
//     if (loading) {
//         console.log("LOADING");
//         return (
//             <strong>Loading...</strong>
//         );
//     } else if (error) {
//         console.log(error);
//
//         return (
//             <p style={{color: "#F00"}}>API error</p>
//         );
//     } else {
//         console.log("TEST!!!");
//         console.log(organizationList);
//         return (
//             <div>
//                 <Item.Group divided>
//                     {organizationList}
//                 </Item.Group>
//             </div>
//         );
//     }
// });

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
            pubOrgsFilter: true
        };
        this.onTypeFilterChange = this.onTypeFilterChange.bind(this);
        this.onSortFilterChange = this.onSortFilterChange.bind(this);
        this.onDistanceFilterChange = this.onDistanceFilterChange.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onMyOrgsChange = this.onMyOrgsChange.bind(this);
        this.onPubOrgsChange = this.onPubOrgsChange.bind(this);
    }

    onSortFilterChange = function (event, {value}) {
        this.setState({sorting: value});
    };

    onTypeFilterChange = function (event, {value}) {
        this.setState({typeFilter: value});
    };

    //Override is here for the distance slider so that it updates the value as well.
    onDistanceFilterChange = function (event, override) {
        if (event.key === 'Enter' || override) {
            event.preventDefault();
            this.setState({distanceFilter: parseInt(event.target.value)});
        }
    };

    handleReset = function (event, {value}) {
        this.setState({distanceFilter: 50});
        this.setState({sorting: "alphabetical"});
        this.setState({typeFilter: "All"});
        this.setState({nameFilter: ""});
        this.setState({myOrgsFilter: false});
        this.setState({pubOrgsFilter: true});
    };
    onNameChange = function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();

            this.setState({nameFilter: event.target.value});
        }
    };
    onMyOrgsChange = function (event, {value}) {
        this.setState({myOrgsFilter: true});
        this.setState({pubOrgsFilter: false});

    };
    onPubOrgsChange = function (event, {value}) {
        this.setState({myOrgsFilter: false});
        this.setState({pubOrgsFilter: true});
    };

    notImplementedFunction = function () {
        alert("This feature is not yet implemented");
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
                    orgCard(org)
                ));
                return (
                    <div>
                        <Item.Group divided>
                            {cardsArray}
                        </Item.Group>
                    </div>
                );
            }
        });

        return (
            <div>
                <Form>
                    <header as='h1'>All Orgs</header>

                    <Form.Group widths='equal'>
                        <Form.Input fluid label='Search For Org' placeholder='Search' onKeyPress={this.onNameChange} />
                        <Form.Field>
                            <Form.Input fluid label='Max Distance' placeholder='Search' value={this.state.distanceFilter} onKeyPress={this.onDistanceFilterChange} />
                        </Form.Field>
                        <Form.Select fluid label='Type' options={optionsType} value={this.state.typeFilter} onChange={this.onTypeFilterChange} />
                        <Form.Select fluid label='Sort' options={optionsSort} value={this.state.sorting} onChange={this.onSortFilterChange} />
                    </Form.Group>
                    <Form.Group inline>
                        <Form.Radio label='myOrgs' value='myOrgs' checked={this.state.myOrgsFilter === true} onChange={this.onMyOrgsChange}/>
                        <Form.Radio label='publicOrgs' value='publicOrgs' checked={this.state.myOrgsFilter === false} onChange={this.onPubOrgsChange}/>
                        <Form.Button color='red' onClick={this.handleReset}>Reset</Form.Button>
                    </Form.Group>
                </Form>
                <OrgList
                    token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNvbm5vciIsImlhdCI6MTU1MTg0ODI3MSwicGFzc3dvcmQiOiI3YzA4ODliOWU5ZmNjYzAxZDIzMDcwNzljNDk5OTcyNDFlNTZlNzU0IiwiaWQiOjZ9.unIuk6g8HcmyIuF1sONrLAiftApTlcuqMWWLO6DtqUQ"/>
            </div>
        )
    }
}




export default BasePage;
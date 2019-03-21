import getAllAgentRelationships from "../queries/AgentRelationship/getAllAgentRelationships";
import getMyAgent from "../queries/Agent/getMyAgent";
import getOrganizationById from "../queries/Organization/getOrganizationById";
import {isNullOrUndefined} from "util";
import 'semantic-ui-css/semantic.min.css'
import {Link} from 'react-router-dom';

import React, {Component} from "react";
import {render} from "react-dom";
import {
    Container,
    Image,
    Menu,
    Responsive,
    Input,
    Dropdown
} from "semantic-ui-react";
import * as logo from '../resources/upcycleLogo.png'
import './Header.css';
import {connect} from 'react-redux';

let myAgentId = -1;
let ownedOrgIDsArray;
let currentOrganizationObject;
let currentOrganizationId = -2;
let OrgConnections = [];
let OrgNameByID = getOrganizationById(({organization, loading, error}) => {

    if (loading) {
        return (<strong>Loading...</strong>);
    } else if (error) {
        console.log(error);
        return (<p style={{color: "#F00"}}>API error</p>);
    } else {
        if (currentOrganizationId === organization.id) currentOrganizationObject = organization;
        OrgConnections.push({key: organization.id, text: organization.name});
    }
});


let AgentRelationships = getAllAgentRelationships(({agentRelationshipList, loading, error}) => {
    function handleChange(e ,{value}) {
        console.log(value);
    }
    if (loading) {
        return (<strong>Loading...</strong>);
    } else if (error) {
        return (<p style={{color: "#F00"}}>API error</p>);
    } else {
        let filteredRelationships = [];
        let counter = 1;
        console.log(agentRelationshipList);
        console.log(myAgentId);
        for (let relationship of agentRelationshipList) {
            if (relationship.subject.id === myAgentId) {
                if (relationship.object.id === currentOrganizationId) {
                    filteredRelationships[0] = relationship;
                    currentOrganizationId = relationship.object.id;
                }
                else {
                    filteredRelationships[counter] = relationship;
                    counter++;
                }
            }
        }
        //Remove the first index if there isn't an entry there
        if (filteredRelationships.length > 0 && isNullOrUndefined(filteredRelationships[0])) {
            filteredRelationships.shift();
        }

        filteredRelationships.map(relationship => (
            <OrgNameByID organizationId={relationship.object.id}/>
        ));
        if (filteredRelationships.length === 0) {
           // ownedOrgIDsArray = <p> No current orgs</p>;
            //Empty
        }
        return (<div id="orgDropdown"><Dropdown fluid multiple selection options={OrgConnections} onChange={this.handleChange}/>{ownedOrgIDsArray} </div>)
    }
});



let MyAgent = getMyAgent(({agent, loading, error}) => {
    if (loading) {
        return (<strong>Loading...</strong>);
    } else if (error) {
        return (<p style={{color: "#F00"}}>API error</p>);
    } else {
        myAgentId = agent.id;
        return <div>
            <AgentRelationships/>

            <Menu.Item fitted="vertically">
                <Image src={agent.image ? agent.image : "https://via.placeholder.com/200.png?text=Logo%20Preview"}/>
                <span><h4> {agent.name}</h4></span>
            </Menu.Item>
        </div>;

    }
});

const NavMenu = () => (

    <Menu fixed="top">
        <Menu.Item fitted="vertically">
            <Image size="mini" src={logo}/>
        </Menu.Item>
        <Menu.Item fitted="vertically">
            <Input className='icon' icon='search' placeholder='Searching is disabled' disabled/>
        </Menu.Item>
        <Menu.Menu position="right">
            <MyAgent/>
            <Menu.Item>
                <Dropdown floating options={menuDropDown} text='°°°' icon={null}/>
            </Menu.Item>
        </Menu.Menu>

    </Menu>
);


class NavBar extends Component {

    render() {
        currentOrganizationId = this.props.currentOrganizationId;
        return (
            <div>
                <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                    <NavMenu/>
                </Responsive>
            </div>
        );
    }
}

const menuDropDown = [
    {key: 'home', text: 'Home', as: Link, to: '/'},
    {key: 'projects', text: 'Projects', as: Link, to: '/'},
    {key: 'activities', text: 'Activities', as: Link, to: '/'},
    {key: 'profile', text: 'Profile', as: Link, to: '/'},
    {key: 'notifications', text: 'Notifications', as: Link, to: '/'}

];
function mapStateToProps(state) {
    return {
        currentOrganizationId: state.getUserInfo.currentOrgId,
    };
}



export default connect(
    mapStateToProps,
)(NavBar);

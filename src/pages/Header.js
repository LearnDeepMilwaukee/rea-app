// import CurrentUser from "@vflows/bindings/user/CurrentUser";
// import * as Search from "../resources/searchIcon.svg";
// import getAllAgentRelationships from "../queries/agent/getAllAgentRelationships";
// import getMyAgent from "../queries/agent/getMyAgent";
// import getOrganizationById from "../../../ui-bindings/Organization/getOrganizationById";
// import {isNullOrUndefined} from "util";
// import agent from "../../../ui-bindings/Agent/agent";
import 'semantic-ui-css/semantic.min.css'

import _ from "lodash";
import React, { Component } from "react";
import { render } from "react-dom";
import {
    Container,
    Image,
    Menu,
    Responsive
} from "semantic-ui-react";
import * as logo from '../resources/upcycleLogo.png'
let organizationId = -1;
let currentOrganization = undefined;
// const Header = CurrentUser(({user, loading, error}) => {
//
//     let ownedOrgIDsArray;
//     let myAgentID = -1;
//
//     let MyAgent = getMyAgent(({agent, loading, error}) => {
//         if (loading) {
//             return (<strong>Loading...</strong>);
//         } else if (error) {
//             return (<p style={{color: "#F00"}}>API error</p>);
//         } else {
//             myAgentID = agent.id;
//             return (<div/>);
//         }
//     });
//
//     let OrgNameByID = getOrganizationById(({organization, loading, error}) => {
//         if (loading) {
//             return (<strong>Loading...</strong>);
//         } else if (error) {
//             console.log(error);
//             return (<p style={{color: "#F00"}}>API error</p>);
//         } else {
//             if (organizationId == organization.id) currentOrganization = organization;
//             let linkArray = window.location.href.split("/");
//             let link = (linkArray.length > 2 ? linkArray.slice(3).join("/") : "");
//             return (<div className="orgNameCard"><Link to={{
//                 pathname: link,
//                 state: [{organizationId: organization.id}]
//             }} onClick={() => {
//                 // Set the organizationId and currentOrganization to the selected values
//                 organizationId = organization.id;
//                 currentOrganization = organization;
//             }}>{organization.name}</Link></div>);
//         }
//     });
//
//
//     let AgentRelationships = getAllAgentRelationships(({agentRelationshipList, loading, error}) => {
//         if (loading) {
//             return (<strong>Loading...</strong>);
//         } else if (error) {
//             return (<p style={{color: "#F00"}}>API error</p>);
//         } else {
//             let filteredRelationships = [];
//             let counter = 1;
//             for (let relationship of agentRelationshipList) {
//                 if (relationship.subject.id === myAgentID) {
//                     console.log("Match " + JSON.stringify(relationship.object));
//                     if (relationship.object.id === organizationId) {
//                         filteredRelationships[0] = relationship;
//                         organizationId = relationship.object.id;
//                     }
//                     else {
//                         filteredRelationships[counter] = relationship;
//                         counter++;
//                     }
//                 }
//             }
//
//             //Remove the first index if there isn't an entry there
//             if (filteredRelationships.length > 0 && isNullOrUndefined(filteredRelationships[0])) {
//                 filteredRelationships.shift();
//             }
//             ownedOrgIDsArray = filteredRelationships.map(relationship => (
//                 <OrgNameByID organizationId={relationship.object.id}/>
//             ));
//             if (ownedOrgIDsArray.length == 0) {
//                 ownedOrgIDsArray = <p> No search results</p>;
//             }
//             // return (<div><div id="orgDropdown" >{ownedOrgIDsArray} </div><p id="ownedOrgLength" hidden>{filteredRelationships.length}</p></div>)
//             return (<div data-count={filteredRelationships.length} id="orgDropdown">{ownedOrgIDsArray} </div>)
//         }
//     });
//
//     /*
//     class AgentAssociation(models.Model):
//   "An AgentAssociation is a defined relationship between two Agents."
//   is_associate = models.ForeignKey(EconomicAgent,
//       verbose_name=_('is associate of'), related_name='is_associate_of')
//   has_associate = models.ForeignKey(EconomicAgent,
//       verbose_name=_('has associate'), related_name='has_associates')
//     */
//
//     return (
//         loading ? <strong>Loading...</strong> : (error ? <p style={{color: "#F00"}}>API error</p> : (
//                             <div>
//
//                                 <div id="ttHomeButton"><Link href="/"><span/></Link></div>
//                     <div>
//                         <input placeholder="Searching Disabled"/>
//                     </div>
//                     <span>
//             <div>
//             <div>
//               <h4 id="orgNameHeader">
//                 <img
//                     src={!isNullOrUndefined(currentOrganization) && currentOrganization.image ? currentOrganization.image : "https://via.placeholder.com/200.png?text=Logo%20Preview"}/> {!isNullOrUndefined(currentOrganization) ? currentOrganization.name : "No Org Selected"}</h4></div>
//               <div>
//
//                 <MyAgent/><AgentRelationships/>
//             </div>
//             </div>
//             <div><img
//                 src={user.image ? user.image : "https://via.placeholder.com/200.png?text=Logo%20Preview"}/></div>
//             <h4>{user.name}</h4>
//            <div>
//             <span>°°°</span>
//             <div>
//               {/*This is where you  can add new menu items*/}
//                 <Link to={"/"}>Home</Link>
//             </div>
//            </div>
//             </span>
//                     <div>
//                         <ul>
//                             <li>Projects</li>
//                             <li>Activities</li>
//                             <li>Profile</li>
//                             <li>Notifications</li>
//                         </ul>
//                     </div>
//                 </div>
//             )
//         )
//
//     );
// });



const NavMenu = ({ leftItems, rightItems }) => (
    <Menu fixed="top" inverted>
        <Menu.Item>
            <Image size="mini" src={logo} />
        </Menu.Item>
        {_.map(leftItems, item => <Menu.Item {...item} />)}
        <Menu.Menu position="right">
            {_.map(rightItems, item => <Menu.Item {...item} />)}
        </Menu.Menu>
    </Menu>
);

const NavBarChildren = ({ children }) => (
    <Container style={{ marginTop: "5em" }}>{children}</Container>
);

class NavBar extends Component {
    state = {
        visible: false
    };

    handlePusher = () => {
        const { visible } = this.state;

        if (visible) this.setState({ visible: false });
    };

    handleToggle = () => this.setState({ visible: !this.state.visible });

    render() {
        const { children, leftItems, rightItems } = this.props;
        const { visible } = this.state;

        return (
            <div>
                <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                    <NavMenu leftItems={leftItems} rightItems={rightItems} />
                    <NavBarChildren>{children}</NavBarChildren>
                </Responsive>
            </div>
        );
    }
}

const leftItems = [
    { as: "a", content: "Home", key: "home" },
    { as: "a", content: "Users", key: "users" }
];
const rightItems = [
    { as: "a", content: "Login", key: "login" },
    { as: "a", content: "Register", key: "register" }
];

const App = () => (
    <NavBar leftItems={leftItems} rightItems={rightItems}>
        <Image src={logo}
               as='a'
               size='medium'
               href='/'
               target='_blank' />
    </NavBar>
);

export default NavBar;

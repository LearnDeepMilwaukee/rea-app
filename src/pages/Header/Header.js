// import CurrentUser from "@vflows/bindings/user/CurrentUser";
// import * as Search from "../resources/searchIcon.svg";
// import getAllAgentRelationships from "../queries/agent/getAllAgentRelationships";
// import getMyAgent from "../queries/agent/getMyAgent";
// import getOrganizationById from "../../../ui-bindings/Organization/getOrganizationById";
// import {isNullOrUndefined} from "util";
// import agent from "../../../ui-bindings/Agent/agent";
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
import * as logo from '../../resources/upcycleLogo.png'
import './Header.css';

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


const NavMenu = () => (

    <Menu fixed="top">
        <Menu.Item fitted="vertically">
            <Image size="mini" src={logo}/>
        </Menu.Item>
        <Menu.Item fitted="vertically">
            <Input className='icon' icon='search' placeholder='Searching is disabled' disabled/>
        </Menu.Item>
        <Menu.Menu position="right">
            {/*Add Org Dropdown here*/}
            {/*Add User Info here*/}
            <Menu.Item>
                <Dropdown floating options={menuDropDown} text='°°°' icon={null} openOnMouseEnter/>
            </Menu.Item>
        </Menu.Menu>

    </Menu>
);


class NavBar extends Component {


    render() {

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

const App = () => (
    <NavBar>
        <Image src={logo}
               as='a'
               size='medium'
               href='/'
               target='_blank'/>
    </NavBar>
);

export default NavBar;

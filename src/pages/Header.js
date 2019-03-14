import * as React from "react";
// import CurrentUser from "@vflows/bindings/user/CurrentUser";
import {Search} from "../../icons";
// import getAllAgentRelationships from "../queries/agent/getAllAgentRelationships";
// import getMyAgent from "../queries/agent/getMyAgent";
// import getOrganizationById from "../../../ui-bindings/Organization/getOrganizationById";
// import {isNullOrUndefined} from "util";
// import agent from "../../../ui-bindings/Agent/agent";


//
// interface UserProps {
//     user?: {
//         name: string,
//         image: string
//     },
//         loading?: boolean,
//         error?: Error,
//         theme: Object,
// }

let organizationId = -1;
let currentOrganization = undefined;
// const Header = CurrentUser(({user, loading, error, theme}: UserProps) => {
//     let currentTheme = themeable(theme);
//
//     let ownedOrgIDsArray;
//     let myAgentID = -1;
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
//             return (<div className = "orgNameCard" {...currentTheme(12, "orgNameCard")}><Link to={{
//                 pathname: link,
//                 state: [{organizationId: organization.id}]
//             }}{...currentTheme(13, "link")} onClick={() => {
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
//                 ownedOrgIDsArray = <p {...currentTheme(10, "no-results")}> No search results</p>;
//             }
//             // return (<div><div id="orgDropdown" >{ownedOrgIDsArray} </div><p id="ownedOrgLength" hidden>{filteredRelationships.length}</p></div>)
//             return (<div data-count={filteredRelationships.length} id="orgDropdown" >{ownedOrgIDsArray} </div>)
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
//                 <header {...currentTheme(0, "main_header")} >
//                     <div id="ttHomeButton"><Link href="/"><span  {...currentTheme(1, "header_logo")} /></Link></div>
//                     <div {...currentTheme(2, "header_search")} >
//                         <input {...currentTheme(3, "search", "input")} placeholder="Searching Disabled"/>
//                         <span {...currentTheme(4, "search_icon")}><Search/></span>
//                     </div>
//                     <span  {...currentTheme(5, "account-switches")}>
//             <div {...currentTheme(11, "dropdown")} >
//             <div {...currentTheme(7, "profile_image")}>
//               <h4 id="orgNameHeader">
//                 <img
//                     src={!isNullOrUndefined(currentOrganization) && currentOrganization.image ? currentOrganization.image : "https://via.placeholder.com/200.png?text=Logo%20Preview"}/> {!isNullOrUndefined(currentOrganization) ? currentOrganization.name : "No Org Selected"}</h4></div>
//               <div {...currentTheme(9, "dropdown-content")}>
//
//                 <MyAgent/><AgentRelationships/>
//             </div>
//             </div>
//             <div {...currentTheme(7, "profile_image")}><img
//                 src={user.image ? user.image : "https://via.placeholder.com/200.png?text=Logo%20Preview"}/></div>
//             <h4>{user.name}</h4>
//            <div {...currentTheme(8, "dropdown")} >
//             <span>°°°</span>
//             <div {...currentTheme(9, "dropdown-content")}>
//               {/*This is where you  can add new menu items*/}
//                 <Link to={"/"} {...currentTheme(10, "link")}>Home</Link>
//             </div>
//            </div>
//             </span>
//                     <div {...currentTheme(284484, "header_mobile")}>
//                         <ul {...currentTheme(24449, "mobile_list")}>
//                             <li {...currentTheme(22383, "active")}>Projects</li>
//                             <li>Activities</li>
//                             <li>Profile</li>
//                             <li>Notifications</li>
//                         </ul>
//                     </div>
//                 </header>
//             )
//         )
//
//     );
// });
const Header = () => {
    return (
        <p>Header Bar</p>
    )
};
export default Header;

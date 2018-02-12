/**
 * This exports a React element which displays a list of all organizations,
 * and provides a section to select a single organization out of that list
 *
 * @package: REA app
 * @author:  Steven Fontaine <fontainesw@msoe.edu>
 * @since:   2018-02-08
 */

import * as React from "react";
import "./api.css";
import getAllOrganizations from "../../../ui-bindings/Organization/getAllOrganizations";
import { concatArray } from "./agent";

export const Organization = (props) => {
  var Organization = props.organization;
  return(
    <div>
      <div>id: {Organization.id}</div>
      <div>name: {Organization.name}</div>
      <div>type: {Organization.type}</div>
      <div>image: {Organization.image}</div>
      <div>note: {Organization.note}</div>
      <div>ownedEconomicResources: {concatArray(Organization.ownedEconomicResources)}</div>
      <div>agentProcesses: {concatArray(Organization.agentProcesses)}</div>
      <div>agentPlans: {concatArray(Organization.agentPlans)}</div>
      <div>agentEconomicEvents: {concatArray(Organization.agentEconomicEvents)}</div>
      <div>agentCommitments: {concatArray(Organization.agentCommitments)}</div>
      <div>agentRelationships: {concatArray(Organization.agentRelationships)}</div>
      <div>agentRoles: {concatArray(Organization.agentRoles)}</div>
      <div>agentRecipess: {concatArray(Organization.agentRecipes)}</div>
      <br/>
    </div>
  );
};

const OrganizationField = (props) => {
  return(
    <div>
      <form onSubmit={props.onSubmitAction}>
        Enter an Id: <input type="text" name="value" onChange={props.setOrganization}/>
        <input type="submit" value="query"/>
      </form>
    </div>
  );
};

export const GetAllOrganizations = getAllOrganizations(({ organizationList, loading, error}) => {
  return (
    loading ? <strong>Loading...</strong> : (
      error ? <p style={{color: "#F00"}}>API error</p> : (
        <div>
          {organizationList.map( (organization) =>
            (<Organization key={organization.id} organization={organization}/>)
          )}
        </div>
      )
    )
  );
});

class App extends React.Component {

  state = {
    getOneOrganizationId: null,
    setOneOrganizationId: null
  };

  // Runs every time the input field changes
  getOrganizationById = (event) => {
    this.setState({setOneOrganizationId: parseInt(event.target.value, 10)});
  };

  // Runs when "submit" is selected
  stopRefresh = (event) => {
    // Sets the value to query to the current value of the input field
    this.setState({getOneOrganizationId: this.state.setOneOrganizationId});
    event.preventDefault();
  };

  render() {
    const {getOneOrganizationId} = this.state;
    return (
      <div>
        {/*<h2>Get an Organization By Id: </h2>*/}
        {/*<br/>*/}
        {/*<OrganizationField setOrganization={this.getOrganizationById} onSubmitAction={this.stopRefresh}/>*/}
        {/*{*/}
          {/*getOneOrganizationId ?*/}
            {/*<GetSingleOrganization OrganizationId={getOneOrganizationId}/> :*/}
            {/*<div>Enter a value</div>*/}
        {/*}*/}
        {/*<br/>*/}
        <h2>All Organizations: </h2>
        <br/>
        <GetAllOrganizations/>
      </div>
    );
  }
}

export default App;

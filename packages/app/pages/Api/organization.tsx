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
import { concatArray } from "./common";
import getOrganizationById from "../../../ui-bindings/Organization/getOrganizationById";

export const Organization = (props) => {
  let organization = props.organization;
  return(
    <div>
      <div>id: {organization.id}</div>
      <div>name: {organization.name}</div>
      <div>type: {organization.type}</div>
      <div>image: {organization.image}</div>
      <div>note: {organization.note}</div>
      <div>ownedEconomicResources: {concatArray(organization.ownedEconomicResources)}</div>
      <div>agentProcesses: {concatArray(organization.agentProcesses)}</div>
      <div>agentPlans: {concatArray(organization.agentPlans)}</div>
      <div>agentEconomicEvents: {concatArray(organization.agentEconomicEvents)}</div>
      <div>agentCommitments: {concatArray(organization.agentCommitments)}</div>
      <div>agentRelationships: {concatArray(organization.agentRelationships)}</div>
      <div>agentRoles: {concatArray(organization.agentRoles)}</div>
      <div>agentRecipess: {concatArray(organization.agentRecipes)}</div>
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
      <div>
        {concatArray(organizationList)}
      </div>
    );
  }
});

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
    return(
      <div>
        <Organization organization={organization}/>
      </div>
    );
  }
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
        <h2>All Organizations: </h2>
        <br/>
        <GetAllOrganizations/>
        <br/>
        <h2>Get an Organization By Id: </h2>
        <br/>
        <OrganizationField setOrganization={this.getOrganizationById} onSubmitAction={this.stopRefresh}/>
        {
          getOneOrganizationId ?
            <GetSingleOrganization organizationId={getOneOrganizationId}/> :
            <div>Enter a value</div>
        }
      </div>
    );
  }
}

export default App;

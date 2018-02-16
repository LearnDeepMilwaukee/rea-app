/**
 * This exports a React element which displays a list of all processes,
 * and provides a section to select a single process out of that list
 *
 * @package: REA app
 * @author:  Steven Fontaine <fontainesw@msoe.edu>
 * @since:   2018-02-16
 */

import * as React from "react";
import "./api.css";
import getAllprocesses from "../../../ui-bindings/Process/getAllProcesses";
import {concatArray} from "./common";

export const Process = (props) => {
  let process = props.process;
  return(
    <div>
      <div>id: {process.id}</div>
      <div>name: {process.name}</div>
      <div>scope: {concatArray(process.scope)}</div>
      <div>planned start: {process.plannedStart}</div>
      <div>planned durration : {process.plannedDuration}</div>
      <div>is started : {process.isStarted}</div>
      <div>is finished : {process.isFinished}</div>
      <div>process classified as : {concatArray(process.processClassification)}</div>
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

/**
 *
 * @package: REA app
 * @author:  Nicholas Roth <Lou3797>
 * @since:   2018-02-08
 */

import * as React from "react";
import "./api.css";
import getAllOrganizations, {default as getAllPeople} from "../../../ui-bindings/Person/getAllPeople";
import getOrganizationById, {default as getPersonById} from "../../../ui-bindings/Person/getPersonById";

export const Organization = (props) => {
  let person = props.person;
  return(
    <div>
      <div>id: {person.id}</div>
      <div>name: {person.name}</div>
      <div>type: {person.type}</div>
      <div>image: {person.image}</div>
      <div>note: {person.note}</div>
      {/*<div>ownedEconomicResources: {concatArray(person.ownedEconomicResources)}</div>
      <div>agentProcesses: {concatArray(person.agentProcesses)}</div>
      <div>agentPlans: {concatArray(person.agentPlans)}</div>
      <div>agentEconomicEvents: {concatArray(person.agentEconomicEvents)}</div>
      <div>agentCommitments: {concatArray(person.agentCommitments)}</div>
      <div>agentRelationships: {concatArray(person.agentRelationships)}</div>
      <div>agentRoles: {concatArray(person.agentRoles)}</div>
      <div>agentRecipess: {concatArray(person.agentRecipes)}</div>*/}
      <br/>
    </div>
  );
};

const PersonField = (props) => {
  return(
    <div>
      <form onSubmit={props.onSubmitAction}>
        Enter an Id: <input type="text" name="value" onChange={props.setOrganization}/>
        <input type="submit" value="query"/>
      </form>
    </div>
  );
};

export const GetAllPeople = getAllPeople(({ people, loading, error}) => {
  return (
    loading ? <strong>Loading...</strong> : (
      error ? <p style={{color: "#F00"}}>API error</p> : (
        <div>
          {concatArray(people)}
        </div>
      )
    )
  );
});

export const GetSinglePerson = getPersonById(({ person, loading, error }) => {
  return (
    loading ? <strong>Loading...</strong> : (
      error ? <p style={{color: "#F00"}}>API error</p> : (
        <div>
          <Person person={person}/>
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

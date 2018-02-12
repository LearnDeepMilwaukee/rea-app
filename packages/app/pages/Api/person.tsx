/**
 *
 *
 * @package: REA app
 * @author: Nicholas Roth <Lou3797>
 * @since: 2018-2-12
 */

import * as React from "react";
import "./api.css"
import getAllPeople from "../../../ui-bindings/Person/getAllPeople";
import getPersonById from "../../../ui-bindings/Person/getPersonById";

export const Person = (props) => {
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

/**
 * The query field for fetching a ProcessClassification by ID
 */
const PersonField = (props) => {
  return(
    <div>
      <form onSubmit={props.onSubmitAction}>
        ID: <input type="text" name="value" id="idForm"/>
        <input type="submit" value="Query"/>
      </form>
    </div>
  );
};

/**
 * Maps the array of ProcessClassifications to their individual pieces
 */
export const GetAllPeople = getAllPeople( ({ people, loading, error}) => {

  if (loading) {
    return <p>Loading...</p>
  } else if (error) {
    return (<p>Error!</p>) // This can be made more specific
  }

  return (
    <div>
      {
        people.map(person => (
          <div key={person.id}>
            =======================================================<br/>
            <Person person={person}/>
          </div>
        ))
      }
    </div>
  );
});

/**
 * Takes the given ProcessClassification and returns its individual information
 */
export const GetSinglePerson = getPersonById( ({ person, loading, error }) => {

  if (loading) {
    return <p>Loading...</p>
  } else if (error) {
    return (<p>Error!</p>) // This can be made more specific
  }

  return (
    <div>
      <Person person={person}/>
    </div>
  );
});

/**
 * Main component of page.
 */
class App extends React.Component {
  state = {
    personId: undefined
  };

  getPersonById = (event) => {
    event.preventDefault();
    let procId = document.getElementById("idForm").value;
    this.setState({personId: procId});
  };

  render() {
    return (
      <div>
        <br/>
        <h2>Person by ID: </h2>
        <br/>
        <PersonField onSubmitAction={this.getPersonById()}/>
        <br/>
        {this.state.personId ? <GetSinglePerson personId={this.state.personId} /> : <p>No matches</p>}
        <br/>
        <h2>All People: </h2>
        <br/>
        <GetAllPeople/>
      </div>
    );
  }
}

export default App;

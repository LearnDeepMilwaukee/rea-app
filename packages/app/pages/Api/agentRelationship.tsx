/**
 * This exports a React element which displays all Agent Relationships
 *
 * @package: REA app
 * @author:  Steven Fontaine <fontainesw@msoe.edu>
 * @since:   2018-02-02
 */

import * as React from "react";
import "./api.css"
import getAllAgentRelationships from "../../../ui-bindings/AgentRelationship/getAllAgentRelationships";
import getAgentById from "../../../ui-bindings/Agent/getAgentById";

export const AgentRelationship = (props) => {
  var agentRelationship = props.agentRelationship;
  return(
    <div>
      <div>id: {agentRelationship.id}</div>
      <div>subject id: {agentRelationship.subject.id}</div>
      <div>object id: {agentRelationship.object.id}</div>
      <div>relationship id: {agentRelationship.relationship.id}</div>
      <br/>
    </div>
  );
};

const AgentRelationshipField = (props) => {
  return(
    <div>
      <form onSubmit={props.onSubmitAction}>
        Enter an Id: <input type="text" name="value" onChange={props.setAgentRelationship}/>
        <input type="submit" value="query"/>
      </form>
    </div>
  );
};

export const GetAllAgentRelationships = getAllAgentRelationships(({ agentRelationshipList, loading, error}) => {
  return (
    loading ? <strong>Loading...</strong> : (
      error ? <p style={{color: "#F00"}}>API error</p> : (
        <div>
          {agentRelationshipList.map( (agentRelationship) => (<AgentRelationship key={agentRelationship.id} agentRelationship={agentRelationship}/>))}
        </div>
      )
    )
  );
});

export const GetSingleAgentRelationship = getAgentById(({ agent, loading, error }) => {
  return (
    loading ? <strong>Loading...</strong> : (
      error ? <p style={{color: "#F00"}}>API error</p> : (
        <div>
          <Agent agent={agent}/>
        </div>
      )
    )
  );
});

class App extends React.Component {

  state = {
    getOneAgentRelationshipId: null,
    setOneAgentRelationshipiId: null
  };

  // Runs every time the input field changes
  getAgentById = (event) => {
    this.setState({setOneAgentRelationshipId: parseInt(event.target.value, 10)});
  };

  // Runs when "submit" is selected
  stopRefresh = (event) => {
    // Sets the value to query to the current value of the input field
    this.setState({getOneAgentRelationshipId: this.state.setOneAgentRelationshipId});
    event.preventDefault();
  };

  render() {
    const {getOneAgentRelationshipId} = this.state;
    return (
      <div>
        <br/>
        <h2>All Agent Relationships: </h2>
        <br/>
        <GetAllAgentRelationships/>
        <br/>
        <h2>Get an Agent By Id: </h2>
        <br/>
        <AgentRelationshipField setAgent={this.getAgentRelationshipById} onSubmitAction={this.stopRefresh}/>
        {getOneAgenRelationshiptId ? <GetSingleAgentRelationship agentRelationshipId={getOneAgentRelationshipId}/> : <div>Enter a value</div>}
        <br/>
      </div>
    );
  }
}

export default App;

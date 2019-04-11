/**
 * This exports a React element which displays all Agent Relationships
 *
 * @package: REA app
 * @author:  Steven Fontaine <fontainesw@msoe.edu>
 * @since:   2018-02-02
 */

import * as React from "react";
import getAllAgentRelationships from "../../queries/AgentRelationship/getAllAgentRelationships";
import getAgentRelationshipById from "../../queries/AgentRelationship/getAgentRelationshipById";

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
          {agentRelationshipList.map( (agentRelationship) => (
            <AgentRelationship key={agentRelationship.id} agentRelationship={agentRelationship}/>
          ))}
        </div>
      )
    )
  );
});

export const GetSingleAgentRelationship = getAgentRelationshipById(({ agentRelationship, loading, error }) => {
  return (
    loading ? <strong>Loading...</strong> : (
      error ? <p style={{color: "#F00"}}>API error</p> : (
        <div>
          <AgentRelationship agentRelationship={agentRelationship}/>
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
  getAgentRelationshipById = (event) => {
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
        <h2>Get an Agent By Id: </h2>
        <br/>
        <AgentRelationshipField setAgentRelationship={this.getAgentRelationshipById} onSubmitAction={this.stopRefresh}/>
        {getOneAgentRelationshipId ? <GetSingleAgentRelationship agentRelationshipId={getOneAgentRelationshipId}/> :
          <div>Enter a value</div>}
        <br/>
        <h2>All Agent Relationships: </h2>
        <br/>
        <GetAllAgentRelationships/>
        <br/>
      </div>
    );
  }
}

export default App;

/**
 * This exports a React element which displays the current users agent, a list of all agents,
 * and provides a section to select a single agent out of that list
 *
 * @package: REA app
 * @author:  Steven Fontaine <fontainesw@msoe.edu>
 * @since:   2018-01-25
 */

import * as React from "react";
import "./api.css"
import getMyAgent from "../../../ui-bindings/Agent/getMyAgent.js";
import getAllAgents from "../../../ui-bindings/Agent/getAllAgents.js";
import getAgentById from "../../../ui-bindings/Agent/getAgentById";

export const Agent = (props) => {
  return(
    <div>
      <div>id: {props.agent.id}</div>
      <div>name: {props.agent.name}</div>
      <div>type: {props.agent.type}</div>
      <div>image: {props.agent.image}</div>
      <div>note: {props.agent.note}</div>
      <div>ownedEconomicResources: {concatArray(props.agent.ownedEconomicResources)}</div>
      <div>agentProcesses: {concatArray(props.agent.agentProcesses)}</div>
      <div>agentPlans: {concatArray(props.agent.agentPlans)}</div>
      <div>agentEconomicEvents: {concatArray(props.agent.agentEconomicEvents)}</div>
      <div>agentCommitments: {concatArray(props.agent.agentCommitments)}</div>
      <div>agentRelationships: {concatArray(props.agent.agentRelationships)}</div>
      <div>agentRoles: {concatArray(props.agent.agentRoles)}</div>
      <div>agentRecipess: {concatArray(props.agent.agentRecipes)}</div>
      <br/>
    </div>
  );
};

function concatArray(array) {
  var retValue = "";
  console.log("Array: ", array, "\nIndex 0: ", array[0]);
  if (array[0] == null) {
    return "none"
  }
  retValue = array[0].id;
  for (var i = 1; i < array.length; i++) {
    retValue += ", ";
    retValue += array[i].id;
  }
  return retValue
}

const AgentField = (props) => {
  return(
    <div>
      <form onSubmit={props.onSubmitAction}>
        Enter an Id: <input type="text" name="value" onChange={props.setAgent}/>
        <input type="submit" value="query"/>
      </form>
    </div>
  );
};

export const GetMyAgent = getMyAgent(({ agent, loading, error}) => {
  return (
    loading ? <strong>Loading...</strong> : (
      error ? <p style={{color: "#F00"}}>API error</p> : (
        <div>
          <div>
            {<Agent agent={agent}/>}
          </div>
        </div>
      )
    )
  );
});

export const GetAllAgents = getAllAgents(({ agent, loading, error}) => {
  return (
    loading ? <strong>Loading...</strong> : (
      error ? <p style={{color: "#F00"}}>API error</p> : (
        <div>
          <div>
            {concatArray(agent)}
          </div>
        </div>
      )
    )
  );
});

export const GetSingleAgent = getAgentById(({ agent, loading, error }) => {
    return (
      loading ? <strong>Loading...</strong> : (
        error ? <p style={{color: "#F00"}}>API error</p> : (
          <div>
            <div>
              <Agent agent={agent}/>
            </div>
          </div>
        )
      )
    );
  }
);

class App extends React.Component {

  state = {
    getOneAgentId: null,
    setOneAgentId: null
  };

  // Runs every time the input field changes
  getAgentById = (event) => {
    this.setState({setOneAgentId: parseInt(event.target.value, 10)});
  };

  // Runs when "submit" is selected
  stopRefresh = (event) => {
    // Sets the value to query to the current value of the input field
    this.setState({getOneAgentId: this.state.setOneAgentId});
    event.preventDefault();
  };

  render() {
    const {getOneAgentId} = this.state;
    return (
      <div>
        <h2>My Agent: </h2>
        <br/>
        <GetMyAgent/>
        <br/>
        <h2>All Agents: </h2>
        <br/>
        <GetAllAgents/>
        <br/>
        <h2>Get an Agent By Id: </h2>
        <br/>
        <AgentField setAgent={this.getAgentById} onSubmitAction={this.stopRefresh}/>
        {getOneAgentId ? <GetSingleAgent agentId={getOneAgentId}/> : <div>Enter a value</div>}
      </div>
    );
  }
}

export default App;

/**
 * This exports a React element which displays the current users agent, a list of all agents,
 * and provides a section to select a single agent out of that list
 *
 * @package: REA app
 * @author:  Steven Fontaine <fontainesw@msoe.edu>
 * @since:   2018-01-25
 */

import * as React from "react";
import "./api.css";
import getMyAgent from "../../../ui-bindings/Agent/getMyAgent.js";
import getAllAgents from "../../../ui-bindings/Agent/getAllAgents.js";
import getAgentById from "../../../ui-bindings/Agent/getAgentById";
import { concatArray } from "./common";

export const Agent = (props) => {
  let agent = props.agent;
  return(
    <div>
      <div>id: {agent.id}</div>
      <div>name: {agent.name}</div>
      <div>type: {agent.type}</div>
      <div>image: {agent.image}</div>
      <div>note: {agent.note}</div>
      <div>ownedEconomicResources: {concatArray(agent.ownedEconomicResources)}</div>
      <div>agentProcesses: {concatArray(agent.agentProcesses)}</div>
      <div>agentPlans: {concatArray(agent.agentPlans)}</div>
      <div>agentEconomicEvents: {concatArray(agent.agentEconomicEvents)}</div>
      <div>agentCommitments: {concatArray(agent.agentCommitments)}</div>
      <div>agentRelationships: {concatArray(agent.agentRelationships)}</div>
      <div>agentRoles: {concatArray(agent.agentRoles)}</div>
      <div>agentRecipess: {concatArray(agent.agentRecipes)}</div>
      <br/>
    </div>
  );
};

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
        {<Agent agent={agent}/>}
      </div>
    );
  }
});

export const GetAllAgents = getAllAgents(({ agent, loading, error}) => {

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
        {concatArray(agent)}
      </div>
    );
  }
});

export const GetSingleAgent = getAgentById(({ agent, loading, error }) => {

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
        <Agent agent={agent}/>
      </div>
    );
  }
});

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

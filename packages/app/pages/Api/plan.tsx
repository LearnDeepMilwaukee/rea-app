/**
 * This exports a React element which displays a list of all plans,
 * and provides a section to select a single plan out of that list
 *
 * @package: REA app
 * @author:  Ryan Guinn <guinnrd@msoe.edu>
 * @since:   2018-02-19
 */

import * as React from "react";
import "./api.css";
import getAllplans from "../../../ui-bindings/Plan/getAllPlans";
import getPlanById from "../../../ui-bindings/Plan/getPlanById";
import { concatArray } from "./common";

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
      <div>note : {process.note}</div>
      <div>inputs: {concatArray(process.inputs)}</div>
      <div>outputs: {concatArray(process.outputs)}</div>
      <div>unplanned Economic Events: {concatArray(process.unplannedEconomicEvents)}</div>
      <div>committed Inputs: {concatArray(process.committedInputs)}</div>
      <div>committed Outputs: {concatArray(process.committedOutputs)}</div>
      <div>next Processes: {concatArray(process.nextProcesses)}</div>
      <div>previous Processes: {concatArray(process.previousProcesses)}</div>
      <div>working Agents: {concatArray(process.workingAgents)}</div>
      <div>process Plan: {concatArray(process.processPlan)}</div>
      <br/>
    </div>
  );
};

const ProcessField = (props) => {
  return(
    <div>
      <form onSubmit={props.onSubmitAction}>
        Enter an Id: <input type="text" name="value" onChange={props.setProcess}/>
        <input type="submit" value="query"/>
      </form>
    </div>
  );
};

export const GetAllProcesses = getAllprocesses(({ processList, loading, error}) => {

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
        {concatArray(processList)}
      </div>
    );
  }
});

export const GetSingleProcess = getProcessById(({ process, loading, error }) => {

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
        <Process process={process}/>
      </div>
    );
  }
});

class App extends React.Component {

  state = {
    getOneProcessId: null,
    setOneProcessId: null
  };

  // Runs every time the input field changes
  getProcessById = (event) => {
    this.setState({setOneProcessId: parseInt(event.target.value, 10)});
  };

  // Runs when "submit" is selected
  stopRefresh = (event) => {
    // Sets the value to query to the current value of the input field
    this.setState({getOneProcessId: this.state.setOneProcessId});
    event.preventDefault();
  };

  render() {
    const {getOneProcessId} = this.state;
    return (
      <div>
        <h2>All Process: </h2>
        <br/>
        <GetAllProcesses/>
        <br/>
        <h2>Get a Process By Id: </h2>
        <br/>
        <ProcessField setProcess={this.getProcessById} onSubmitAction={this.stopRefresh}/>
        {
          getOneProcessId ?
            <GetSingleProcess processId={getOneProcessId}/> :
            <div>Enter a value</div>
        }
      </div>
    );
  }
}

export default App;

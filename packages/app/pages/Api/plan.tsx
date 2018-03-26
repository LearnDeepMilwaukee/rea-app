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

export const Plan = (props) => {
  let plan = props.plan;
  return(
    <div>
      <div>id: {plan.id}</div>
      <div>name: {plan.name}</div>
      <div>plannedOn: {plan.plannedOn}</div>
      <div>due: {plan.due}</div>
      <div>note: {plan.note}</div>
      <div>scope: {concatArray(plan.scope)}</div>
      <div>planProcesses: {concatArray(plan.planProcesses)}</div>
      <div>workingAgents: {concatArray(plan.workingAgents)}</div>
      <div>plannedNonWorkInputs: {concatArray(plan.plannedNonWorkInputs)}</div>
      <div>plannedOutputs: {concatArray(plan.plannedOutputs)}</div>
      <div>nonWorkInputs: {concatArray(plan.nonWorkInputs)}</div>
      <div>outputs: {concatArray(plan.outputs)}</div>
      <br/>
    </div>
  );
};

const PlanField = (props) => {
  return(
    <div>
      <form onSubmit={props.onSubmitAction}>
        Enter an Id: <input type="text" name="value" onChange={props.setPlan}/>
        <input type="submit" value="query"/>
      </form>
    </div>
  );
};

export const GetAllPlans = getAllplans(({ planList, loading, error}) => {

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
        {concatArray(planList)}
      </div>
    );
  }
});

export const GetSinglePlan = getPlanById(({ plan, loading, error }) => {

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
        <Plan plan={plan}/>
      </div>
    );
  }
});

class App extends React.Component {

  state = {
    getOnePlanId: null,
    setOnePlanId: null
  };

  // Runs every time the input field changes
  getPlanById = (event) => {
    this.setState({setOnePlanId: parseInt(event.target.value, 10)});
  };

  // Runs when "submit" is selected
  stopRefresh = (event) => {
    // Sets the value to query to the current value of the input field
    this.setState({getOnePlanId: this.state.setOnePlanId});
    event.preventDefault();
  };

  render() {
    const {getOnePlanId} = this.state;
    return (
      <div>
        <h2>All Plans: </h2>
        <br/>
        <GetAllPlans/>
        <br/>
        <h2>Get a Plan By Id: </h2>
        <br/>
        <PlanField setPlan={this.getPlanById} onSubmitAction={this.stopRefresh}/>
        {
          getOnePlanId ?
            <GetSinglePlan planId={getOnePlanId}/> :
            <div>Enter a value</div>
        }
      </div>
    );
  }
}

export default App;

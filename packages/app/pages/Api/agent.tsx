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

export const Agent = (props) => {
  return(
    <div>
      <div>id: {props.id}</div>
      <div>name: {props.name}</div>
      <div>symbol: {props.symbol}</div>
      <br/>
    </div>
  );
};

const UnitField = (props) => {
  return(
    <div>
      <form onSubmit={props.onSubmitAction}>
        Enter an Id: <input type="text" name="value" onChange={props.setUnit}/>
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
            {<Agent id={agent.id} name={agent.name} symbol={agent.symbol}/>}
          </div>
        </div>
      )
    )
  );
});

class App extends React.Component {

  state = {
    getOneUnitId: null,
    setOneUnitId: null
  };

  // Runs every time the input field changes
  getUnitById = (event) => {
    this.setState({setOneUnitId: parseInt(event.target.value, 10)});
  };

  // Runs when "submit" is selected
  stopRefresh = (event) => {
    // Sets the value to query to the current value of the input field
    this.setState({getOneUnitId: this.state.setOneUnitId});
    event.preventDefault();
  };

  render() {
    const {getOneUnitId} = this.state;
    return (
      <div>
        <h2>My Agent: </h2>
        <br/>
        <GetMyAgent/>
        <br/>
      </div>
    );
  }
}

export default App;

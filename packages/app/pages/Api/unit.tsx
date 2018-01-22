/**
 * This exports a React element which displays a list o all units,
 * and provides a section to select a single unit out of that list
 *
 * @package: REA app
 * @author:  Steven Fontaine <fontainesw@msoe.edu>
 * @since:   2018-01-18
 */

import * as React from "react";
import "./api.css"
import GetUnits from "../../../ui-bindings/Unit/getAllUnits.js";
import GetUnit from "../../../ui-bindings/Unit/getUnitById.js"

export const Unit = (props) => {
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

export const UnitList = GetUnits(({ unitList, loading, error}) => {
  return (
    loading ? <strong>Loading...</strong> : (
      error ? <p style={{color: "#F00"}}>API error</p> : (
        <div>
          <div>
            {unitList.map( (unit) => (<Unit key={unit.id} id={unit.id} name={unit.name} symbol={unit.symbol}/>))}
          </div>
        </div>
      )
    )
  );
});

export const GetSingleUnit = GetUnit(
  (
    { unit, loading, error }
  ) => {
    return (
      loading ? <strong>Loading...</strong> : (
        error ? <p style={{color: "#F00"}}>API error</p> : (
          <div>
            <div>
              <Unit id={unit.id} name={unit.name} symbol={unit.symbol}/>
            </div>
          </div>
        )
      )
    );
  }
);

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
        <h2>List of all units: </h2>
        <br/>
        <UnitList/>
        <br/>
        <h2>Get Unit by Id: </h2>
        <br/>
        <UnitField setUnit={this.getUnitById} onSubmitAction={this.stopRefresh}/>
        {getOneUnitId ? <GetSingleUnit unitId={getOneUnitId}/> : <div>Enter a value</div>}
      </div>
    );
  }
}

export default App;

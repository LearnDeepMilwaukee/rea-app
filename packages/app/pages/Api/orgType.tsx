/**
 * This exports a React element which displays a list of all Organization Types,
 * and provides a section to select a single Organization Type out of that list
 *
 * @package: REA app
 * @author:  Ryan Guinn <guinnrd@msoe.edu>
 * @since:   2018-02-02
 */

import * as React from "react";
import "./api.css"
import GetOrgTypes from "../../../ui-bindings/Unit/getOrgTypes.js";
import GetOrgType from "../../../ui-bindings/Unit/getOrgTypeById.js"

export const OrgType = (props) => {
  return(
    <div>
      <div>id: {props.id}</div>
      <div>name: {props.name}</div>
      <br/>
    </div>
  );
};

const OrgTypeField = (props) => {
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
          {unitList.map( (unit) => (<Unit key={unit.id} id={unit.id} name={unit.name} symbol={unit.symbol}/>))}
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
            <Unit id={unit.id} name={unit.name} symbol={unit.symbol}/>
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

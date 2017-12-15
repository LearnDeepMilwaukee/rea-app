import * as React from "react";
import "./SimpleDBInteractions.css"
import "./unit.css"
import {GetUnitById} from "../../../ui-bindings/Unit/getUnitById"
import GetUnits from "../../../ui-bindings/Unit/getAllUnits";
import GetUnit from "../../../ui-bindings/Unit/getUnitById"
import {AppState} from "../../../store/types";

const Unit = (props) => {
  return(
    <div>
      <div>id: {props.id}</div>
      <div>name: {props.name}</div>
      <div>symbol: {props.symbol}</div>
      <br/>
    </div>
  )
};

const UnitList = GetUnits(({ unitList, loading, error}) => {
  return (
    loading ? <strong>Loading...</strong> : (
      error ? <p style={{ color: "#F00" }}>API error</p> : (
        <div >
          <div>
            {unitList.map( (unit) => (<Unit id={unit.id} name={unit.name} symbol={unit.symbol}/>))}
          </div>
        </div>
      )
    )
  );
});

const UnitField = (props) =>{
  return(
    <div>
      <form onSubmit={props.knockItOff}>
        Enter an Id: <input type="text" name="value" onChange={props.setUnit}/>
        <input type="submit" value="query"/>
      </form>
    </div>
  )
}

const SingleUnit = GetUnit(
  (
    { unit, loading, error, refetch }
  ) => {
    return (
      loading ? <strong>Loading...</strong> : (
        error ? <p style={{ color: "#F00" }}>API error</p> : (
          <div >
            <div>
              <Unit id={unit.id} name={unit.name} symbol={unit.symbol}/>
            </div>
          </div>
        )
      )
    );
  }
);

class app extends React.Component{

  state={
    getOneUnitId: 4,
    setOneUnitID: 4
  };

  getUnitById = (event) => {
    this.setState({setOneUnitID: parseInt(event.target.value)});
  };

  knockItOff = (event) => {
    this.setState({getOneUnitId: this.state.setOneUnitID});
    event.preventDefault();
  }

  render(){
    const {getOneUnitId} = this.state;
    return (
      <div>
        <h2>List of all units: </h2>
        <br/>
        <UnitList/>
        <br/>
        <h2>Get Unit by Id: </h2>
        <br/>
        <UnitField setUnit={this.getUnitById} knockItOff={this.knockItOff}/>
        <SingleUnit unitId={getOneUnitId}/>
      </div>
    )
  }
}

export default app;

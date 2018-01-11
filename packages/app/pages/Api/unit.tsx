import * as React from "react";
import "./api.css"
import GetUnits from "../../../ui-bindings/Unit/getAllUnits";
import GetUnit from "../../../ui-bindings/Unit/getUnitById"
import {AppState} from "../../../store/types";

export const Unit = (props) => {
  return(
    <div>
      <div>Id: {props.id}</div>
      <div>Name: {props.name}</div>
      <div>Symbol: {props.symbol}</div>
      <br/>
    </div>
  )
};

const UnitField = (props) =>{
  return(
    <div>
      <form onSubmit={props.onSubmitAction}>
        Enter an Id: <input type="text" name="value" onChange={props.setUnit}/>
        <input type="submit" value="query"/>
      </form>
    </div>
  )
};

const UnitList = GetUnits(({ unitList, loading, error}) => {
  return (
    loading ? <strong>Loading...</strong> : (
      error ? <p style={{ color: "#F00" }}>API error</p> : (
        <div >
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
    getOneUnitId: null,
    setOneUnitId: null
  };

  //Runs every time the input field changes
  getUnitById = (event) => {
    this.setState({setOneUnitId: parseInt(event.target.value)});
  };

  //Runs when "submit" is selected
  stopRefresh = (event) => {
    //Sets the value to query to the current value of the input field
    this.setState({getOneUnitId: this.state.setOneUnitId});
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
        <UnitField setUnit={this.getUnitById} onSubmitAction={this.stopRefresh}/>
        {getOneUnitId ? <GetSingleUnit unitId={getOneUnitId}/> : <div>Enter a value</div>}
      </div>
    )
  }
}

export default app;

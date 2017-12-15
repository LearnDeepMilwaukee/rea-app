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

const Run = () => {
  let getUnitById = new GetUnitById();
  return (
    <div>
      <div>run goes here</div>
      <div>{getUnitById.run()}</div>
    </div>
  )
};

class app extends React.Component{

  render(){
    return (
      <div>
        <h2>List of all units: </h2>
        <br/>
        <UnitList/>
        <br/>
        <h2>Get Unit by Id: </h2>
        <br/>
        <SingleUnit unitId={4}/>
      </div>
    )
  }
}

export default app;

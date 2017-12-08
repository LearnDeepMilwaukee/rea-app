import * as React from "react";
import "./SimpleDBInteractions.css"
import "./unit.css"
import GetUnits from "../../../ui-bindings/Unit/getAllUnits";
import GetUnit from "../../../ui-bindings/Unit/getUnitById";

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

const SingleUnit = GetUnit(({ unit, loading, error}) => {
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
});

export default SingleUnit;

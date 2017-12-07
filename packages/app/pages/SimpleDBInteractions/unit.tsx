import * as React from 'react';
import './SimpleDBInteractions.css'
import './unit.css'
import BindAgent from "../../../ui-bindings/Unit/GetUnit";

const Unit = (props) =>{
  return(
    <div>
      <div>
        <div>id: {props.id}</div>
        <div>name: {props.name}</div>
        <div>symbol: {props.symbol}</div>
        <br/>
      </div>
    </div>
  )
};

const UnitList = BindAgent(({ unitList, loading, error}: Props) => {
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

export default UnitList;

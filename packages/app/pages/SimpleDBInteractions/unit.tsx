import * as React from 'react';
import './SimpleDBInteractions.css'
import './unit.css'
import BindAgent from "../../../ui-bindings/Unit/GetUnit";

const Unit = (props) =>{
  return(
    <div>
      <div>
        <div>{props.id}</div>
        <div>{props.name}</div>
        <div>{props.symbol}</div>
      </div>
    </div>
  )
};

const UnitList = BindAgent(({ unit, loading, error}: Props) => {
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

export default UnitList;

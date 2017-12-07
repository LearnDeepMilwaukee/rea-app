import * as React from 'react';
import './SimpleDBInteractions.css'
import './unit.css'

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

class UnitList extends React.Component{
  state = {
    units: []
  };
  render(){
    return(
      <div>
        <Unit id="1" name="2" symbol="3"/>
      </div>
    )
  };
}

export default UnitList;

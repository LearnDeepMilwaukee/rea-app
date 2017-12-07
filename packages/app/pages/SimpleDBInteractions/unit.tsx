import * as React from "react"
import './SimpleDBInteractions.css'
import './unit.css'

const unit = (props) =>{
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

class Unit extends React.Component{
  render(){
    return(
      <div>
        <unit props={{id: "1",  name: "2",  symbol: "3"}}/>
      </div>
    )
  };
}

export default Unit;

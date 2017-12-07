import * as React from "react"

class uni extends React.Component{
  constructor(private props){super();}
  render(){
    return(
      <div>
        <div>
          <div>{this.props.id}</div>
          <div>{this.props.name}</div>
          <div>{this.props.symbol}</div>
        </div>
      </div>
    )
  }

};

class Unit extends React.Component{
  render(){
    return(
      <div>
        <uni id={"1"} name={"2"} symbol={"3"}/>
      </div>
    )
  };
}

export default Unit;

import * as React from "react"

class MyComponent extends React.Component{
  constructor(private props) {
    super(props);
  }
  render() {
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
  render() {
    return(
      <div>
        <MyComponent id={"1"} name={"2"} symbol={"3"}/>
      </div>
    )
  };
}

export default Unit;

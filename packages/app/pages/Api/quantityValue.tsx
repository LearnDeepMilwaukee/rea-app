import * as React from "react";
import "./api.css"
import {AppState} from "../../../store/types";
import {GetSingleUnit} from "./unit";
import GetQuantityValue from "../../../ui-bindings/QuantityValue/GetQuantityValueById";

export const QuantityValue = (props) => {
  return(
    <div>
      <div>Numeric value {props.numericValue}</div>
      <GetSingleUnit unitId={props.unitId}/>
      <br/>
    </div>
  )
};

const QuantityValueField = (props) =>{
  return(
    <div>
      <form onSubmit={props.onSubmitAction}>
        Enter an Id: <input type="text" name="value" onChange={props.setQuantityValue}/>
        <input type="submit" value="query"/>
      </form>
    </div>
  )
}

const SingleQuantityValue = GetQuantityValue(
  (
    { quantityValue, loading, error }
  ) => {
    return (
      loading ? <strong>Loading...</strong> : (
        error ? <p style={{ color: "#F00" }}>API error</p> : (
          <div >
            <div>
              <QuantityValue numericValue={quantityValue.numericValue} unitId={quantityValue.unitId}/>
            </div>
          </div>
        )
      )
    );
  }
);

class app extends React.Component{

  state={
    getOneQuantityValueId: null,
    setOneQuantityValueId: null
  };

  //Runs every time the input field changes
  getQuantityValueById = (event) => {
    this.setState({setOneQuantityValueId: parseInt(event.target.value)});
  };

  //Runs when "submit" is selected
  stopRefresh = (event) => {
    this.setState({getOneQuantityValueId: this.state.setOneQuantityValueId});
    event.preventDefault();
  }

  render(){
    const {getOneQuantityValueId} = this.state;
    return (
      <div>
        <h2>Get a quantityValue by Id: </h2>
        <br/>
        <QuantityValueField setQuantityValue={this.getQuantityValueById} onSubmitAction={this.stopRefresh}/>
        {getOneQuantityValueId ? <SingleQuantityValue quantityValueId={getOneQuantityValueId}/> : <div>Enter a value</div>}
      </div>
    )
  }
}

export default app;

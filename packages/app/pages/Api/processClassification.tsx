/**
 * A react element that fetches all ProcessClassifications
 *
 * @package:
 * @author:
 * @since:
 */

import * as React from "react";
import "./api.css"
import GetProcessClassifications from "../../../ui-bindings/ProcessClassification/getAllProcessClassifications";
import GetProcessClassification from "../../../ui-bindings/ProcessClassification/getProcessClassificationById";

export const ProcessClassification = (props) => {
  return(
    <div>
      <div>id: {props.id}</div>
      <div>name: {props.name}</div>
      <br/>
    </div>
  );
};

const ProcessClassificationField = (props) => {
  return(
    <div>
      <form onSubmit={props.onSubmitAction}>
        Enter an Id: <input type="text" name="value" onChange={props.setProcessClassification}/>
        <input type="submit" value="query"/>
      </form>
    </div>
  );
};

export const ProcessClassificationList = GetProcessClassifications(({ processClassificationList, loading, error}) => {
  return (
    loading ? <strong>Loading...</strong> : (
      error ? <p style={{color: "#F00"}}>API error</p> : (
        <div>
          <div>
            {processClassificationList.map( (processClassification) => (<ProcessClassification key={processClassification.id} id={processClassification.id} name={processClassification.name}/>))}
          </div>
        </div>
      )
    )
  );
});

export const GetSingleProcessClassification = GetProcessClassification(
  (
    { processClassification, loading, error }
  ) => {
    return (
      loading ? <strong>Loading...</strong> : (
        error ? <p style={{color: "#F00"}}>API error</p> : (
          <div>
            <ProcessClassification id={processClassification.id} name={processClassification.name}/>
          </div>
        )
      )
    );
  }
);

class App extends React.Component {

  state = {
    getOneProcessClassificationId: null,
    setOneProcessClassificationId: null
  };

  // Runs every time the input field changes
  getProcessClassificationById = (event) => {
    this.setState({setOneProcessClassificationId: parseInt(event.target.value, 10)});
  };

  // Runs when "submit" is selected
  stopRefresh = (event) => {
    // Sets the value to query to the current value of the input field
    this.setState({getOneProcessClassificationId: this.state.setOneProcessClassificationId});
    event.preventDefault();
  };

  render() {
    const {getOneProcessClassificationId} = this.state;
    return (
      <div>
        <h2>List of all process classifications: </h2>
        <br/>
        <ProcessClassificationList/>
        <br/>
        <h2>Get ProcessClassification by Id: </h2>
        <br/>
        <ProcessClassificationField setProcessClassification={this.getProcessClassificationById} onSubmitAction={this.stopRefresh}/>
        {getOneProcessClassificationId ? <GetSingleProcessClassification processClassificationId={getOneProcessClassificationId}/> : <div>Enter a value</div>}
      </div>
    );
  }
}

export default App;

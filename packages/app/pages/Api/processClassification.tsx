/**
 * A react element that fetches all ProcessClassifications
 *
 * @package:
 * @author:
 * @since:
 */

import * as React from "react";
import "./api.css"
import getAllProcessClassifications from "../../../ui-bindings/ProcessClassification/getAllProcessClassifications";
import getProcessClassificationById from "../../../ui-bindings/ProcessClassification/getProcessClassificationById";

export const ProcessClassification = (props) => {
  let proClass = props.processClassification;
  return(
    <div>
      <div>id: {proClass.id}</div>
      <div>name: {proClass.name}</div>
      <div>note: {proClass.note}</div>
      <div>scope: {proClass.scope}</div>
      <div>estimatedDuration: {proClass.estimatedDuration}</div>
      <br/>
    </div>
  );
};

function formatArray(array: JSON[]) {
  let proClassList = "";
  console.log("Array: ", array);
  if (array[0] == null) {
    proClassList = "None";
  } else {
    for (let i = 0; i < array.length; i++) {
      proClassList += (
        "=======================================================" +
        "\nd: " + array.id +
        "\nname: " + array.name +
        "\nnote: " + array.note +
        "\nestimatedDuration: " + array.estimatedDuration +
        "======================================================="
      );
    }
  }
  return proClassList
}

const ProcessClassificationField = (props) => {
  return(
    <div>
      <form onSubmit={props.onSubmitAction}>
        ID: <input type="text" name="value" onChange={props.setProcessClassification}/>
        <input type="submit" value="query"/>
      </form>
    </div>
  );
};

export const GetAllProcessClassifications = getAllProcessClassifications(({ processClassification, loading, error}) => {
  return (
    loading ? <strong>Loading...</strong> : (
      error ? <p style={{color: "#F00"}}>API error</p> : (
        <div>
          {formatArray(processClassification)}
        </div>
      )
    )
  );
});

export const GetSingleProcessClassification = getProcessClassificationById(({ processClassification, loading, error }) => {
  return (
    loading ? <strong>Loading...</strong> : (
      error ? <p style={{color: "#F00"}}>API error</p> : (
        <div>
          <ProcessClassification processClassification={processClassification}/>
        </div>
      )
    )
  );
});

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
        <h2>All ProcessClassifications: </h2>
        <br/>
        <GetAllProcessClassifications/>
        <br/>
        <h2>ProcessClassification by ID: </h2>
        <br/>
        <ProcessClassificationField setProcessClassification={this.getProcessClassificationById} onSubmitAction={this.stopRefresh}/>
        {getOneProcessClassificationId ? <GetSingleProcessClassification processClassificationId={getOneProcessClassificationId}/> : <div>Enter a value</div>}
      </div>
    );
  }
}

export default App;

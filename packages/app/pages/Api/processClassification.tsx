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
  console.log("PROPS: ", props);
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

const ProcessClassificationField = (props) => {
  return(
    <div>
      <form onSubmit={props.onSubmitAction}>
        ID: <input type="text" name="value" id="idform"/>
        <input type="submit" value="query"/>
      </form>
    </div>
  );
};

export const GetAllProcessClassifications = getAllProcessClassifications(({ processClassification, loading, error}) => {

  if (loading) {
    return <p>Loading...</p>
  } else if (error) {
    return <p>Error!</p>
  }

  return (
    <div>
      =======================================================<br/>
      <ProcessClassification processClassification={processClassification}/>
      =======================================================<br/>
    </div>
  );
});

export const GetSingleProcessClassification = getProcessClassificationById(({ processClassification, loading, error }) => {

  if (loading) {
    return <p>Loading...</p>
  } else if (error) {
    return <p>Error!</p>
  }

  return (
    <div>
      <ProcessClassification processClassification={processClassification}/>
    </div>
  );

  // return (
  //   loading ? <strong>Loading...</strong> : (
  //     error ? <p style={{color: "#F00"}}>API error</p> : (
  //       <div>
  //         <ProcessClassification processClassification={processClassification}/>
  //       </div>
  //     )
  //   )
  // );
});

class App extends React.Component {

  state = {
    procId: undefined
    // getOneProcessClassificationId: null,
    // setOneProcessClassificationId: null
  };

  // Runs every time the input field changes
  getProcessClassificationById = (event) => {
    event.preventDefault();
    // this.setState({setOneProcessClassificationId: parseInt(event.target.value, 10)});

    let procId = document.getElementById("idForm").value;
    this.setState({procId: procId});
  };

  // Runs when "submit" is selected
  // stopRefresh = (event) => {
  //   // Sets the value to query to the current value of the input field
  //   this.setState({getOneProcessClassificationId: this.state.setOneProcessClassificationId});
  //   event.preventDefault();
  // };

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
        <ProcessClassificationField onSubmitAction={/*this.stopRefresh*/this.getProcessClassificationById}/>
        {/*{getOneProcessClassificationId ? <GetSingleProcessClassification processClassificationId={getOneProcessClassificationId}/> : <div>Enter a value</div>}*/}
        <GetSingleProcessClassification processClassificationId={this.state.procId} />
      </div>
    );
  }
}

export default App;

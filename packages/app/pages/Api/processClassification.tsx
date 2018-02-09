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
  //console.log("PROPS: ", props);
  let proClass = props.processClassification;
  //console.log(proClass);
  return(
    <div>
      <div>id: {proClass.id}</div>
      <div>name: {proClass.name}</div>
      <div>note: {proClass.note}</div>
      <div>scope: {proClass.scope.id}</div>
      <div>estimatedDuration: {proClass.estimatedDuration}</div>
      <br/>
    </div>
  );
};

const ProcessClassificationField = (props) => {
  return(
    <div>
      <form onSubmit={props.onSubmitAction}>
        ID: <input type="text" name="value" id="idForm"/>
        <input type="submit" value="query"/>
      </form>
    </div>
  );
};

export const GetAllProcessClassifications = getAllProcessClassifications( ({ processClassifications, loading, error}) => {

  if (loading) {
    return <p>Loading...</p>
  } else if (error) {
    return <p>Error!</p>
  }

  console.log("Process Classifications (coming back from API)", processClassifications);

  return (
    <div>
      {
        processClassifications.map(processClassification => (
          <div>
            =======================================================<br/>
            <ProcessClassification processClassification={processClassification}/>
            =======================================================<br/>
          </div>
        ))
      }
    </div>
  );
});

export const GetSingleProcessClassification = getProcessClassificationById( ({ processClassification, loading, error }) => {

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
});

class App extends React.Component {

  state = {
    procId: undefined
  };

  // Runs every time the input field changes
  getProcessClassificationById = (event) => {
    event.preventDefault();
    let procId = document.getElementById("idForm").value;
    this.setState({procId: procId});
  };

  /*
   *  todo: see if error has any attributes or if it's just a bool
   *  todo: invalid id should say "no matches"?
   */
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
        {this.state.procId ? <GetSingleProcessClassification processClassificationId={this.state.procId} /> : <p>No matches</p>}
      </div>
    );
  }
}

export default App;

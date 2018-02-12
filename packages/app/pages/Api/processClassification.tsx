/**
 * The page to display all ProcessClassifications in the databse and to allow the user to query one by ID
 *
 * @package: REA app
 * @author: Nicholas Roth <Lou3797>
 * @since: 2018-1-28
 */

import * as React from "react";
import "./api.css"
import getAllProcessClassifications from "../../../ui-bindings/ProcessClassification/getAllProcessClassifications";
import getProcessClassificationById from "../../../ui-bindings/ProcessClassification/getProcessClassificationById";

/**
 * How to render a single ProcessClassification
 * @param props Parameters of the ProcessClassification
 */
export const ProcessClassification = (props) => {
  let proClass = props.processClassification;
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

/**
 * The query field for fetching a ProcessClassification by ID
 */
const ProcessClassificationField = (props) => {
  return(
    <div>
      <form onSubmit={props.onSubmitAction}>
        ID: <input type="text" name="value" id="idForm"/>
        <input type="submit" value="Query"/>
      </form>
    </div>
  );
};

/**
 * Maps the array of ProcessClassifications to their individual pieces
 */
export const GetAllProcessClassifications = getAllProcessClassifications( ({ processClassifications, loading, error}) => {

  if (loading) {
    return <p>Loading...</p>
  } else if (error) {
    return (<p>Error!</p>) // This can be made more specific
  }

  return (
    <div>
      {
        processClassifications.map(processClassification => (
          <div>
            =======================================================<br/>
            <ProcessClassification key={processClassification.id} processClassification={processClassification}/>
          </div>
        ))
      }
    </div>
  );
});

/**
 * Takes the given ProcessClassification and returns its individual information
 */
export const GetSingleProcessClassification = getProcessClassificationById( ({ processClassification, loading, error }) => {

  if (loading) {
    return <p>Loading...</p>
  } else if (error) {
    return (<p>Error!</p>) // This can be made more specific
  }

  return (
    <div>
      <ProcessClassification processClassification={processClassification}/>
    </div>
  );
});

/**
 * Main component of page.
 */
class App extends React.Component {
  state = {
    procId: undefined
  };

  getProcessClassificationById = (event) => {
    event.preventDefault();
    let procId = document.getElementById("idForm").value;
    this.setState({procId: procId});
  };

  render() {
    return (
      <div>
        <br/>
        <h2>ProcessClassification by ID: </h2>
        <br/>
        <ProcessClassificationField onSubmitAction={this.getProcessClassificationById}/>
        <br/>
        {this.state.procId ? <GetSingleProcessClassification processClassificationId={this.state.procId} /> : <p>No matches</p>}
        <br/>
        <h2>All ProcessClassifications: </h2>
        <br/>
        <GetAllProcessClassifications/>
      </div>
    );
  }
}

export default App;

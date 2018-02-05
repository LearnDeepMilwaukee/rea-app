/**
 * This exports a React element which displays a list of all Organization Types,
 * and provides a section to select a single Organization Type out of that list
 *
 * @package: REA app
 * @author:  Ryan Guinn <guinnrd@msoe.edu>
 * @since:   2018-02-02
 */

import * as React from "react";
import "./api.css"
import GetOrgTypes from "../../../ui-bindings/OrgType/getAllOrgTypes.js";
import GetOrgType from "../../../ui-bindings/OrgType/getOrgTypeById.js"

export const OrgType = (props) => {
  return(
    <div>
      <div>id: {props.id}</div>
      <div>name: {props.name}</div>
      <br/>
    </div>
  );
};

const OrgTypeField = (props) => {
  return(
    <div>
      <form onSubmit={props.onSubmitAction}>
        Enter an Id: <input type="text" name="value" onChange={props.setOrgType}/>
        <input type="submit" value="query"/>
      </form>
    </div>
  );
};

export const OrgTypeList = GetOrgTypes(({ orgTypeList, loading, error}) => {
  return (
    loading ? <strong>Loading...</strong> : (
      error ? <p style={{color: "#F00"}}>API error</p> : (
        <div>
          {orgTypeList.map( (orgType) => (<OrgType key={orgType.id} id={orgType.id} name={orgType.name}/>))}
        </div>
      )
    )
  );
});

export const GetSingleOrgType = GetOrgType(
  (
    { orgType, loading, error }
  ) => {
    return (
      loading ? <strong>Loading...</strong> : (
        error ? <p style={{color: "#F00"}}>API error</p> : (
          <div>
            <OrgType id={orgType.id} name={orgType.name}/>
          </div>
        )
      )
    );
  }
);

class App extends React.Component {

  state = {
    getOneOrgTypeId: null,
    setOneOrgTypeId: null
  };

  // Runs every time the input field changes
  getOrgTypeById = (event) => {
    this.setState({setOneOrgTypeId: parseInt(event.target.value, 10)});
  };

  // Runs when "submit" is selected
  stopRefresh = (event) => {
    // Sets the value to query to the current value of the input field
    this.setState({getOneOrgTypeId: this.state.setOneOrgTypeId});
    event.preventDefault();
  };

  render() {
    const {getOneOrgTypeId} = this.state;
    return (
      <div>
        <h2>List of all organizationTypes: </h2>
        <br/>
        <OrgTypeList/>
        <br/>
        <h2>Get OrgType by Id: </h2>
        <br/>
        <OrgTypeField setOrgType={this.getOrgTypeById} onSubmitAction={this.stopRefresh}/>
        {getOneOrgTypeId ? <GetSingleOrgType orgTypeId={getOneOrgTypeId}/> : <div>Enter a value</div>}
      </div>
    );
  }
}

export default App;

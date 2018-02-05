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
import GetOrganizationTypes from "../../../ui-bindings/OrganizationType/getAllOrganizationTypes.js";
import GetOrganizationType from "../../../ui-bindings/OrganizationType/getOrganizationTypeById.js"

export const OrganizationType = (props) => {
  return(
    <div>
      <div>id: {props.id}</div>
      <div>name: {props.name}</div>
      <br/>
    </div>
  );
};

const OrganizationTypeField = (props) => {
  return(
    <div>
      <form onSubmit={props.onSubmitAction}>
        Enter an Id: <input type="text" name="value" onChange={props.setOrganizationType}/>
        <input type="submit" value="query"/>
      </form>
    </div>
  );
};

export const OrganizationTypeList = GetOrganizationTypes(({ orgTypeList, loading, error}) => {
  console.log("test");
  return (
    loading ? <strong>Loading...</strong> : (
      error ? <p style={{color: "#F00"}}>API error</p> : (
        <div>
          {orgTypeList.map( (orgType) => (<OrganizationType key={orgType.id} id={orgType.id} name={orgType.name}/>))}
        </div>
      )
    )
  );
});

export const GetSingleOrganizationType = GetOrganizationType(
  (
    { orgType, loading, error }
  ) => {
    return (
      loading ? <strong>Loading...</strong> : (
        error ? <p style={{color: "#F00"}}>API error</p> : (
          <div>
            <OrganizationType id={orgType.id} name={orgType.name}/>
          </div>
        )
      )
    );
  }
);

class App extends React.Component {

  state = {
    getOneOrganizationTypeId: null,
    setOneOrganizationTypeId: null
  };

  // Runs every time the input field changes
  getOrganizationTypeById = (event) => {
    this.setState({setOneOrganizationTypeId: parseInt(event.target.value, 10)});
  };

  // Runs when "submit" is selected
  stopRefresh = (event) => {
    // Sets the value to query to the current value of the input field
    this.setState({getOneOrganizationTypeId: this.state.setOneOrganizationTypeId});
    event.preventDefault();
  };

  render() {
    const {getOneOrganizationTypeId} = this.state;
    return (
      <div>
        <h2>List of all organizationTypes: </h2>
        <br/>
        <OrganizationTypeList/>
        <br/>
        <h2>Get OrganizationType by Id: </h2>
        <br/>
        <OrganizationTypeField setOrganizationType={this.getOrganizationTypeById} onSubmitAction={this.stopRefresh}/>
        {getOneOrganizationTypeId ? <GetSingleOrganizationType orgTypeId={getOneOrganizationTypeId}/> : <div>Enter a value</div>}
      </div>
    );
  }
}

export default App;

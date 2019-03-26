/**
 * This exports a React element which displays a list of all Organization Types
 *
 * @package: REA app
 * @author:  Ryan Guinn <guinnrd@msoe.edu>
 * @since:   2018-02-02
 */

import * as React from "react";
import "./api.css"
import GetOrganizationTypes from "../../queries/OrganizationType/getAllOrganizationTypes";

export const OrganizationType = (props) => {
  return(
    <div>
      <div>id: {props.id}</div>
      <div>name: {props.name}</div>
      <br/>
    </div>
  );
};

export const OrganizationTypeList = GetOrganizationTypes(({ orgTypeList, loading, error}) => {
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

class App extends React.Component {
  render() {
    return (
      <div>
        <h2>List of all organizationTypes: </h2>
        <br/>
        <OrganizationTypeList/>
      </div>
    );
  }
}

export default App;

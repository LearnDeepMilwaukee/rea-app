/**
 * This exports a React element which displays a list of all organizations,
 * and provides a section to select a single organization out of that list
 *
 * @package: REA app
 * @author:  Steven Fontaine <fontainesw@msoe.edu>
 * @since:   2018-02-08
 */

import * as React from "react";
import "./modifyOrg.css";
import { GetSingleOrganization, GetAllOrganizations } from "../Api/organization";
import { GetMyAgent, GetSingleAgent } from "../Api/agent";

const OrganizationField = (props) => {
  return(
    <div>
      <form onSubmit={props.onSubmitAction}>
        Enter an Id: <input type="text" name="value" onChange={props.setOrganization}/>
        <input type="submit" value="query"/>
      </form>
    </div>
  );
};

export const OrganizationForm = (props) => {
  let organization = props.organization;
  console.log(organization);
  return(
    <div>
      <form>
        <input type="text" name="orgName" value={organization.name}/> <br/>
        <input type="text" name="orgType" value="ac"/> <br/>
        <input type="text" name="orgImg" value="te"/> <br/>
        <input type="text" name="orgNote" value="mp"/> <br/>
        <br/>
        <input type="submit" value="Submit Changes"/>
      </form>
    </div>
  );
};

class App extends React.Component {

  state = {
    getOneOrganizationId: null,
    setOneOrganizationId: null
  };

  // Runs every time the input field changes
  getOrganizationById = (event) => {
    this.setState({setOneOrganizationId: parseInt(event.target.value, 10)});
  };

  // Runs when "submit" is selected
  stopRefresh = (event) => {
    // Sets the value to query to the current value of the input field
    this.setState({getOneOrganizationId: this.state.setOneOrganizationId});
    event.preventDefault();
  };

  render() {
    const {getOneOrganizationId} = this.state;
    let orgId = this.props.params.id;
    return (
      <div>
        Current Org Id is: {orgId}
        <OrganizationForm organization={orgId}/>
        <br/>
        <OrganizationField setOrganization={this.getOrganizationById} onSubmitAction={this.stopRefresh}/>
        {
          getOneOrganizationId ?
            <GetSingleOrganization organizationId={getOneOrganizationId}/> :
            <div>Enter a value</div>
        }
      </div>
    );
  }
}

export default App;

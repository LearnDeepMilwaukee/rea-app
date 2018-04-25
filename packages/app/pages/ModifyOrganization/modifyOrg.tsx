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
import { GetMyAgent, GetSingleAgent } from "../Api/agent";
import getOrganizationById from "../../../ui-bindings/Organization/getOrganizationById";

export const OrganizationForm = getOrganizationById(({ organization, loading, error }) => {
  if (loading) {
    return (
      <strong>Loading...</strong>
    );
  } else if (error) {
    return (
      <p style={{color: "#F00"}}>API error</p>
    );
  } else {
    console.log(organization);
    return (
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
  }
});

class App extends React.Component {
  render() {
    let orgId = this.props.params.id;
    return (
      <div>
        Current Org Id is: {orgId}
        <OrganizationForm organization={orgId}/>
        <br/>
      </div>
    );
  }
}

export default App;

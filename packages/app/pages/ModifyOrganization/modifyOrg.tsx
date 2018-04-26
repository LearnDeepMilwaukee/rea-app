/**
 * This exports a React element which displays a list of all organizations,
 * and provides a section to select a single organization out of that list
 *
 * @package: REA app
 * @author:  Nicholas Roth <Lou3797>
 * @version: 2018.4.25
 * @since:   4/25/2018
 */

import * as React from "react";
import "./modifyOrg.css";
import getOrganizationById from "../../../ui-bindings/Organization/getOrganizationById";
import { ValidatePageLoaded, ValidateLoadedPage } from "../Common/common";

export const OrganizationForm = getOrganizationById(({ organization, loading, error }) => {

  console.log(organization);
  let page = (
    <div>
      <form>
        <input type="text" name="orgName" defaultValue="test"/> <br/>
        <input type="text" name="orgType" defaultValue="test"/> <br/>
        <input type="text" name="orgImage" defaultValue="test"/> <br/>
        <input type="text" name="orgNote" defaultValue="test"/> <br/>
        <br/>
        <input type="submit" value="Submit Changes"/>
      </form>
    </div>
  );
  return ValidateLoadedPage(page, loading, error);

  /*
  if (loading) {
    return (
      <strong>Loading...</strong>
    );
  } else if (error) {
    return (
      <p style={{color: "#F00"}}>API error</p>
    );
  } else {
    //console.log(organization);
    return (
      <div>
        <form>
          <input type="text" name="orgName" defaultValue={organization.name}/> <br/>
          <input type="text" name="orgType" defaultValue={organization.type}/> <br/>
          <input type="text" name="orgImage" defaultValue={organization.image}/> <br/>
          <input type="text" name="orgNote" defaultValue={organization.note}/> <br/>
          <br/>
          <input type="submit" value="Submit Changes"/>
        </form>
      </div>
    );
  }
  */
});

class App extends React.Component {
  render() {
    let orgId = this.props.params.id;
    return (
      <div>
        Current Org Id is: {orgId}
        <OrganizationForm organizationId={orgId}/>
        <br/>
      </div>
    );
  }
}

export default App;

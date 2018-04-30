/**
 * This page displays the current information for an Organization in editable text fields. They can edit the
 * information to their satisfaction and then submit their changes to update the Organization.
 *
 * @package: REA app
 * @author:  Nicholas Roth <Lou3797>
 * @version: 2018.4.25
 * @since:   4/25/2018
 */

import * as React from "react";
import "./modifyOrg.css";
import getOrganizationById from "../../../ui-bindings/Organization/getOrganizationById";
import { validatePageLoaded, test } from "../Common/common";

export const OrganizationForm = getOrganizationById(({ organization, loading, error }) => {
  console.log("Logging ORG");
  console.log(organization);

  return(
    <div>
      <form>
        <input type="text" name="orgName" defaultValue="Test"/> <br/>
        <br/>
        <input type="submit" value="Submit Changes"/>
      </form>
    </div>
  )

  /*
  if (temp[0]) {
    return (
      temp[1]
    );
  } else {
    return (
      {}

    );
  }
        <input type="text" name="orgName" defaultValue={organization.name}/> <br/>
        <input type="text" name="orgType" defaultValue={organization.type}/> <br/>
        <input type="text" name="orgImage" defaultValue={organization.image}/> <br/>
        <input type="text" name="orgNote" defaultValue={organization.note}/> <br/>

  /*
  let page = (
    <div>
      <form>
        <input type="text" name="orgName" defaultValue={organization.name}/> <br/>
        <input type="text" name="orgType" defaultValue="test"/> <br/>
        <input type="text" name="orgImage" defaultValue="test"/> <br/>
        <input type="text" name="orgNote" defaultValue="test"/> <br/>
        <br/>
        <input type="submit" value="Submit Changes"/>
      </form>
    </div>
  );
  return validatePageLoaded(page, loading, error);
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

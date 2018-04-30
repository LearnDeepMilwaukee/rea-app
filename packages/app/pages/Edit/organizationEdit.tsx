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
import "./organizationEdit.css";
import getOrganizationById from "../../../ui-bindings/Organization/getOrganizationById";
import { validatePageLoaded, getValidation } from "../Common/common";

export const OrganizationForm = getOrganizationById(({ organization, loading, error }) => {
  console.log(organization);
  let temp = getValidation(loading, error);
  if(temp[0]) {
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
  } else {
    return temp[1];
  }
});

class EditField extends React.Component {
  private state;

  constructor(props) {
    super(props);
    this.state = {
      editMode: false
    }
  }

  render() {
    if(this.state.editMode) {
      return(
        <input type="text" defaultValue="Clicked on"/>
      );
    } else {
      return(
        <span onClick={() => this.doThing()}>Test Text</span>
      );
    }

  }

  private doThing() {
    console.log("Clicked");
    this.state.editMode = true;
  }

}

class App extends React.Component {
  render() {
    let orgId = this.props.params.id;
    return (
      <div>
        Current Org Id is: {orgId}
        <OrganizationForm organizationId={orgId}/>
        <br/>
        <EditField/>
      </div>
    );
  }
}

export default App;

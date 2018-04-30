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
        <strong>Organization Name:</strong> <br/>
        <EditTextField text={organization.name}/>
      </div>
    );
    /*
    <form>
          <input type="text" name="orgName" defaultValue={organization.name}/> <br/>
          <input type="text" name="orgType" defaultValue={organization.type}/> <br/>
          <input type="text" name="orgImage" defaultValue={organization.image}/> <br/>
          <input type="text" name="orgNote" defaultValue={organization.note}/> <br/>
          <br/>
          <input type="submit" value="Submit Changes"/>
    </form>
     */
  } else {
    return temp[1];
  }
});

class EditTextField extends React.Component {
  private state;

  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      text: this.props.text
    };
    this.handleClick = this.handleClick.bind(this);
    this.updateText = this.updateText.bind(this);
  }
  componentDidMount() {
    document.addEventListener('click', this.handleClick);
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick);
  }
  handleClick(e) {
    if (this.node.contains(e.target)) {
      console.log('You clicked INSIDE the component.');
      this.setState({editMode: true});
    } else {
      console.log('You clicked OUTSIDE the component.');
      this.setState({editMode: false});
    }
  }

  render() {
    if(this.state.editMode) {
      return(
        <span ref={node => this.node = node}>
        <input type="text" defaultValue={this.state.text} onChange={this.updateText}/>
        </span>
      );
    } else {
      return(
        <span ref={node => this.node = node}>{this.state.text}</span>
      );
    }

  }

  updateText(e) {
    console.log("event: " + e.target.value);
    this.setState({text: e.target.value});
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
      </div>
    );
  }
}

export default App;

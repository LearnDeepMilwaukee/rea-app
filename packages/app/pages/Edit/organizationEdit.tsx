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

const OrganizationForm = getOrganizationById(({ organization, loading, error }) => {
  //console.log(organization);
  let temp = getValidation(loading, error);
  if(temp[0]) {
    return (
      <EditForm organization={organization}/>
    );
  } else {
    return temp[1];
  }
});

class EditForm extends React.Component {
  private state;

  constructor(props) {
    super(props);
    this.state = {
      organization: this.props.organization,
      name: this.props.organization.name,
      type: this.props.organization.type,
      image: this.props.organization.image,
      note: this.props.organization.note
    };
  }

  updateField = (key, val) => {
    this.setState({[key]: val});
    console.log("this.props." + key + " is now " + this.state[key]);
  };

  render() {
    let organization = this.state.organization;
    return(
      <div>
        <strong>Organization Name:</strong> <br/>
        <EditTextField text={organization.name} key={"name"} callback={this.updateField}/> <br/>
        <strong>Organization Type:</strong> <br/>
        <EditTextField text={organization.type} key={"type"} callback={this.updateField}/> <br/>
        <strong>Organization Image:</strong> <br/>
        <EditTextField text={organization.image} key={"image"} callback={this.updateField}/> <br/>
        <strong>Notes:</strong> <br/>
        <EditTextField text={organization.note} key={"note"} callback={this.updateField}/> <br/>
        <br/>
        <SubmitInput/>
      </div>
    );
  }
}

class EditTextField extends React.Component {
  private state;

  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      text: this.props.text,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    document.addEventListener('click', this.handleClick);
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick);
  }
  handleClick(e) {
    if (this.node.contains(e.target)) {
      console.log('Clicked in component');
      this.setEditMode(true);
    } else {
      console.log('Clicked out of component');
      this.setEditMode(false);
    }
  }
  setEditMode(bool) {
    this.setState({editMode: bool});
  }
  revertChanges() {
    console.log("Changes reverted");
    this.setEditMode(false);
  }
  updateText = (e) => {
    console.log("Updated text: " + e.target.value);
    this.setState({text: e.target.value});
    this.props.callback(this.props.key, e.target.value);
  }
  render() {
    let tempText = (this.state.text == "") ? "<empty>" : this.state.text;
    if(this.state.editMode) {
      return(
        <span ref={node => this.node = node}>
        <input type="text" defaultValue={this.state.text} onChange={this.updateText}/>
         <button onClick={() => this.revertChanges()}>[x]</button>
        </span>
      );
    } else {
      return(
        <span ref={node => this.node = node}>{tempText}</span>
      );
    }

  }

}

class SubmitInput extends React.Component {
  private state;
  constructor(props) {
    super(props);
    this.state = {};
  }

  createMutation() {
    console.log("Sending mutation")
  }

  render() {
    return (
      <input type="submit" name="doMutation" value="Submit Changes" onClick={() => this.createMutation()}/>
    )
  }
}

class App extends React.Component {
  render() {
    let orgId = this.props.params.id;
    return (
      <div>
        Current Org Id is: {orgId} <br/>
        <OrganizationForm organizationId={orgId}/>
        <br/>
      </div>
    );
  }
}

export default App;

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

/**
 * This page displays the current information for an Organization in editable text fields. They can edit the
 * information to their satisfaction and then submit their changes to update the Organization.
 *
 * @package: REA app
 * @author:  Nicholas Roth <Lou3797>
 * @version: 2018.4.30
 * @since:   4/25/2018
 */

import * as React from "react";
import "./organizationEdit.css";
import getOrganizationById from "../../../ui-bindings/Organization/getOrganizationById";
import { validatePageLoaded, getValidation } from "../Common/common";

/**
 * Creates the EditForm for a given Organization.
 */
const OrganizationForm = getOrganizationById(({ organization, loading, error }) => {
  let temp = getValidation(loading, error);
  if(temp[0]) {
    return (
      <EditForm organization={organization}/>
    );
  } else {
    return temp[1];
  }
});

/**
 * A component that encapsulates the entire edit form for an organization. Creates the individual
 * text fields and submit button. Has local copies of the organization fields that get changed by the
 * fields via callbacks and then sent to the mutation.
 */
class EditForm extends React.Component {
  private state;

  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      name: this.props.organization.name,
      type: this.props.organization.type,
      image: this.props.organization.image,
      note: this.props.organization.note
    };
  }

  /**
   * Updates a given field in the state to the given value
   * @param i The field being modified
   * @param v The value to set it to
   */
  updateStateField = (i, v) => {
    this.setState({[i]: v});
    //console.log("this.props." + i + " is now " + this.state[i]);
  };

  /**
   * Performs the mutation
   */
  executeMutation = () => {
    console.log("Performing mutation\n"+this.state.name+"\n"+this.state.type+"\n"+this.state.image+"\n"+this.state.note);
  };

  setEditMode = (bool) => {
    this.setState({editMode: bool});
  };

  getEditMode = () => {
    return this.state.editMode;
  };

  render() {
    return(
      <div>
        <strong>Organization Name:</strong> <br/>
        <EditTextField text={this.state.name} val={"name"} callback={this.updateStateField} setEditMode={this.setEditMode}/> <br/>
        <strong>Organization Type:</strong> <br/>
        <EditTextField text={this.state.type} val={"type"} callback={this.updateStateField} setEditMode={this.setEditMode}/> <br/>
        <strong>Organization Image:</strong> <br/>
        <EditTextField text={this.state.image} val={"image"} callback={this.updateStateField} setEditMode={this.setEditMode}/> <br/>
        <strong>Notes:</strong> <br/>
        <EditTextField text={this.state.note} val={"note"} callback={this.updateStateField} setEditMode={this.setEditMode}/> <br/>
        <br/>
        <SubmitInput callback={this.executeMutation} checkMode={this.getEditMode}/>
      </div>
    );
  }
}

/**
 * A component for a click-to-edit text field. Acts as a regular span element until clicked on, at which point it
 * instead renders a text input field. The input can be canceled to revert back to the previous data.
 */
class EditTextField extends React.Component {
  private state;

  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      text: this.props.text,
      safeText: this.props.text
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick);
  }

  handleClick = (e) => {
    if (this.node.contains(e.target)) {
      //Component was clicked
      this.setEditMode(true);
    } else {
      //Component was not clicked
      this.setEditMode(false);
    }
  };

  setEditMode(bool) {
    if(!bool) {
      if(this.state.text != this.state.safeText) {
        this.setState({safeText: this.state.text});
        this.props.callback(this.props.val, this.state.text);
      }
    }
    this.setState({editMode: bool});
  }

  /**
   * Reverts changes done by resetting the current text to the saved text in the state.
   */
  revertChanges() {
    //console.log("Changes reverted");
    this.setState({text: this.state.safeText});
    this.props.callback(this.props.val, this.state.text);
    this.setEditMode(false);
  }

  /**
   * Called whenever the text field is changed. Sets the current text value to the field's value and updates
   * the respective value of the parent state.
   * @param e The event
   */
  updateText = (e) => {
    this.setState({text: e.target.value});
    this.props.callback(this.props.val, e.target.value);
  };

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

/**
 * The submit button for the edit mutation.
 */
class SubmitInput extends React.Component {
  private state;
  constructor(props) {
    super(props);
    this.state = {};
  }

  submit() {
    this.props.callback();
  }

  render() {
    return (
      <input type="submit" name="doMutation" value="Submit Changes" onClick={() => this.submit()}/>
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

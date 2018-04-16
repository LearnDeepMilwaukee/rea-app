/**
 * @author Connor Hibbs <hibbscm@msoe.edu>
 * @version 1.0.0
 */

import * as React from "react";
import * as EmailValidator from "email-validator";
import { Link } from "react-router";

/**
 * This component is responsible for getting the type of organization
 * that is registering from the user. It contains all of the different
 * types of organizations, as well as the logic to determine which one
 * is selected.
 *
 * It passes the updated organization to the parent as soon as it changes,
 * so the parent is always up to date on the type of organization being
 * registered.
 */
class OrganizationTypeSection extends React.Component {

  private organizationType: string;

  // A shorter version of the update function to fit on one line
  radioFunction = (event) => this.onOrganizationTypeUpdate(event.target.value);

  // Called every time the organization type changes
  // Saves a local copy and sends it to the parent
  onOrganizationTypeUpdate = (orgType) => {
    this.organizationType = orgType;
    this.props.saveOrgType(orgType);
  };

  // Draws all of the components on the screen
  render() {
    return (
      <div>
        OrganizationType:<br/>
        <input type="radio" name="userType" value="Cooperative" onChange={this.radioFunction}/>Cooperative
        <input type="radio" name="userType" value="Projects" onChange={this.radioFunction}/>Projects
        <input type="radio" name="userType" value="Organizations" onChange={this.radioFunction}/>Organizations
        <input type="radio" name="userType" value="Groups" onChange={this.radioFunction}/>Groups
        <br/><br/>
      </div>
    );
  }
}

/**
 * This component has all of the components required to
 * get the organization name from the user, and validate it.
 *
 * It passes the name back to the parent every time it is updated
 * instead of waiting for the parent to ask for it, so the parent is
 * always up to date. If the name is invalid, it passes back undefined
 * so the parent knows to wait before continuing with registration.
 */
class OrganizationNameSection extends React.Component {

  // Local copy of the text in the field
  private organizationName: string = "";

  // Called every time the name is updated
  onNameUpdate = (name) => {
    this.organizationName = name;
    this.validateName();
  };

  // Validates the organiztion name.
  // Currently just checks the length exists, but could easily
  // be adapted to check for more conditions
  validateName = () => {
    let nameValid = this.organizationName.length > 0;
    this.props.saveOrgName(nameValid ? this.organizationName : undefined);
  };

  // Draws the components on the screen
  render() {
    return (
      <div>
        Organization Name:<br/>
        <input type="text" onChange={(event) => this.onNameUpdate(event.target.value)}/>
        <br/><br/>
      </div>
    );
  }
}

/**
 * The password component has all of the components required to get
 * passwords from the user, and the logic to validate the password.
 *
 * Instead of waiting to be asked for the password, this component
 * passes the password back to the parent every time it changes, so the
 * parent is always up to date. If the password provided is invalid or
 * does not match the confirm password, it returns undefined so the parent
 * knows not to advance with the registration.
 */
class PasswordSection extends React.Component {

  // local object variables with current values of fields
  private password: string = "";
  private confirmPassword: string = "";

  private state = {
    passwordValid: true,
    passwordsMatch: true
  };

  // Called every time the password field changes.
  // Updates object variable and checks validity
  onPasswordUpdate = (password) => {
    this.password = password;
    this.checkPasswordValid();
    this.checkPasswordsMatch();
  };

  // Called every time the confirm password field changes
  // Updates object variable and checks if the passwords match
  onConfirmPasswordUpdate = (confirmPassword) => {
    this.confirmPassword = confirmPassword;
    this.checkPasswordsMatch();
  };

  // Checks if the password is valid
  // Currently only checks length, but could be expanded for new rules
  checkPasswordValid = () => {
    if (this.password !== "") {
      this.setState({passwordValid: this.password.length >= 8});
    }
  };

  // Checks to make sure both of the passwords are the same
  // It updates the password in the parent's state with either
  //     <the current password> if it is valid and matches
  //     <undefined> if the password is invalid or different
  checkPasswordsMatch = () => {
    let passwordsMatch = (this.password === this.confirmPassword);
    this.props.savePassword(passwordsMatch ? this.password : undefined);

    // only update the field if there is text (hides the message before needed)
    if (this.confirmPassword !== "") {
      this.setState({passwordsMatch});
    }
  };

  // renders the password section on the screen
  render() {
    return (
      <div>
        Password:<br/>
        <input type="password" onChange={(event) => this.onPasswordUpdate(event.target.value)} />
        {!this.state.passwordValid ? <p>Passwords Not Long Enough</p> : null}
        <br/><br/>

        Confirm Password:<br/>
        <input type="password" onChange={(event) => this.onConfirmPasswordUpdate(event.target.value)}/>
        {!this.state.passwordsMatch ? <p>Passwords Do Not Match</p> : null}
        <br/><br/>
      </div>
    );
  }
}

/**
 * The username section contains all of the components required to get a
 * username from the user. It also contains the logic to validate the username.
 *
 * Currently the username is only checked for length, but after it is connected
 * to the back end it will check if that username already exists as well. Additional
 * checks can easily be added in the validateUsername() function.
 *
 * Instead of waiting for the parent to ask for the username, this component passes
 * it back to the parent every time it is changed. It passes back undefined if the
 * username is invalid so the parent knows not to continue with registration.
 */
class UsernameSection extends React.Component {

  // local copy of the value in the field
  private username = "";

  // Called every time the field is updated
  // Saves the value locally and then checks if it is valid
  onUsernameUpdate = (username) => {
    this.username = username;
    this.validateUsername();
  };

  // Validates the current username
  // Currently only checks for length, but will check
  // against the backend in the future.
  validateUsername = () => {
    // TODO validate against the backend to check for existing user
    let usernameValid = this.username.length > 0;
    this.props.saveUsername(usernameValid ? this.username : undefined);
  };

  // Renders all of the components on the screen
  render() {
    return(
      <div>
        Username:<br/>
        <input type="text" onChange={(event) => this.onUsernameUpdate(event.target.value)}/>
        <br/><br/>
      </div>
    );
  }
}

/**
 * The email component contains all of the components required to get
 * an email address from the user. It contains the logic to validate the
 * email address as well. Currently it only checks to see if the email
 * address is in a valid form, but in the future it will also check
 * in the backend to see if the email has already been used.
 *
 * Instead of waiting for the parent to ask for the email address, this
 * component passes the email address to the parent every time it is changed.
 * It passes back a value of undefined if the email address is not valid
 * so the parent knows not to continue with registration.
 */
class EmailSection extends React.Component {

  // local copy of the value in the field
  private email: string = "";

  private state = {
    validEmail: true
  };

  // Called every time the email address changes
  // Updates the local variable and checks for validity
  onEmailUpdate = (email) => {
    this.email = email;
    this.validateEmail();
  };

  // Checks to see if the current email address is valid
  // Currently only checks to see if the email address is in the correct form,
  // but in the future this will also check against the backend to make sure
  // the email address is not already being used with another account
  validateEmail = () => {
    // TODO validate email against backend to check for existing email
    let validEmail = EmailValidator.validate(this.email);
    this.props.saveEmail(validEmail ? this.email : undefined);

    if (this.email !== "") {
      this.setState({validEmail});
    }
  };

  // Renders all of the components on the screen
  render() {
    return (
      <div>
        Email:<br/>
        <input type="text" onChange={(event) => this.onEmailUpdate(event.target.value)}/>
        {!this.state.validEmail ? <p>Email is not in a valid form</p> : null}
        <br/><br/>
      </div>
    );
  }
}

/**
 * This is the main component for the page. It combines all of the
 * different registration elements together on the screen and maintains
 * the current value of each sectino in the state (or undefined if they are not
 * ready). \
 *
 * This component is responsible for checking that all components are ready
 * and sending the request to the backend API. It does not display any error messages
 * specific to what is missing, it only knows if something needs additional attention
 * or not.
 */
class Registration extends React.Component {

  private state = {
    orgType: undefined,
    orgName: undefined,
    username: undefined,
    email: undefined,
    password: undefined
  };

  getRegistrationJSON = (event) => {
    event.preventDefault();

    let allValid = this.state.orgType
                && this.state.orgName
                && this.state.username
                && this.state.email
                && this.state.password;

    if (!allValid) {
      alert("Please correct information and try again");
      return;
    }

    console.log("Organization Type:", this.state.orgType);
    console.log("Organization Name:", this.state.orgName);
    console.log("Username:", this.state.username);
    console.log("Email:", this.state.email);
    console.log("Password:", this.state.password);
  };

  // Draws all of the components on the screen
  render() {
    return (
      <div>
        <h1>Organization Registeration</h1>
        <Link to="/register/individual">or <u>register an Individual instead</u></Link>

        <form id="form" onSubmit={this.getRegistrationJSON}>

          <OrganizationTypeSection saveOrgType={(orgType) => this.setState({orgType})}/>
          <OrganizationNameSection saveOrgName={(orgName) => this.setState({orgName})}/>
          <UsernameSection saveUsername={(username) => this.setState({username})}/>
          <EmailSection saveEmail={(email) => this.setState({email})}/>
          <PasswordSection savePassword={(password) => this.setState({password})}/>

          <input type="submit" id="submit" value="Register"/>
        </form>
      </div>
    );
  }
}

export default Registration;

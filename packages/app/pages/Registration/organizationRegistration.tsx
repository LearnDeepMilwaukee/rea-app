/**
 * @author Connor Hibbs <hibbscm@msoe.edu>
 * @version 1.0.0
 * @since 29 April 2018
 */

import * as React from "react";
import * as Router from "react-router";
import * as Modal from "react-modal";
import * as EmailValidator from "email-validator";
import { Link } from "react-router";
import createOrganization from "../../../ui-bindings/Organization/CreateOrganization.tsx";
import * as Phone from "phone";
// import allOrgsClass from "../../../ui-bindings/Organization/allOrgsClass.tsx";

/**
 * This popup appears after a successful registration and offers to
 * take the user to the edit page for more information, or
 * to redirect them to their created organization to see the finished page
 */
class Popup extends React.Component {

  private state = {
    showModal: (this.props.orgId !== undefined)
  };

  /** Custom styles for the wizard modal (CSS equiv) */
  private wizardModalStyle = {
    overlay : {
      position          : "fixed",
      top               : 0,
      left              : 0,
      right             : 0,
      bottom            : 0,
      backgroundColor   : "rgba(255, 255, 255, 0.75)"
    },
    content : {
      position                   : "absolute",
      top                        : "50%",
      left                       : "50%",
      width                      : "50%",
      leftMargin                 : "auto",
      rightMargin                : "auto",
      transform                  : "translate(-50%, -50%)",
      border                     : "1px solid #ccc",
      background                 : "#fff",
      overflow                   : "auto",
      WebkitOverflowScrolling    : "touch",
      borderRadius               : "4px",
      outline                    : "none",
      padding                    : "20px"
    }
  };

  render() {
    let id = this.props.orgId;
    let url = "/projects/" + id;

    return (
      <div>
        <Modal
          isOpen={id}
          style={this.wizardModalStyle}
          onRequestClose={() => this.setState({showModal: false})}
        >
          <div>
            <div style={{display: "block", textAlign: "right"}}>
              <button style={{textAlign: "right"}}><Link to={url}>[ X ]</Link></button>
            </div>

            <h1>You're All Set!</h1>
            <p>You have successfully registered your organization.
              Now you can add more details like giving your organization a picture,
              or adding some notes about what your organization does.</p>

            <button><Link to={url}>No Thanks, Not Now</Link></button>
            <button><Link to={url + "/edit"}>Take Me There!</Link></button>
          </div>
        </Modal>

      </div>
    );
  }
}

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

  private organizationTypes = [
    "For-profit Company",
    "Library",
    "Makerspace",
    "Network",
    "Non-profit Company",
    "Organization",
    "School",
    "School District"
  ];

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
        OrganizationType*:<br/>
        {
          this.organizationTypes.map((classification) => (
            <div>
              <input type="radio" name="userType" value={classification} onChange={this.radioFunction}/>
              {classification}
            </div>
          ))
        }
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

  private state = {
    nameValid: true
  };

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
    this.setState({nameValid});
  };

  // Draws the components on the screen
  render() {
    return (
      <div>
        Organization Name*:<br/>
        <input type="text" onChange={(event) => this.onNameUpdate(event.target.value)}/>
        {!this.state.nameValid ? <p>Name is required</p> : null}
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

class PhoneSection extends React.Component {

  // local copy of the value in the field
  private phoneNumber = "";

  // Called every time the field is updated
  // Saves the value locally and then checks if it is valid
  onPhoneUpdate = (phoneNumber) => {
    this.phoneNumber = phoneNumber;
    this.validatePhoneNumber();
  };

  // Validates the current phone number
  // Uses the NPM Phone library to convert the number to
  // a standard format for phone numbers as well as validate
  validatePhoneNumber = () => {
    let valid = Phone(this.phoneNumber, "USA");
    let phoneValid = valid !== [];
    // send the 0th item in the array (standardized phone number) instead of value in field
    this.props.savePhoneNumber(phoneValid ? valid[0] : undefined);
  };

  // Renders all of the components on the screen
  render() {
    return(
      <div>
        Phone Number:<br/>
        <input type="text" onChange={(event) => this.onPhoneUpdate(event.target.value)}/>
        <br/><br/>
      </div>
    );
  }

}

/**
 * This component has all of the components required to
 * get the organization location from the user, and validate it.
 *
 * It passes the location back to the parent every time it is updated
 * instead of waiting for the parent to ask for it, so the parent is
 * always up to date. If the location is invalid, it passes back undefined
 * so the parent knows to wait before continuing with registration.
 */
class LocationSection extends React.Component {

  private state = {
    locationValid: true
  };

  // Local copy of the text in the field
  private organizationLocation: string = "";

  // Called every time the location is updated
  onLocationUpdate = (location) => {
    this.organizationLocation = location;
    this.validateLocation();
  };

  // Validates the organization location.
  // Currently just checks the length exists, but could easily
  // be adapted to check for more conditions
  validateLocation = () => {
    let locationValid = this.organizationLocation.length > 0;
    this.props.saveLocation(locationValid ? this.organizationLocation : undefined);
    this.setState({locationValid});
  };

  // Draws the components on the screen
  render() {
    return (
      <div>
        Organization Location*:<br/>
        <input type="text" onChange={(event) => this.onLocationUpdate(event.target.value)}/>
        {!this.state.locationValid ? <p>Location is required</p> : null}
        <br/><br/>
      </div>
    );
  }
}


/**
 * This is the main component for the page. It combines all of the
 * different registration elements together on the screen and maintains
 * the current value of each sectino in the state (or undefined if they are not
 * ready).
 *
 * This component is responsible for checking that all components are ready
 * and sending the request to the backend API. It does not display any error messages
 * specific to what is missing, it only knows if something needs additional attention
 * or not.
 */
class Registration extends React.Component {

  private state = {
    orgId: undefined,

    orgType: undefined,
    orgName: undefined,
    username: undefined,
    email: undefined,
    password: undefined,
    phoneNumber: undefined,
    location: undefined,
    newOrganization: undefined
  };

  getRegistrationJSON = (event) => {
    event.preventDefault();

    let allValid = this.state.orgType
      && this.state.orgName
      && this.state.username
      && this.state.phoneNumber
      && this.state.location
      && this.state.email
      && this.state.password;

    if (!allValid) {
      alert("Please correct information and try again");
      return;
    }

    let variables = {
      type: this.state.orgType,
      name: this.state.orgName
    };
    variables.token = this.props.token; // add the token in afterwards

    // perform the mutation
    this.props.mutate({ variables }).then( (response) => {
      let newOrganization = response.data.createOrganization.organization;

      if (newOrganization) {
        this.setState({newOrganization: newOrganization});
      }
    }).catch( (error) => {
      console.log(error);
    });
  };

  // Draws all of the components on the screen
  render() {
    return (
      <div>
        <h1>Organization Registeration</h1>
        <Link to="/register/individual">or <u>register an Individual instead</u></Link>

        <Popup orgId={this.state.newOrganization ? this.state.newOrganization.id : undefined}/>

        <form id="form" onSubmit={this.getRegistrationJSON}>

          <OrganizationTypeSection saveOrgType={(orgType) => this.setState({orgType})}/>
          <OrganizationNameSection saveOrgName={(orgName) => this.setState({orgName})}/>
          <PhoneSection savePhoneNumber={(phoneNumber) => this.setState({phoneNumber})}/>
          <LocationSection saveLocation={(location) => this.setState({location})}/>
          <UsernameSection saveUsername={(username) => this.setState({username})}/>
          <EmailSection saveEmail={(email) => this.setState({email})}/>
          <PasswordSection savePassword={(password) => this.setState({password})}/>

          *required <br/>
          <input type="submit" id="submit" value="Register"/>
        </form>
      </div>
    );
  }
}

export default createOrganization(Registration);

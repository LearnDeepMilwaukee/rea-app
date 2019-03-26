/**
 * @author Michael Larson <larsonme@msoe.edu>
 * @version 1.0.0
 */

import * as React from "react";
import createUserPerson from "../../queries/User/CreateUserPerson";
import userEmailExist from "../../queries/User/UserEmailExists";
import * as EmailValidator from "email-validator";
import { adminToken } from "../../apiKeys.json";
import "./individualRegistration.css";

/**
 * This data structure stores the information that is entered by
 * the User into the fields on the page, and is sent to the
 * mutation to create a new User account.
 */
let userInformation = {
     email: "",
     pswd: "",
     username: "",
     name: "",
     image: "",
     userRan: false,
     allValid: false
};

/**
 * The email field on the page
 */
const EmailFieldConst = (props) => {
  return(
    <div>
        <span>
          <text>Email</text>
          <text className="required">*</text><input className="emailBox" type="text" name="email" onChange={(event) => props.saveEmail(event.target.value)}/>
        </span>
    </div>
  );
};

/**
 * The username field on the page
 */
class UsernameField extends React.Component {
  public state = {
    value: ""
  };

  /**
   * This executes every time the text in the field is modified.  This
   * grabs the value from the input field and stores it in the userInformation variable
   * to be used with the query
   * @param value: the value of the input field
   */
  onChange = (value) => {
    this.setState({value: value});
    this.props.saveUsername(value);
  };

  render() {
    return (
      <div>
        <text>Username</text>
        <text className="required">*</text><input className="usernameBox" type="text" name="username" onChange={(event) => this.onChange(event.target.value)}/>

      </div>
    );
  }
}

/**
 * the password field on the page
 */
class PasswordField extends React.Component {
  private state = {
    passwordOne: undefined,
    passwordTwo: undefined
  };

  /**
   * This executes every time the text in the first password field is modified.  This
   * grabs the value from the input field and stores it in the userInformation variable
   * to be used with the query
   * @param value: the value of the input field
   */
  updateFirstPassword = (value) => {
    this.setState({passwordOne: value}, () => {
      if (this.state.passwordOne === this.state.passwordTwo) {
        this.props.savePassword(value);
      } else {
        this.props.savePassword("");
      }
    });

  };

  /**
   * This executes every time the text in the second password field is modified.  This
   * grabs the value from the input field and stores it in the userInformation variable
   * to be used with the query
   * @param value: the value of the input field
   */
  updateSecondPassword = (value) => {
    this.setState({passwordTwo: value}, () => {
      if (this.state.passwordOne === this.state.passwordTwo) {
        this.props.savePassword(value);
      } else {
        this.props.savePassword("");
      }
    });
  };

  render() {
    return (
      <div>
        <text>Password</text>
        <text className="required">*</text><input className="passwordBox" type="password" name="password" onChange={(event) => this.updateFirstPassword(event.target.value)} />

        <br/>
        <br/>
        <text>Confirm Password</text>
        <text className="required">*</text><input className="confirmPasswordBox" type="password" name="password" onChange={(event) => this.updateSecondPassword(event.target.value)}/>

        <br/>
      </div>
    );
  }
}

/**
 * Verifies if a User exists in the database with that email.
 * If the email is unique, create a new User.
 * @type {React.ComponentClass<{}>}
 */
const EmailExistsQuery = userEmailExist(({emailExists, loading, error}) => {
  if (loading) {
    console.log("Loading " + loading);
    return     <p/>;
  } else if (error) {
    console.log("Error: " + error);
    return <h3>Error!</h3>;
  }
  if (emailExists === false) {
    return <CreateUser userEntered={userInformation.userRan} allValid={userInformation.allValid}
                       username={userInformation.username} email={userInformation.email}
                       pswd={userInformation.pswd} name={userInformation.name} image={userInformation.image}
            />
    } else if(emailExists === true) {
      alert("An account with this email already exists");
      return <p/>;
    }
});

/**
 * Creates a new User in the database
 * @type {React.ComponentClass<{}>}
 */
const CreateUserQuery = createUserPerson(({createUserPersonVar, error}) => {

  if (error) {
    if (error.message.indexOf("username") !== -1) {
      alert("This username is already in use");
    }
  } else if (createUserPersonVar != null) {
    return <p>{createUserPersonVar.split(',')[0]}</p>
  } else {
    return <p>{createUserPersonVar}</p>;
  }
});

/**
 * Calls the create User query using the values passed in through props
 * @param props contains the infomation to be used in the query
 */
function CreateUser(props) {

  let element;

  if (props.userEntered && props.allValid) {
      element = (
        <CreateUserQuery
          username={props.username}
          email={props.email}
          pswd={props.pswd}
          name={props.name}
          token={adminToken}
          image={props.image}
        />
      );
  }
  return <div>{element}</div>;
}

/**
 * The base element for the User registration page.  This is made up of an EmailFieldConst, UsernameField
 * and PasswordField.  This handles basic validation of the values passed and calls the queries to create
 * a new User.
 */
class IndividualRegistration extends React.Component {
  private state = {
    queryingEmail: "",
    validEmail: false,
  };

  handleClick = (event) => {
    event.preventDefault();

    let message = "";
    if (!EmailValidator.validate(userInformation.email)) {
      message += "Invalid email\n";
    }
    if (userInformation.pswd === "") {
      message += "Passwords do not match\n";
    }
    if (userInformation.username === "") {
      message += "Please enter a username\n";
    }

    if (message !== ""){
      alert(message);
      return;
    } else {
      this.setState({queryingEmail: userInformation.email});
      userInformation.userRan = true;
      userInformation.allValid = true;
    }
  };

  saveEmail = (email) => {
    let valid = EmailValidator.validate(email);
    userInformation.email = (valid ? email : "");
  };

  setNames = (nameParam) => {
    userInformation.username = nameParam;
    userInformation.name = nameParam;
  };

  runEmailExists = () => {
    return <EmailExistsQuery email={this.state.queryingEmail} token={adminToken} allValid={userInformation.allValid}/>
};

  render() {
    return (
      <div>
        <h1>Individual Registration</h1>
        <form id="form" onSubmit={this.handleClick}>

          <UsernameField saveUsername={(nameParam) => this.setNames(nameParam)}/>
          <br/>
          <EmailFieldConst saveEmail={this.saveEmail} email={userInformation.email} />
          <br/>
          <PasswordField savePassword={(passwordParam) => userInformation.pswd = passwordParam}/>

          <br/>
          <input type="submit" id="register" value="Create Account"/>
        </form>
        {this.state.queryingEmail ? this.runEmailExists() : ""}

      </div>
    );
  }
}

export default IndividualRegistration;

/**
 * @author Michael Larson <larsonme@msoe.edu>
 * @version 1.0.0
 */

import * as React from "react";
import createUserPerson from "../../../ui-bindings/user/CreateUserPerson.tsx";
import userEmailExist from "../../../ui-bindings/user/UserEmailExists.tsx";
import * as EmailValidator from "email-validator";
import {adminToken} from "../../../../apiKeys.json"
import * as themeable from 'react-themeable';
import * as theme from "./individualRegistration.scss"

class EmailField extends React.Component {
  private state = {
    valid: true,
    value: ""
  };


  onChange = (value) => {
    let valid = EmailValidator.validate(value);
    this.setState({valid: valid});
    if (!valid) {
      this.setState({value: ""});

      this.props.saveEmail("");
    }
    else {
      this.props.saveEmail(value);

    }


  };

  render() {
    let currentTheme = themeable(theme);
    return (
      <div>
        <span>
          <text>Email</text>
          <text {...currentTheme(3,"required")}>*</text><input {...currentTheme(4,"emailBox")} type="text" name="email" onChange={(event) => this.onChange(event.target.value)}/>
          {!this.state.valid ? "Email is not valid" : ""}</span>
      </div>
    );
  }
}

class UsernameField extends React.Component {
  public state = {
    value: ""
  };


  onChange = (value) => {
    this.setState({value: value});
    this.props.saveUsername(value);

  };

  render() {
    let currentTheme = themeable(theme);
    return (
      <div>
        <text>Username</text>
        <text {...currentTheme(0,"required")}>*</text><input {...currentTheme(5,"usernameBox")} type="text" name="username" onChange={(event) => this.onChange(event.target.value)}/>

      </div>
    );
  }
}

class PasswordField extends React.Component {
  private state = {
    passwordOne: undefined,
    passwordTwo: undefined
  };
  updateFirstPassword = (value) => {
    this.setState({passwordOne: value}, () => {
      if (this.state.passwordOne === this.state.passwordTwo) {
        this.props.savePassword(value);
      }
      else {
        this.props.savePassword("");
      }
    });

  };
  updateSecondPassword = (value) => {
    this.setState({passwordTwo: value}, () => {
      if (this.state.passwordOne === this.state.passwordTwo) {
        this.props.savePassword(value);
      }
      else {
        this.props.savePassword("");
      }
    });
  };

  render() {
    let currentTheme = themeable(theme);
    return (
      <div>
        <text>Password</text>
        <text {...currentTheme(1,"required")}>*</text><input {...currentTheme(6,"passwordBox")} type="password" name="password" onChange={(event) => this.updateFirstPassword(event.target.value)} />

        <br/>
        <br/>
        <text>Confirm Password</text>
        <text {...currentTheme(2,"required")}>*</text><input {...currentTheme(7,"confirmPasswordBox")} type="password" name="password"
               onChange={(event) => this.updateSecondPassword(event.target.value)}/>

        <br/>
      </div>
    );
  }
}

const EmailExistsQuery = userEmailExist(({emailExists, loading, error}) => {

  if (loading) {
    console.log("Loading " + loading);
  } else if (error) {
    console.log("Error: " + error);
    return <h3>ERROR!</h3>;
  }
  return emailExists;

});


function CheckEmail(props) {
  let element;
  if (props.email) {
    element = <EmailExistsQuery email={props.email}
                                token={adminToken}/>;
  }
  return (
    <div>{element}</div>
  );
}

const CreateUserQuery = createUserPerson(({createUserPersonVar, error}) => {

  if (error) {
    if (error.message.indexOf("username") !== -1) {
      alert("This username is already in use");
    }
  }
  else if (createUserPersonVar != null) {
    return <p>{createUserPersonVar.split(',')[0]}</p>
  } else {
    return <p>{createUserPersonVar}</p>;
  }
});


function CreateUser(props) {

  let element;

  if (props.userEntered && !props.emailExists && props.allValid) {
    let emailExistsVariable = <EmailExistsQuery email={props.email} token={adminToken}/>;
    if (!emailExistsVariable) {
      element = <CreateUserQuery username={props.username} email={props.email} pswd={props.pswd}
                                 name={props.name}
                                 token={adminToken}
                                 image={props.image}/>
    }
    else {
      alert("An account with this email already exists");
    }

  }
  return (
    <div>{element}</div>
  );
}


class IndividualRegistration extends React.Component {
  private state = {
    email: "",
    pswd: "",
    username: "",
    name: "",
    image: "",
    userRan: false,
    allValid: false
  };


  handleClick = (event) => {
    event.preventDefault();
    let allValid = this.state.email !== ""
      && this.state.pswd !== ""
      && this.state.username !== "";
    this.setState({userRan: true});
    this.setState({allValid: allValid});

    if (!allValid) {
      alert("Please enter correct information");
      return;
    }
  };


  setNames = (nameParam) => {
    this.state.username = nameParam;
    this.state.name = nameParam;
  };

  render() {
    return (
      <div>
        <h1>Individual Registration</h1>
        <form id="form" onSubmit={this.handleClick}>

          <UsernameField saveUsername={(nameParam) => this.setNames(nameParam)}/>
          <br/>
          <EmailField saveEmail={(emailParam) => this.state.email = emailParam}/>
          <CheckEmail email={this.state.email}/>
          <br/>
          <PasswordField savePassword={(passwordParam) => this.state.pswd = passwordParam}/>
          <CreateUser userEntered={this.state.userRan} allValid={this.state.allValid}
                      username={this.state.username} email={this.state.email}
                      pswd={this.state.pswd} name={this.state.name} image={this.state.image}/>
          <br/>
          <input type="submit" id="register" value="Create Account"/>
        </form>
      </div>
    );
  }
}

export default IndividualRegistration;

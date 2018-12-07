/**
 * @author Michael Larson <larsonme@msoe.edu>
 * @version 1.0.0
 */

import * as React from "react";
import createInactiveUser from "../../../ui-bindings/user/CreateInactiveUser.tsx";
import economicEventById from "../../../ui-bindings/EconomicEvent/getEconomicEventById";

import * as EmailValidator from "email-validator";


class EmailField extends React.Component {
  private state = {
    valid: true,
    value: ""
  };

  validEmail = (email) => {
    let valid = EmailValidator.validate(email);
    this.setState({valid: valid});
    return valid;
  };

  onChange = (value) => {
    //TODO Check if email is already in backend
    if (this.validEmail(value)) {
      this.setState({value: value});
      this.props.saveEmail(value);
    }
  };

  render() {
    return (
      <div>
        Email:*<br/>
        <span>
        <input type="text" name="email" onChange={(event) => this.onChange(event.target.value)}/>
          {!this.state.valid ? "Email is not valid" : ""}</span>
      </div>
    );
  }
}

class UsernameField extends React.Component {
  private state = {
    value: ""
  };


  onChange = (value) => {
    this.setState({value: value});
    this.props.saveUsername(value);

  };

// Have to check to see if this username already exists?
  render() {
    return (
      <div>
        Username*:<br/>
        <input type="text" name="username" onChange={(event) => this.onChange(event.target.value)}/>
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
    });

  };
  updateSecondPassword = (value) => {
    this.setState({passwordTwo: value}, () => {
      if (this.state.passwordOne === this.state.passwordTwo) {
        this.props.savePassword(value);

      }
    });
  };

  render() {
    return (
      <div>
        Password:*<br/>
        <input type="password" name="password" onChange={(event) => this.updateFirstPassword(event.target.value)}/><br/>
        Confirm Password:*<br/>
        <input type="password" name="password"
               onChange={(event) => this.updateSecondPassword(event.target.value)}/><br/>
      </div>
    );
  }
}


// Switch this to economicEventById while testing since the createInactiveUser query isn't working'
const CreateUser = createInactiveUser(({token,loading,error}) => {

  if(loading){
    console.log(loading);
    return <h3>Loading...</h3>;
  }else if (error){
    console.log(error);
    return <h3>ERROR!</h3>;
  }
  console.log(token);
});





class IndividualRegistration extends React.Component {
  private state = {
    variables: {
      email: "",
      pswd: "",
      username: ""
    },
  };

  private vars = {
    email: undefined,
    pswd: undefined,
    username: undefined
  };

  handleClick = (event) => {
    event.preventDefault();
    let allValid = this.vars.email !== undefined
      && this.vars.pswd !== undefined
      && this.vars.username !== undefined;



    if (!allValid) {
      alert("Please enter correct information");
      return;
    }
    this.setState({variables: this.vars});
  };


  // TODO Add verification that no account with this email exists
  // TODO If an account with this email doesn't exist, create a new one

  render() {
    return (
      <div>
        <h1>Individual Registration</h1>
        <form id="form" onSubmit={this.handleClick}>

          <UsernameField saveUsername={(usernameParam) => this.vars.username=usernameParam}/>
          <EmailField saveEmail={(emailParam) => this.vars.email=emailParam}/>
          <br/>
          <PasswordField savePassword={(passwordParam) => this.vars.pswd=passwordParam}/>
          {/*This is called everytime the state is updated, including the beginning*/}
          <CreateUser username={this.state.variables.username} email={this.state.variables.email} password={this.state.variables.password} />
          <input type="submit" id="register" value="Create Account"/>
        </form>
      </div>
    );
  }
}

export default IndividualRegistration;

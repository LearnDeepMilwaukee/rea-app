/**
 * @author Michael Larson <larsonme@msoe.edu>
 * @version 1.0.0
 */

import * as React from "react";
import createUserPerson from "../../../ui-bindings/user/CreateUserPerson.tsx";
import userEmailExist from "../../../ui-bindings/user/UserEmailExists.tsx";
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
  public state = {
    value: ""
  };


  onChange = (value) => {
    this.setState({value: value});
    this.props.saveUsername(value);

  };

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
                                token={"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJSZWdpc3RyYXRpb24iLCJpYXQiOjE1NDQ1ODcwNzEsInBhc3N3b3JkIjoiOTg0OGMxOTM0NzkxZTMzZDAzYmFkNzdhYzUxOTMxM2NlYTQzMWQ1ZCIsImlkIjo3fQ.HAaJruKV-9u7gvmDNM46HKKsm7lzbmIZyFss7f-Q6uY"}/>;
    console.log("Email exists is: " + element.toString());
  }
  return (
    <div>{element}</div>
  );
}

const CreateUserQuery = createUserPerson(({createUserPersonVar, error}) => {

  if (error) {
    console.log({error});
    //TODO Add better error handling here
    return <p>error</p>;
  }
  else if (createUserPersonVar != null) {
    return <p>{createUserPersonVar.split(',')[0]}</p>
  } else {
    return <p>{createUserPersonVar}</p>;
  }
});


function CreateUser(props) {

  let element;
  //TODO Check here if email exists
  //TODO Figure out how we will get the token

  if (props.userEntered && !props.emailExists) {
    element = <CreateUserQuery username={props.username} email={props.email} pswd={props.pswd}
                               name={props.name}
                               token={"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJSZWdpc3RyYXRpb24iLCJpYXQiOjE1NDQ1ODcwNzEsInBhc3N3b3JkIjoiOTg0OGMxOTM0NzkxZTMzZDAzYmFkNzdhYzUxOTMxM2NlYTQzMWQ1ZCIsImlkIjo3fQ.HAaJruKV-9u7gvmDNM46HKKsm7lzbmIZyFss7f-Q6uY"}
                               image={props.image}/>

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
    userRan: false
  };


  handleClick = (event) => {
    event.preventDefault();
    let allValid = this.state.email !== undefined
      && this.state.pswd !== undefined
      && this.state.username !== undefined;
    this.setState({userRan: true});


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
          <EmailField saveEmail={(emailParam) => this.state.email = emailParam}/>
          <CheckEmail email={this.state.email}/>
          <br/>
          <PasswordField savePassword={(passwordParam) => this.state.pswd = passwordParam}/>
          <CreateUser userEntered={this.state.userRan}
                      username={this.state.username} email={this.state.email}
                      pswd={this.state.pswd} name={this.state.name} image={this.state.image}/>
          <input type="submit" id="register" value="Create Account"/>
        </form>
      </div>
    );
  }
}

export default IndividualRegistration;

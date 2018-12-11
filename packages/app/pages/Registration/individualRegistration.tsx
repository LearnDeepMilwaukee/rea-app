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
  private state = {
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
    // return <h3>Loading...</h3>;
  } else if (error) {
    console.log("Error: " + error);
    return <h3>ERROR!</h3>;
  }
  console.log("Email Exists query resposne");
  console.log(emailExists);
  console.log("End response");
  return emailExists;

});

const CreateUserQuery = createUserPerson(({createUserPerson, error}) => {
  if (error) {
    console.log(error.options);
    return error;
  }
  return createUserPerson;
});



class CreateUser extends React.Component {

  render() {
    let element;
    //TODO Check here if email exists
    //TODO Figure out how we will get the token
    if (this.props.userEntered) {
      element = <CreateUserQuery username={this.props.username} email={this.props.email} pswd={this.props.pswd}
                                 name={this.props.name} token={ENTER_TOKEN_HERE} image={this.props.image}/>
    }
//This is giving a warning, but the query isn't fully executed otherwise.
    return (
      <div>{element}</div>
    );
  }
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
          <br/>
          <PasswordField savePassword={(passwordParam) => this.state.pswd = passwordParam}/>
          <CreateUser userEntered={this.state.userRan} username={this.state.username} email={this.state.email}
                      pswd={this.state.pswd} name={this.state.name} image={this.state.image}/>
          <input type="submit" id="register" value="Create Account"/>
        </form>
      </div>
    );
  }
}

export default IndividualRegistration;

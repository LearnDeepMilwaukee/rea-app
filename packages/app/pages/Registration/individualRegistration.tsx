/**
 * @author Michael Larson <larsonme@msoe.edu>
 * @version 1.0.0
 */

import * as React from "react";
import createInactiveUser from "../../../ui-bindings/user/CreateInactiveUser.tsx";


class EmailField extends React.Component {
  private state = {
    valid: true,
    value: ""
  };

  validate = (email) => {
    let valid = (email.indexOf("@") !== -1);
    this.setState({valid: valid});
    return valid;
  };

  onChange = (value) => {
    // let valid = EmailValidator.validate(value);
    if (true) {
      this.setState({value: value});
      this.props.saveEmail(value);
    }
  };

// Check if email already exists in backend?
  render() {
    return (
      <div>
        Email*:<br/>
        <input type="text" name="email" onChange={(event) => this.onChange(event.target.value)}/>
        {/*{!this.state.valid ? <p>Email is not valid</p> : null}*/}
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
        {/*{!this.state.valid ? <p>Username isn't valid</p> : null}*/}
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
        Password:<br/>
        <input type="password" name="password" onChange={(event) => this.updateFirstPassword(event.target.value)}/><br/>
        Confirm Password:<br/>
        <input type="password" name="password"
               onChange={(event) => this.updateSecondPassword(event.target.value)}/><br/>
      </div>
    );
  }
}


class IndividualRegistration extends React.Component {
  private state = {
    email: undefined,
    password: undefined,
    username: undefined,
  };

  handleClick = (event) => {
    event.preventDefault();
    let allValid = this.state.email !== undefined
      && this.state.password !== undefined
      && this.state.username !== undefined;


    if (!allValid) {
      alert("Please enter correct information");
      return;
    }
    let variables = {
      email: this.state.email,
      pswd: this.state.password,
      username: this.state.username
  };
    variables.token = this.props.token;
    console.log(this.props);
    console.log("Starting");
    console.log(this.props.mutate);
    console.log(variables);
    this.props.mutate({ variables }).then((response) => {
      console.log("After mutation");
      // let newUser = response.data.createInactiveUser.token;
      // console.log(newUser);
    }).catch((error) => {
      console.log(error);
    })
  };


  // TODO Add verification that no account with this email exists
  // TODO If an account with this email doesn't exist, create a new one

  render() {
    return (
      <div>
        <h1>Individual Registration</h1>
        <form id="form" onSubmit={this.handleClick}>

          <UsernameField saveUsername={(usernameParam) => this.setState({username: usernameParam})}/>
          <EmailField saveEmail={(emailParam) => this.setState({email: emailParam})}/>
          <br/>
          <PasswordField savePassword={(passwordParam) => this.setState({password: passwordParam})}/>
          <input type="submit" id="register" value="Create Account"/>
        </form>
      </div>
    );
  }
}

// export default createInactiveUser(IndividualRegistration);
export default createInactiveUser(IndividualRegistration);

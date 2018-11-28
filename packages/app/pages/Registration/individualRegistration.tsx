/**
 * @author Michael Larson <larsonme@msoe.edu>
 * @version 1.0.0
 */

import * as React from "react";

class EmailField extends React.Component {
  private state = {
    valid: true,
    value: ""
  };

  validate = (email) => {
    let valid = (email.indexOf("@") !== -1);
    this.setState({valid : valid});
    return valid;
  };

  onChange = (value) => {
    let valid = this.validate(value);
    if (valid) {
      this.setState({value : value});
      this.props.saveEmail(value);
    }
  };

  render() {
    return (
      <div>
      Email:<br/>
        <input type="text" name="email" onChange={(event) => this.onChange(event.target.value)}/>
        <p> *</p><p class="invalidValue">{this.state.valid ? "" : "This email is invalid"} </p>
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
      this.setState({passwordOne : value}, () => {
        if (this.state.passwordOne === this.state.passwordTwo) {
          this.props.savePassword(value);

        }
      });

  };
  updateSecondPassword = (value) => {
    this.setState({passwordTwo : value}, () => {
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
        <input type="password" name="password" onChange={(event) => this.updateSecondPassword(event.target.value)}/><br/>
      </div>
    );
  }
}

class IndividualRegistration extends React.Component {
   public state = {
     email: undefined,
     password: undefined
   };

     // TODO Add verification that no account with this email exists
     // TODO If an account with this email doesn't exist, create a new one

  render() {
    return (
      <div>
        <h1>Individual Registration</h1>
        <form>
          <EmailField saveEmail={(emailParam) => this.setState({email : emailParam})}/>
          <br/>
          <PasswordField savePassword={(passwordParam) => this.setState({password : passwordParam})}/>
          <input type="button" id="register" value="Create Account"/>
        </form>
      </div>
    );
  }
}

export default IndividualRegistration;

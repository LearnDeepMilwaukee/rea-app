import * as React from "react";

class PasswordSection extends React.Component {

  private password: string = "";
  private confirmPassword: string = "";

  private state = {
    passwordValid: true,
    passwordsMatch: true
  };

  onPasswordUpdate = (password) => {
    this.password = password;
    this.checkPasswordValid();
    this.checkPasswordsMatch();
  };

  onConfirmPasswordUpdate = (confirmPassword) => {
    this.confirmPassword = confirmPassword;
    this.checkPasswordsMatch();
  };

  checkPasswordValid = () => {
    if (this.password !== "") {
      this.setState({passwordValid: this.password.length >= 8});
    }
  };

  checkPasswordsMatch = () => {
    let passwordsMatch = (this.password === this.confirmPassword);
    this.props.savePassword(passwordsMatch ? this.password : undefined);

    // only update the field if there is text (hides the message before needed)
    if (this.confirmPassword !== "") {
      this.setState({passwordsMatch});
    }
  };

  public getPassword = () => {
    return "p@ssword";
  };

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

class Registration extends React.Component {

  private state = {
    password: undefined
  };

  getRegistrationJSON = (event) => {
    event.preventDefault();

    // let allValid = this.state.passwordValid && this.state.passwordsMatch;
    //
    // if (!allValid) {
    //   alert("Please correct information and try again");
    //   return;
    // }

    let userType = document.getElementById("organizationButton").checked ? "organization" : "individual";
    let username = document.getElementById("username").value;
    // let password = document.getElementById("password").getPassword();

    console.log("User Type:", userType);
    console.log("Username:", username);
    console.log("Password:", this.state.password);
  };

  // Called by the PasswordSection to save the password
  savePassword = (password) => {
    this.setState({password});
    console.log("Saving Password:", password);
  };

  render() {
    return (
      <div>
        <h1>Register</h1>

        <form id="form" onSubmit={this.getRegistrationJSON}>

          User Type:<br/>
          <input
            id="organizationButton"
            type="radio"
            name="userType"
            value="organization"
            defaultChecked="true"
          />Organization
          <input
            id="individualButton"
            type="radio"
            name="userType"
            value="individual"
            disabled="true"
          />Individual
          <br/><br/>

          Organization Name:<br/>
          <input id="organizationName" type="text"/>
          <br/><br/>

          Username:<br/>
          <input id="username" type="text"/>
          <br/><br/>

          <PasswordSection savePassword={(password) => this.setState({password})}/>

          <input type="submit" id="submit" value="Register"/>
        </form>
      </div>
    );
  }
}

export default Registration;

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

class UsernameSection extends React.Component {

  onUsernameUpdate = (username) => {
    // TODO validate against the backend to check for existing user
    this.props.saveUsername(username);
  };

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

class EmailSection extends React.Component {

  onEmailUpdate = (email) => {
    // TODO validate email against backend to check for existing email
    this.props.saveEmail(email);
  };

  render() {
    return (
      <div>
        Email:<br/>
        <input type="text" onChange={(event) => this.onEmailUpdate(event.target.value)}/>
        <br/><br/>
      </div>
    );
  }
}

class Registration extends React.Component {

  private state = {
    username: undefined,
    email: undefined,
    password: undefined
  };

  getRegistrationJSON = (event) => {
    event.preventDefault();

    let allValid = this.state.username && this.state.email && this.state.password;

    if (!allValid) {
      alert("Please correct information and try again");
      return;
    }

    let userType = document.getElementById("organizationButton").checked ? "organization" : "individual";

    console.log("User Type:", userType);
    console.log("Username:", this.state.username);
    console.log("Email:", this.state.email);
    console.log("Password:", this.state.password);
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

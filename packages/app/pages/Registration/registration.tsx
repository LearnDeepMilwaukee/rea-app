import * as React from "react";

class PasswordSection extends React.Component {

  state = {
    passwordValid: true,
    passwordsMatch: true
  };

  checkPasswordValid = () => {
    let password = document.getElementById("password").value;

    if (password !== "") {
      this.setState({passwordValid: password.length >= 8});
    }
  };

  checkPasswordsMatch = () => {
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    if (confirmPassword !== "") {
      this.setState({passwordsMatch: (password === confirmPassword)});
    }
  };

  render() {
    return (
      <div>
        Password:<br/>
        <input
          id="password"
          type="password"
          onChange={() => {
            this.checkPasswordValid();
            this.checkPasswordsMatch();
          }}
        />
        {!this.state.passwordValid ? <p>Passwords Not Long Enough</p> : null}
        <br/><br/>

        Confirm Password:<br/>
        <input id="confirmPassword" type="password" onChange={this.checkPasswordsMatch}/>
        {!this.state.passwordsMatch ? <p>Passwords Do Not Match</p> : null}
        <br/><br/>
      </div>
    );
  }
}

class Registration extends React.Component {

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
    let password = document.getElementById("password").getPassword();

    console.log("User Type:", userType);
    console.log("Username:", username);
    console.log("Password:", password);
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

          <PasswordSection id="password"/>

          <input type="submit" id="submit" value="Register"/>
        </form>
      </div>
    );
  }
}

export default Registration;

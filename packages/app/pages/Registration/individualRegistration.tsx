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

let userInformation ={
     email: "",
     pswd: "",
     username: "",
     name: "",
     image: "",
     userRan: false,
     allValid: false
};

const EmailFieldConst = (props) => {
  let currentTheme = themeable(theme);
  return(
    <div>
        <span>
          <text>Email</text>
          <text {...currentTheme(3,"required")}>*</text><input {...currentTheme(4,"emailBox")} type="text" name="email" onChange={(event) => props.saveEmail(event.target.value)}/>
        </span>
    </div>
  );
};


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
    return     <p> </p>;
  } else if (error) {
    console.log("Error: " + error);
    return <h3>Error!</h3>;
  }

    if (emailExists === false) {
      return <CreateUser userEntered={userInformation.userRan} allValid={userInformation.allValid}
                         username={userInformation.username} email={userInformation.email}
                         pswd={userInformation.pswd} name={userInformation.name} image={userInformation.image}
                         />
    }
    else if(emailExists === true){
      alert("An account with this email already exists");
      return <p> </p>
    }

});


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

  if (props.userEntered && props.allValid) {
      element = <CreateUserQuery username={props.username} email={props.email} pswd={props.pswd}
                                 name={props.name}
                                 token={adminToken}
                                 image={props.image}/>

  }
  return (
    <div>{element}</div>
  );
}


class IndividualRegistration extends React.Component {
  private state = {
    queryingEmail: "",
    validEmail: false,
  };


  handleClick = (event) => {
    event.preventDefault();


    let message = "";
    if(!EmailValidator.validate(userInformation.email)){
      message += "Invalid email\n";
    }
    if (userInformation.pswd === "") {
      message += "Passwords do not match\n";
    }
    if (userInformation.username === "") {
      message += "Please enter a username\n";
    }

    if(message !== ""){
      alert(message);
      return;
    }
    else {
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

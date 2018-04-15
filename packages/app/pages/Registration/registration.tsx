import * as React from "react";

class Registration extends React.Component {

  passwordsMatch = true;

  static getRegistrationJSON(event) {
    event.preventDefault();



    let userTypeRadioGroup = document.getElementById("userType");
    let userType = userTypeRadioGroup.selected.label.toLowerCase();
    console.log("User Type:", userType);
  }

  checkPasswords() {
    //TODO check if the passwords are the same or not, and update the condition
    this.passwordsMatch = false;
  }

  render() {
    return (
      <div>
        <h1>Register</h1>

        <form id="form" onSubmit={Registration.getRegistrationJSON}>

          User Type:
          {/*<radiogroup id="userType">*/}
            {/*<radio label="Organization" selected={true}/>*/}
            {/*<radio label="Individual" disabled={true}/>*/}
          {/*</radiogroup>*/}

          <input type="radio" name="User Type" value="organization" selected={true}/>Organization
          <input type="radio" name="User Type" value="individual" disabled={true}/>Individual
          <br/><br/>

          Username:
          <input name="username" type="text" defaultValue=""/>
          <br/><br/>

          Password:
          <input name="password" type="text" defaultValue=""/>
          <br/><br/>

          Confirm Password:
          <input name="createResource" type="text" defaultValue=""/>
          {this.passwordsMatch ? null : <p>Passwords Do Not Match</p>}
          <br/><br/>


          <input type="submit" id="submit" value="Create Economic Event"/>
        </form>

        {/*{this.state.economicEvent ? <SingleEconomicEvent economicEvent={this.state.economicEvent} /> : <p>Created Event Goes Here</p>}*/}
      </div>
    );
  }
}

export default Registration;

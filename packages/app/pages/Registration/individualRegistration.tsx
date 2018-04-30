/**
 * @author Connor Hibbs <hibbscm@msoe.edu>
 * @version 1.0.0
 */

import * as React from "react";
import * as EmailValidator from "email-validator";
import { Link } from "react-router";

class IndividualRegistration extends React.Component {

  render() {
    return (
      <div>
        <h1>Individual Registration</h1>
        <Link to="/register/organization">or <u>register an Organization instead</u></Link>
        <p>Individual registration coming soon</p>
      </div>
    );
  }
}

export default IndividualRegistration;

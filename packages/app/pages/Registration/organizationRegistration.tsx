/**
 * @author Aaron Murphy <murphyad@msoe.edu>
 */

import * as React from "react";
import * as themeable from "react-themeable";
import * as theme from "./organizationRegistration.scss";
import * as Modal from "react-modal";
import { Link } from "react-router";
import createOrganization from "../../../ui-bindings/Organization/CreateOrganization.tsx";
import GetOrganizationTypes from "../../../ui-bindings/OrganizationType/getAllOrganizationTypes.js";

class Registration extends React.Component {
  constructor() {

    super();

    this.state = {
      name: undefined, // Required
      type: undefined, // Required
      logo: undefined,
      banner: undefined, // TODO:  Not yet used because of missing backend implementation
      description: undefined,
      newOrganizationID: undefined,
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  getRegistrationJSON = (event) => {
    event.preventDefault();
    let requiredFieldsValid =
      this.state.name !== undefined
      && this.state.type !== undefined;

    console.log("name: " + this.state.name + "\n" +
      "type: " + this.state.type + "\n" +
      "logo: " + this.state.logo + "\n" +
      "banner: " + this.state.banner + "\n" +
      "description: " + this.state.description + "\n\n" +
      "valid?  " + requiredFieldsValid);

    if (!requiredFieldsValid) {
      alert("Please enter valid data into all required fields!");
    }else {
      let variables = {
        name: this.state.name,
        type: this.state.type,
        image: this.state.logo,
        note: this.state.description
        // primaryLocationId: TODO
        // TODO add banner field
      };
      variables.token = this.props.token; // add the token in afterwards

      // perform the mutation
      this.props.mutate({variables}).then((response) => {
        let newOrganization = response.data.createOrganization.organization.id;
        if (newOrganization) {
          console.log(newOrganization);
          this.setState({newOrganizationID: newOrganization,});
          this.openModal();
        }
      }).catch((error) => {
        console.log(error);
      });
    }
  };

  // Draws all of the components on the screen
  render() {
    let currentTheme = themeable(theme);
    return (
      <div
        {...currentTheme(0, "registrationPage")}
      >
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          {...currentTheme(1, "popup")}
        >
          <Link
            to={"/projects/" + this.state.newOrganizationID}
          >Take me there!
          </Link>
        </Modal>
        <h1>Register a new organization</h1>

        <form
          id="form"
          onSubmit={this.getRegistrationJSON}
          {...currentTheme(2, "registrationForm")}
        >

          <OrganizationNameField
            saveOrgName={(name) => this.setState({name})}
          />
          <br/>
          <OrganizationTypeField
            saveOrgType={(type) => this.setState({type})}
          />
          <br/>
          <OrganizationLogoField
            saveOrgLogo={(logo) => this.setState({logo})}
          />
          <br/>
          {/*<OrganizationBannerField saveOrgBanner={(banner) => this.setState({banner})}/>*/}
          {/*<br/>*/}
          <OrganizationDescriptionField
            saveOrgDescription={(description) => this.setState({description})}
          />
          <br/>
          *required
          <br/>
          <input
            type="submit"
            id="submit"
            value="Register"
          />
        </form>

      </div>
    );
  }
}

class OrganizationNameField extends React.Component {

  state = {
    valid: true,
    value: ""
  };

  validate = (name) => {
    let valid = name.length > 0;
    this.setState({valid: valid});
    return valid;
  };

  onChange = (value) => {
    let valid = this.validate(value);
    this.setState({value: value});
    this.props.saveOrgName(valid ? value : undefined);
  };

  // Draws the components on the screen
  render() {
    return (
      <div>
        Organization Name:
        <input type="text" onChange={(event) => this.onChange(event.target.value)}/>
        *
        {!this.state.valid ? " Name is required" : null}
        <br/>
      </div>
    );
  }
}

export const OrganizationTypeList = GetOrganizationTypes(({ orgTypeList, loading, error, onChange, checked}) => {
  return (
    loading ? <strong>Loading...</strong> : (
      error ? <p style={{color: "#F00"}}>API error</p> : (
        <div>
          {orgTypeList.map( (orgType) => (
            <div>
              <input type="radio" name="userType" value={orgType.name} onChange={onChange} checked={checked === orgType.name}/>
              {orgType.name}
            </div>))}
        </div>
      )
    )
  );
});

class OrganizationTypeField extends React.Component {

  state = {
    valid: true,
    value: ""
  };

  onChange = (value) => {
    this.setState({value: value});
    this.props.saveOrgType(this.state.valid ? value : undefined);
  };

  // Draws all of the components on the screen
  render() {
    return (
      <div>
        OrganizationType: *<br/>
        <div>
          <OrganizationTypeList onChange={(event) => this.onChange(event.target.value)} checked={this.state.value}/>
        </div>

      </div>
    );
  }
}

class OrganizationLogoField extends React.Component {

  state = {
    valid: true,
    path: ""
  };

  onImageSelected = (event) => {
    var file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.setState({path: reader.result});
      this.props.saveOrgLogo(this.state.valid ? reader.result : undefined);
      console.log(this.state.value);
    };
    reader.onerror = (error) => {
      console.log("Error", error);
    };
  };

  // Draws the components on the screen
  render() {
    return (
      <div>
        Organization Logo:
        <input type="file" accept="image/*" onChange={(event) => this.onImageSelected(event)}/>
        (200x200)
        <br/>
        Preview:
        <br/>
        <img src={this.state.path} height={200} width={200} />
      </div>
    );
  }
}

class OrganizationBannerField extends React.Component {

  state = {
    valid: true,
    path: ""
  };

  onImageSelected = (event) => {
    var file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.setState({path: reader.result});
      this.props.saveOrgBanner(this.state.valid ? reader.result : undefined);
      console.log(this.state.value);
    };
    reader.onerror = (error) => {
      console.log("Error", error);
    };
  };

  // Draws the components on the screen
  render() {
    return (
      <div>
        Organization Banner:
        <input type="file" accept="image/*" onChange={(event) => this.onImageSelected(event)}/>
        (800x200)
        <br/>
        Preview:
        <br/>
        <img src={this.state.path} height={200} width={800} />
      </div>
    );
  }
}

class OrganizationDescriptionField extends React.Component { // TODO make multiline input

  state = {
    valid: true,
    value: ""
  };

  onChange = (event) => {
    this.setState({value: event.target.value});
    this.props.saveOrgDesc(this.state.valid ? value : undefined);
  };

  // Draws the components on the screen
  render() {
    return (
      <div>
        Description:
        <input
          type="text"
          onChange={(event) => this.onStateUpdate(event.target.value)}
        />
        <br/>
      </div>
    );
  }
}

export default createOrganization(Registration);

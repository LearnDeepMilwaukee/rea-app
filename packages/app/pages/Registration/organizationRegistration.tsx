/**
 * @author Connor Hibbs <hibbscm@msoe.edu>
 * @version 1.0.0
 * @since 29 April 2018
 */

import * as React from "react";
import createOrganization from "../../../ui-bindings/Organization/CreateOrganization.tsx";
import GetOrganizationTypes from "../../../ui-bindings/OrganizationType/getAllOrganizationTypes.js";

/**
 * This popup appears after a successful registration and offers to
 * take the user to the edit page for more information, or
 * to redirect them to their created organization to see the finished page
 */
// class Popup extends React.Component {
//
//   private state = {
//     showModal: (this.props.orgId !== undefined)
//   };
//
//   /** Custom styles for the wizard modal (CSS equiv) */
//   private wizardModalStyle = {
//     overlay : {
//       position          : "fixed",
//       top               : 0,
//       left              : 0,
//       right             : 0,
//       bottom            : 0,
//       backgroundColor   : "rgba(255, 255, 255, 0.75)"
//     },
//     content : {
//       position                   : "absolute",
//       top                        : "50%",
//       left                       : "50%",
//       width                      : "50%",
//       leftMargin                 : "auto",
//       rightMargin                : "auto",
//       transform                  : "translate(-50%, -50%)",
//       border                     : "1px solid #ccc",
//       background                 : "#fff",
//       overflow                   : "auto",
//       WebkitOverflowScrolling    : "touch",
//       borderRadius               : "4px",
//       outline                    : "none",
//       padding                    : "20px"
//     }
//   };
//
//   render() {
//     let id = this.props.orgId;
//     let url = "/projects/" + id;
//
//     return (
//       <div>
//         <Modal
//           isOpen={id}
//           style={this.wizardModalStyle}
//           onRequestClose={() => this.setState({showModal: false})}
//         >
//           <div>
//             <div style={{display: "block", textAlign: "right"}}>
//               <button style={{textAlign: "right"}}><Link to={url}>[ X ]</Link></button>
//             </div>
//
//             <h1>You're All Set!</h1>
//             <p>You have successfully registered your organization.
//               Now you can add more details like giving your organization a picture,
//               or adding some notes about what your organization does.</p>
//
//             <button><Link to={url}>No Thanks, Not Now</Link></button>
//             <button><Link to={url + "/edit"}>Take Me There!</Link></button>
//           </div>
//         </Modal>
//
//       </div>
//     );
//   }
// }

class Registration extends React.Component {

  public state = {
    name: undefined, // Required
    type: undefined, // Required
    logo: undefined,
    banner: undefined,
    description: undefined
  };

  getRegistrationJSON = (event) => {

    let requiredFieldsValid =
      this.state.name !== undefined
      && this.state.type !== undefined;

    if (!requiredFieldsValid) {
      // Notify user to enter in required data
      alert("Please enter valid data into all required fields!");
    }else {
      // Register organization
    }
  };

  render() {
    return (
      <div>
        <h1>Register a New Organization</h1>

        <form onSubmit={this.getRegistrationJSON}>
          <OrganizationNameField saveOrgName={(name) => this.setState({name})}/>
          <br/>
          <OrganizationTypeField saveOrgType={(type) => this.setState({type})}/>
          <br/>
          <OrganizationLogoField saveOrgLogo={(logo) => this.setState({logo})}/>
          <br/>
          <OrganizationBannerField saveOrgBanner={(banner) => this.setState({banner})}/>
          <br/>
          <OrganizationDescriptionField saveOrgDescription={(description) => this.setState({description})}/>
          <br/>
          *required
          <br/>
          <input type="submit" id="register" value="Register"/>
        </form>
      </div>
    );
  }

}

class OrganizationNameField extends React.Component {

  private state = {
    valid: true,
    value: ""
  };

  validate = (name) => {
    let valid = name.length > 0;
    this.setState({valid: valid});
    this.props.saveOrgName(valid ? value : undefined);
  };

  onChange = (value) => {
    let valid = this.validate(value);
    this.setState({value: value});
    this.props.saveOrgName(valid ? value : undefined);
  };

  render() {
    return(
      <div>
        Organization Name:
        <input type="text" onChange={(event) => this.onChange(event.target.value)}/>
        *
        {this.state.valid ? " Name is required" : null}
        <br/>
      </div>
    );
  }
}

export const OrganizationTypeList = GetOrganizationTypes(({ orgTypeList, loading, error, onChange, checked}) => {
  return (
    loading ? <p>Loading...</p> : (
      error ? <p>API error</p> : (
        <div>
          {orgTypeList.map( (orgType) => (
            <div>
              <input type="radio" name="userType" value={orgType.name} onChange={onChange} checked={checked === orgType.name}/>
              {orgType.name}
            </div>
          ))}
        </div>
      )
    )
  );
});
class OrganizationTypeField extends React.Component {

  private state = {
    valid: true,
    value: ""
  };

  onChange = (value) => {
    this.setState({value: value});
    this.props.saveOrgType(this.state.valid ? value : undefined);
  };

  render() {
    return (
      <div>
        Organization Type:
        <div>
          <OrganizationTypeList onChange={(event) => this.onChange(event.target.value)} checked={this.state.value}/>
        </div>
        *
      </div>
    );
  }
}

class OrganizationLogoField extends React.Component {

  private state = {
    valid: true,
    path: ""
  };

  onImageSelected = (event) => {
    var file = event.target.files[0];
    let reader = newFileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.setState({path: reader.result});
      this.props.saveOrgLogo(this.state.valid ? reader.result : undefined);
    };
    reader.onerror = (error) => {
      console.log("Error reading logo: ", error);
    };
  };

  render() {
    return (
      <div>
        Organization Logo:
        <input type="file" accept="image/*" onChange={(event) => thos.onImageSelected(event)}/>
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

  private state = {
    valid: true,
    path: ""
  };

  onImageSelected = (event) => {
    var file = event.target.files[0];
    let reader = newFileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.setState({path: reader.result});
      this.props.saveOrgBanner(this.state.valid ? reader.result : undefined);
    };
    reader.onerror = (error) => {
      console.log("Error reading banner: ", error);
    };
  };

  render() {
    return (
      <div>
        Organization Banner:
        <input type="file" accept="image/*" onChange={(event) => thos.onImageSelected(event)}/>
        (800x200)
        <br/>
        Preview:
        <br/>
        <img src={this.state.path} height={200} width={800} />
      </div>
    );
  }
}

class OrganizationDescriptionField extends React.Component {

  private state = {
    valid: true,
    value: ""
  };

  onChange = (event) => {
    this.setState({value: event.target.value});
    this.props.saveOrgDescription(this.state.valid ? value : undefined);
  };

  render() {
    return (
      <div>
        Description:
        <input type="text" onChange={(event) => this.onStateUpdate(event.target.value)}/>
        <br/>
      </div>
    );
  }
}

export default createOrganization(Registration);

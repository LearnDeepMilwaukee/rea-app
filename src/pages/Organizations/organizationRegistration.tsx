/**
 * @author Aaron Murphy <murphyad@msoe.edu>
 */

import * as React from "react";
import * as themeable from "react-themeable";
import * as theme from "./organizationRegistration";
import createAgentRelationship from "../../queries/AgentRelationship/createNewAgentRelationship";
import createOrganization from "../../queries/Organization/CreateOrganization";
import GetOrganizationTypes from "../../queries/OrganizationType/getAllOrganizationTypes";
import {withRouter} from 'react-router-dom';
 import getMyAgent from "../../queries/Agent/getMyAgent";

var myAgentId = 0; //Global variable that holds value returned from GetMyAgent
//Global query that returns id of current user logged in else returns -1
export const GetMyAgent = getMyAgent(({ agent, loading, error}) => {
    if (loading) {
        myAgentId = -1;
    } else if (error) {
        myAgentId = -1;
    } else {
        myAgentId = agent.id;
    }
    return (<span></span>);
});

class Registration extends React.Component {
    constructor() {
        super();

        this.state = {
            name: undefined, // Required
            type: "For-profit Company", // Required
            logo: undefined,
            banner: undefined, // TODO:  Not yet used because of missing backend implementation
            description: undefined
        };

    }

    getRegistrationJSON = (event) => {
        event.preventDefault();
        let requiredFieldsValid =
            this.state.name !== undefined
            && this.state.type !== undefined;

        // console.log("name: " + this.state.name + "\n" +
        //   "type: " + this.state.type + "\n" +
        //   "logo: " + this.state.logo + "\n" +
        //   "banner: " + this.state.banner + "\n" +
        //   "description: " + this.state.description + "\n\n" +
        //   "valid?  " + requiredFieldsValid);

        if (!requiredFieldsValid) {
            alert("Please enter valid data into all required fields!");
        } else {
            let variables = {
                name: this.state.name,
                type: this.state.type,
                image: this.state.logo,
                note: this.state.description
                // primaryLocationId: TODO
                // TODO add banner field
            };
            // perform the mutation
            this.props.createOrgMutation({variables}).then((response) => {
                let newOrganization = response.data.createOrganization.organization.id;
                if (newOrganization) {
                    this.setState({newOrganizationID: newOrganization,});
                    var parts = {
                        note: "A new org", // Gives context to relationship,
                        subjectId: 0,
                        relationshipId: 0,
                        objectId:0
                    }
                    parts.objectId = parseInt(this.state.newOrganizationID);
                    parts.subjectId = parseInt(myAgentId);
                    parts.relationshipId = parseInt(6);
                    parts.note = this.state.name;
                    console.log(parts);
                    this.props.createAgentRelationship({variables: parts}).then(() => {        // perform the mutation
                        this.props.history.push("/");
                        window.location.reload();
                        }).catch((error) => {
                            console.log(error);
                        });

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
            <div id="baseElement"
                 {...currentTheme(0, "registrationPage")}
            >

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
                    <p {...currentTheme(3, "required")}>*required</p>
                    <GetMyAgent/>
                    <br/>
                    <a href="/" {...currentTheme(18, "cancel")} id="cancelButton"> Cancel </a>
                    <input {...currentTheme(17, "submit")}
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

    render() {
        let currentTheme = themeable(theme);
        return (
            <span
                {...currentTheme(4, "orgNameSection")}
            >
        <span>Organization Name<p {...currentTheme(3, "required")}>*</p>&nbsp;</span>
        <input
            id="nameBox"
            type="text"
            onChange={(event) => this.onChange(event.target.value)}
            {...currentTheme(5, "orgNameInputField")}
        />
        <br/>
      </span>
        );

    }
}

export const OrganizationTypeList = GetOrganizationTypes(({orgTypeList, loading, error, onChange, checked}) => {
    let currentTheme = themeable(theme);
    return (
        loading ? <strong>Loading...</strong> : (
            error ? <p style={{color: "#F00"}}>API error</p> : (
                <div
                    {...currentTheme(6, "orgTypeInputField")}
                >
                    <select id="orgTypeDropdown"
                            onChange={onChange}
                            {...currentTheme(7, "orgTypeDropdown")}
                    >
                        {orgTypeList.map((orgType) => (
                            <option
                                id={orgType.name}
                                value={orgType.name}
                            >
                                {orgType.name}
                            </option>))}
                    </select>
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

    render() {
        let currentTheme = themeable(theme);
        return (
            <span
                {...currentTheme(8, "orgTypeSection")}
            >
        <span
            {...currentTheme(9, "orgTypeLabel")}
        >
          Organization Type<p {...currentTheme(10, "required")}>*</p></span>
        <OrganizationTypeList onChange={(event) => this.onChange(event.target.value)} checked={this.state.value}/>
      </span>
        );
    }
}

class OrganizationLogoField extends React.Component {

    state = {
        valid: true,
        path: "https://via.placeholder.com/200.png?text=Logo%20Preview"
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
        let currentTheme = themeable(theme);
        return (
            <div
                {...currentTheme(11, "orgLogoSection")}
            >
                <br/>
                Organization Logo:
                <br/>
                <span
                    {...currentTheme(12, "orgLogoPreview")}
                >
        <img id="largeImage" src={this.state.path} {...currentTheme(19, "largeImage")}/>
        <img id="smallImage" src={this.state.path} {...currentTheme(20, "smallImage")}/>
        </span>
                <br/>
                <br/>
                <div>
                    <input
                        id="logoButton"
                        type="file"
                        accept="image/*"
                        onChange={(event) => this.onImageSelected(event)}
                        size={5120}
                        {...currentTheme(13, "orgLogoInputField")}
                    />
                    <label htmlFor="logoButton" id="logoLabel" {...currentTheme(14, "orgLogoInputLabel")}>Upload New Photo</label>
                </div>
                <br/>
                <i>Images must be no bigger than 5MB</i>
            </div>
        );
    }
}

// class OrganizationBannerField extends React.Component {
//
//   state = {
//     valid: true,
//     path: ""
//   };
//
//   onImageSelected = (event) => {
//     var file = event.target.files[0];
//     let reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => {
//       this.setState({path: reader.result});
//       this.props.saveOrgBanner(this.state.valid ? reader.result : undefined);
//       console.log(this.state.value);
//     };
//     reader.onerror = (error) => {
//       console.log("Error", error);
//     };
//   };
//
//   // Draws the components on the screen
//   render() {
//     return (
//       <div>
//         Organization Banner:
//         <input type="file" accept="image/*" onChange={(event) => this.onImageSelected(event)}/>
//         (800x200)
//         <br/>
//         Preview:
//         <br/>
//         <img src={this.state.path} height={200} width={800}/>
//       </div>
//     );
//   }
// }

class OrganizationDescriptionField extends React.Component {
    state = {
        value: ""
    };

    onChange = (value) => {
        console.log("Description: " + value);
        this.setState({value: value});
        this.props.saveOrgDescription(value);
    };

    // Draws the components on the screen
    render() {
        let currentTheme = themeable(theme);
        return (
            <div>
                Organization Description:
                <br/>

                <textarea
                    id="descriptionArea"
                    columns="80"
                    rows="5"
                    onChange={(event) => this.onChange(event.target.value)}
                    {...currentTheme(16, "orgDescriptionTextBox")}
                />
                <br/>
            </div>
        );
    }
}

export default withRouter(createAgentRelationship(createOrganization(Registration)));


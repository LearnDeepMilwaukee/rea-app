/**
 * @author Aaron Murphy <murphyad@msoe.edu>
 */

import * as React from "react";
import * as themeable from "react-themeable";
import * as theme from "./organizationRegistration";
import createAgentRelationship from "../../queries/AgentRelationship/createNewAgentRelationship";
import {Form, Button, Grid, Header, Segment, Message, Label, Image} from 'semantic-ui-react'

import {withRouter} from 'react-router-dom';
import createOrganization from "../../queries/Organization/CreateOrganization";
import GetOrganizationTypes from "../../queries/OrganizationType/getAllOrganizationTypes";
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
            description: undefined
        };
    }
    handleChange = (e, {name, value}) => {
        this.setState({[name]: value});

    };
    getRegistrationJSON = (event) => {
        event.preventDefault();
        let requiredFieldsValid =
            this.state.name !== undefined
            && this.state.type !== undefined;

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
    onImageSelected = (event) => {
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            this.setState({image: reader.result, error: false});
        };
        reader.onerror = (error) => {
            this.setState({error: true, messageToDisplay: "There was an error when processing the image"});
            console.log(error);
        };
    };
    render() {
        return (
            <div className='login'>
                <style>{`
                body > div,
                body > div > div,
                body > div > div > div.login {
                    height: 100%;
                }
            `}
                </style>
                <Grid textAlign='center' style={{height: '100%'}} verticalAlign='middle'>>
                    <Grid.Column style={{maxWidth: 450}}>
                        <Header as='h2' textAlign='center'>
                            Organization Registration
                        </Header>
                        <Form size='large' onSubmit={this.getRegistrationJSON}>
                            <Segment stacked>
                                <Form.Field required>
                                    <Form.Input fluid placeholder='Organization Name' name='name' value={this.state.name}
                                                onChange={this.handleChange}/>
                                </Form.Field>
                                <Form.Field>
                                    <Image src={this.state.logo ? this.state.logo : "https://via.placeholder.com/200.png?text=Logo%20Preview"} size='small' centered/>
                                </Form.Field>
{/*Add in org type dropdown here*/}

                                <Form.Field>
                                    <Grid centered>
                                        <Grid.Column width={6}>
                                            <Label as="label" htmlFor="logoButton" size="large">
                                                Upload Logo
                                            </Label>
                                            <input id="logoButton" hidden type="file" accept="image/*"
                                                   onChange={(event) => this.onImageSelected(event)}/>
                                        </Grid.Column>

                                    </Grid>
                                </Form.Field>
                                <Form.Field required>
                                    <Form.Input fluid placeholder='Description' name='description' value={this.state.description}
                                                onChange={this.handleChange}/>
                                </Form.Field>

                                <Button color='blue' fluid type='submit' size='large'>Register</Button>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>

            </div>

        );
    }


    //
    //                 <OrganizationTypeField
    //                     saveOrgType={(type) => this.setState({type})}
    //                 />
    //                 <br/>

}


export const OrganizationTypeList = GetOrganizationTypes(({orgTypeList, loading, error, onChange, checked}) => {
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




export default withRouter(createAgentRelationship(createOrganization(Registration)));


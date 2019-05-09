/**
 * @author Aaron Murphy <murphyad@msoe.edu>
 */

import * as React from "react";
import createAgentRelationship from "../../queries/AgentRelationship/createNewAgentRelationship";
import {Form, Button, Grid, Header, Segment, Message, Label, Image} from 'semantic-ui-react'

import {withRouter} from 'react-router-dom';
import createOrganization from "../../queries/Organization/CreateOrganization";
import GetOrganizationTypes from "../../queries/OrganizationType/getAllOrganizationTypes";
import getMyAgent from "../../queries/Agent/getMyAgent";

let myAgentId = 0; //Global variable that holds value returned from GetMyAgent
//Global query that returns id of current user logged in else returns -1
export const GetMyAgent = getMyAgent(({agent, loading, error}) => {
    if (loading) {
        myAgentId = -1;
    } else if (error) {
        myAgentId = -1;
    } else {
        myAgentId = agent.id;
    }
    return <div/>;
});


class Registration extends React.Component {
    constructor() {
        super();

        this.state = {
            name: undefined, // Required
            type: "For-profit Company", // Required
            logo: undefined,
            description: undefined,
            errorMessage: [],
            error: false
        };
    }

    removeStringFromErrorMessage = (stringToRemove) => {
        let index = this.state.errorMessage.indexOf(stringToRemove);
        if (index > -1) {
            this.state.errorMessage.splice(index, 1);
        }
        if (this.state.errorMessage.length == 0) {
            this.setState({error: true})
        }
    };

    handleChange = (e, {name, value}) => {
        this.setState({[name]: value});
    };

    getRegistrationJSON = (event) => {
        event.preventDefault();
        let requiredFieldsValid =
            this.state.name !== undefined
            && this.state.type !== undefined;
        let requiredFieldsMessage = "You need to fill in the name and organization type fields";
        if (!requiredFieldsValid) {
            let index = this.state.errorMessage.indexOf(requiredFieldsMessage);
            if (index < 0) {
                this.state.errorMessage.push(requiredFieldsMessage);
                this.setState({error: true})
            }
        } else {
            this.removeStringFromErrorMessage(requiredFieldsMessage);
            let variables = {
                name: this.state.name,
                type: this.state.type,
                image: this.state.logo,
                note: this.state.description
            };

            this.props.createOrgMutation({variables}).then((response) => {

                let newOrganizationId = response.data.createOrganization.organization.id;

                if (newOrganizationId) {
                    this.setState({newOrganizationID: newOrganizationId});
                    let parts = {
                        note: this.state.name,
                        subjectId: parseInt(myAgentId),
                        relationshipId: parseInt(6),
                        objectId: parseInt(newOrganizationId)
                    };

                    this.props.createAgentRelationship({variables: parts}).then(() => {
                        this.props.history.push("/");
                        window.location.reload();
                    }).catch((error) => {
                        this.state.errorMessage.push("There was an error when connecting your account to your organization");
                        this.setState({error: true});
                        console.log(error);
                    });
                }
                this.removeStringFromErrorMessage("There was an error when creating your organization");
            }).catch((error) => {

                this.state.errorMessage.push("There was an error when creating your organization");
                this.setState({error: true});

                console.log(error);
            });
        }
    };
    onImageSelected = (event) => {
        let file = event.target.files[0];
        let reader = new FileReader();
        let errorMessage = "There was an error when processing the image";
        reader.readAsDataURL(file);
        reader.onload = () => {
            this.setState({image: reader.result});
            this.removeStringFromErrorMessage(errorMessage);
        };
        reader.onerror = (error) => {
            let index = this.state.errorMessage.indexOf(errorMessage);
            if (index < 0) {
                this.state.errorMessage.push(errorMessage);
            }
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
                <Grid textAlign='center' style={{height: '100%'}} verticalAlign='middle'>
                    <Grid.Column style={{maxWidth: 450}}>
                        <Header as='h2' textAlign='center'>
                            Organization Registration
                        </Header>
                        <Form size='large' onSubmit={this.getRegistrationJSON} error={this.state.error}>
                            <Segment stacked>
                                <Form.Field>
                                    <Form.Input fluid placeholder='Organization Name' name='name'
                                                value={this.state.name}
                                                onChange={this.handleChange}/>
                                </Form.Field>
                                <OrganizationTypeList onChange={(value) => this.setState({type: value})}/>

                                <Form.Field>
                                    <Image
                                        src={this.state.logo ? this.state.logo : "https://via.placeholder.com/200.png?text=Logo%20Preview"}
                                        size='small' centered/>
                                </Form.Field>

                                <Form.Field>
                                    <Grid centered>
                                        <Grid.Column textAlign={"center"}>
                                            <Label as="label" htmlFor="logoButton" size="large">
                                                Upload Logo
                                            </Label>
                                            <input id="logoButton" hidden type="file" accept="image/*"
                                                   onChange={(event) => this.onImageSelected(event)}/>
                                        </Grid.Column>

                                    </Grid>
                                </Form.Field>
                                <Form.Field>
                                    <Form.Input fluid placeholder='Description' name='description'
                                                value={this.state.description}
                                                onChange={this.handleChange}/>
                                </Form.Field>

                                <Button color='blue' fluid type='submit' size='large'>Register</Button>
                            </Segment>
                            <Message error list={this.state.errorMessage}/>

                        </Form>
                    </Grid.Column>
                </Grid>

                <GetMyAgent/>
            </div>

        );
    }
}


export const OrganizationTypeList = GetOrganizationTypes(({orgTypeList, loading, error, onChange}) => {
    if (loading) {
        return (<Form.Select width={250} loading text={"Loading"} id={"orgDropdown"}/>);
    }
    else if (error) {
        return (
            <Form.Select width={250} error text={"Error loading Organization types"} id={"orgDropdown"}/>
        );
    } else {
        let orgList = [];
        orgTypeList.forEach((event) => {
            orgList.push({key: event.name, text: event.name, value: event.name})
        });
        return (
            <Form.Select fluid id={"typeDropdown"} label='Organization Type' placeholder="Choose an organization type"
                         options={orgList} onChange={(e, {value}) => onChange(value)}/>);

    }
});


export default withRouter(createAgentRelationship(createOrganization(Registration)));


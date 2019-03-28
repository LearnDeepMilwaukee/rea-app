/**
 * @author Michael Larson <larsonme@msoe.edu>
 * @version 1.0.0
 */

import * as React from "react";
import createUserPerson from "../../queries/User/CreateUserPerson";
import userEmailExist from "../../queries/User/UserEmailExists";
import * as EmailValidator from "email-validator";
import {adminToken} from "../../apiKeys.json";
import "./individualRegistration.css";
import {Form, Button, Grid, Header, Segment, Message} from 'semantic-ui-react'
import {isUndefined} from "util";

/**
 * This data structure stores the information that is entered by
 * the User into the fields on the page, and is sent to the
 * mutation to create a new User account.
 */
let userInformation = {
    email: "",
    pswd: "",
    username: "",
    name: "",
    image: "",
    userRan: false,
    allValid: false,
    errorMessage: []
};


/**
 * Verifies if a User exists in the database with that email.
 * If the email is unique, create a new User.
 * @type {React.ComponentClass<{}>}
 */
const EmailExistsQuery = userEmailExist(({emailExists, loading, error}) => {
    if (loading) {
        console.log("Loading " + loading);
        return <p/>;
    } else if (error) {
        console.log("Error: " + error);
        return <h3>Error!</h3>;
    }
    if (emailExists === false && userInformation.userRan) {
        return <CreateUser allValid={userInformation.allValid}
                           username={userInformation.username} email={userInformation.email}
                           pswd={userInformation.pswd} name={userInformation.name} image={userInformation.image}
        />
    } else if (emailExists === true && userInformation.errorMessage.indexOf("An account with this email already exists") < 0) {
        userInformation.errorMessage.push("An account with this email already exists");
        return <p/>;
    } else if (emailExists === false) {
        let indexToRemove = userInformation.errorMessage.indexOf("An account with this email already exists");
        userInformation.errorMessage.splice(indexToRemove, 1);
    }
    return <p/>
});

/**
 * Creates a new User in the database
 * @type {React.ComponentClass<{}>}
 */
const CreateUserQuery = createUserPerson(({createUserPersonVar, error}) => {
    // console.log("Error is");
    // console.log(error);
    if (!isUndefined(error)) {
        userInformation.errorMessage.push("This username already exist");
        console.log("Inside error");
        return <p/>;
    } else if (createUserPersonVar != null) {
        return <p>{createUserPersonVar.split(',')[0]}</p>
    } else {
        return <p>{createUserPersonVar}</p>;
    }
});

/**
 * Calls the create User query using the values passed in through props
 * @param props contains the infomation to be used in the query
 */
function CreateUser(props) {

    let element;
    if (props.allValid) {
        element = (
            <CreateUserQuery
                username={props.username}
                email={props.email}
                pswd={props.pswd}
                name={props.name}
                token={adminToken}
                image={props.image}
            />
        );
    }
    return <div>{element}</div>;
}

/**
 * The base element for the User registration page.
 * This handles basic validation of the values passed and calls the queries to create a new User.
 */
class IndividualRegistration extends React.Component {


    runEmailExists = () => {
        return <EmailExistsQuery email={this.state.email} token={adminToken} allValid={true}/>;

    };


    state = {
        username: '',
        password1: '',
        password2: '',
        submittalPassword: '',
        email: '',
        queryingEmail: ''
    };

    handleChange = (e, {name, value}) => {
        if ((name == 'password1' && value == this.state.password2) || (name == 'password2' && value == this.state.password1)) {
            this.setState({[name]: value, submittalPassword: value});
        }
        this.setState({[name]: value});

    };

    handleSubmit = () => {
        let userErrorMessage = [];
        if (userInformation.errorMessage.indexOf("An account with this email already exists") > 0) {
            userErrorMessage.push("An account with this email already exists");
        }
        if (EmailValidator.validate(this.state.email)) {
            userInformation.email = this.state.email;
        }
        else {
            userErrorMessage.push("Please enter an email");
        }
        userInformation.pswd = this.state.submittalPassword;
        userInformation.username = this.state.username;
        userInformation.allValid = (userInformation.email != "" && userInformation.pswd != "" && userInformation.username != "");
        if (userInformation.pswd == "") {
            userErrorMessage.push("Your passwords do not match");
        }
        if (userInformation.username == "") {
            userErrorMessage.push("Please enter a username");

        }
        userInformation.errorMessage = userErrorMessage;
        userInformation.userRan = true;
        this.setState({queryingEmail: this.state.email});
    };

    render() {
        const {username, email, password1, password2} = this.state;
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
                            User Registration
                        </Header>
                        <Form size='large' onSubmit={this.handleSubmit}
                              error={userInformation.errorMessage.length != 0}>
                            <Segment stacked>
                                <Form.Field required>
                                    <Form.Input fluid placeholder='Username' name='username' value={username}
                                                onChange={this.handleChange}/>
                                </Form.Field>
                                <Form.Field required>
                                    <Form.Input fluid placeholder='Email' name='email' value={email}
                                                onChange={this.handleChange}/>
                                </Form.Field>

                                <Form.Field required>
                                    <Form.Input fluid type='password' placeholder='Password' name='password1'
                                                value={password1}
                                                onChange={this.handleChange}/>
                                </Form.Field>
                                <Form.Field required>
                                    <Form.Input fluid type='password' placeholder='Confirm Password' name='password2'
                                                value={password2}
                                                onChange={this.handleChange}/>
                                </Form.Field>
                                <Button color='blue' fluid type='submit' size='large'>Register</Button>
                            </Segment>

                            <Message error list={userInformation.errorMessage}/>
                        </Form>
                    </Grid.Column>
                </Grid>
                {this.state.email ? this.runEmailExists() : ""}

            </div>

        );
    }
}

export default IndividualRegistration;

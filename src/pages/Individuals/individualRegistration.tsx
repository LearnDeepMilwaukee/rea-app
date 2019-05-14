/**
 * @author Michael Larson <larsonme@msoe.edu>
 * @version 1.0.0
 */

import * as React from "react";
import createUserPerson from "../../queries/User/CreateUserPerson";
import userEmailExist from "../../queries/User/UserEmailExists";
import usernameExists from "../../queries/User/UsernameExists";
import createToken from "../../queries/User/createToken.js";
import * as EmailValidator from "email-validator";
import {adminToken} from "../../apiKeys.json";
import "./individualRegistration.css";
import {Form, Button, Grid, Header, Segment, Message} from 'semantic-ui-react'
import {isUndefined} from "util";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import * as currentUserActions from '../../redux/actions/currentUserActions.js';


/**
 * Verifies if a User exists in the database with that email.
 * If the email is unique, create a new User.
 */
const EmailExistsQuery = userEmailExist(({emailExists, loading, error, setErrorMessage, removeErrorMessage, userInformation, loginUser}) => {
    if (loading) {
        return <p/>;
    } else if (error) {
        return <Message visible error content="An error occured, please contact Makerspace"/>
    }
    if (emailExists === true) {
        setErrorMessage("An account with this email already exists");
        return <p/>;
    } else if (emailExists === false) {
        removeErrorMessage("An account with this email already exists");
    }


    return <CreateUser allValid={userInformation.allValid}
                       username={userInformation.username} email={userInformation.email}
                       pswd={userInformation.submittalPassword}
                       image={userInformation.image} loginUser={loginUser}
    />

});

/**
 * Checks to see if the current username the user entered is in the database
 */
const UsernameExistsQuery = usernameExists(({usernameExists, loading, error, setErrorMessage, removeErrorMessage}) => {
    if (loading) {
        return <p/>;
    } else if (error) {
        return <Message visible error content="An error occured, please contact Makerspace"/>
    }
    if (usernameExists === true) {
        setErrorMessage("An account with this username already exists");
        return <p/>;
    } else if (usernameExists === false) {
        removeErrorMessage("An account with this username already exists");
    }
    return <p/>;
});

/**
 * Creates a new User in the database
 */
const CreateUserQuery = createUserPerson(({error, loginUser}) => {
    if (!isUndefined(error) && !error.message.includes("UNIQUE constraint failed: valueaccounting_economicagent.")) {
        return <Message visible error content="An error occurred attempting to register"/>
    } else {
        loginUser();
        return <p/>

    }
});

/**
 * Calls the create User query using the values passed in through props
 */
function CreateUser(props) {
    let element;
    if (props.allValid) {
        element = (
            <CreateUserQuery
                username={props.username}
                email={props.email}
                pswd={props.pswd}
                name={props.username}
                token={adminToken}
                image={props.image}
                loginUser={props.loginUser}
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
    state = {
        username: '',
        name: '',
        password1: '',
        password2: '',
        submittalPassword: '',
        email: '',
        loggingIn: false,
        loggedIn: false,
        errorMessage: [],
        allValid: false,
        userRan: false,
        image: ''
    };

    componentDidMount() {
        if (this.props.currentUserToken !== "N/A") {
            this.props.history.push("/");
            window.location.reload();
        }
    }

    loginUserMethod = () => {
        if (!this.state.loggingIn && !this.state.loggedIn) {
            this.setState({loggingIn: true}, () => {
                let mutationVariables = {
                    username: this.state.username,
                    password: this.state.submittalPassword
                };
                this.props.createToken({variables: mutationVariables}).then((response) => {
                    let token = response.data.createToken.token;

                    this.props.currentUserActions.setCurrentUserToken(token);
                    this.setState({loggedIn: true});

                }).catch((error) => {
                    if (error.message.includes("'NoneType' object has no attribute")) {
                        return <Message visible error
                                        content="An error occurred when attempting to log you in.
                                        \nHowever, you were registered"/>
                    }
                    this.setState({loggingIn: false});

                });
            });

        }
        if (this.props.currentUserToken !== "N/A") {
            this.props.history.push("/");
            window.location.reload();
        }
    };

    runEmailExists = () => {
        this.removeErrorMessage("Please enter an email");
        if (EmailValidator.validate(this.state.email)) {
            return <EmailExistsQuery email={this.state.email} token={adminToken} allValid={this.state.allValid}
                                     setErrorMessage={this.setErrorMessage} removeErrorMessage={this.removeErrorMessage}
                                     userInformation={this.state} loginUser={this.loginUserMethod}/>;
        } else if (this.state.allValid) {
            this.setState({allValid: false});
        }
        return <p/>

    };

    runUsernameExists = () => {
        return <UsernameExistsQuery username={this.state.username} token={adminToken}
                                    allValid={this.state.allValid} setErrorMessage={this.setErrorMessage}
                                    removeErrorMessage={this.removeErrorMessage}/>;

    };

    setErrorMessage = (message) => {
        if (this.state.errorMessage.indexOf(message) < 0) {
            let array = this.state.errorMessage;
            array.push(message);

            this.setState({errorMessage: array});

        }
    };

    removeErrorMessage = (message) => {
        let index = this.state.errorMessage.indexOf(message);
        if (index > -1) {
            let array = this.state.errorMessage;
            array.splice(index, 1);
            this.setState({errorMessage: array});
        }
    };

    updatePassword = ({name, value}) => {
        if ((name == 'password1' && value == this.state.password2) || (name == 'password2' && value == this.state.password1)) {
            this.setState({[name]: value, submittalPassword: value});
            this.removeErrorMessage("Your passwords do not match");
        } else if (name == 'password1' || name == 'password2') {
            this.setState({submittalPassword: "", userRan: false, [name]:value});
        }

    };

    updateUsername = (value) => {
        this.setState({name: value, username:value});
        this.removeErrorMessage("Please enter a username");
    };

    updateEmail = (value) => {
        if(EmailValidator.validate(value)) this.removeErrorMessage("Please enter a valid email");
        this.setState({email: value});

    };


    handleSubmit = () => {
        if (EmailValidator.validate(this.state.email)) {
            this.removeErrorMessage("Please enter a valid email");
            this.setState({allValid: (this.state.email != "" && this.state.submittalPassword != "" && this.state.username != "" )})

        }
        else {
            this.setErrorMessage("Please enter a valid email");
        }

        if (this.state.password1 == "" || this.state.password2 == "") {
            this.setErrorMessage("Please confirm your password");
            this.removeErrorMessage("Your passwords do not match");

        }
        if (this.state.submittalPassword == "") {
            this.setErrorMessage("Your passwords do not match");
            this.removeErrorMessage("Please confirm your password");

        }

        if (this.state.username == "") {
            this.setErrorMessage("Please enter a username");
            this.removeErrorMessage("An account with this username already exists");
        }
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
                            User Registration
                        </Header>
                        <Form size='large' onSubmit={this.handleSubmit}
                              error={this.state.errorMessage.length != 0}>
                            <Segment stacked>
                                <Form.Field required>
                                    <Form.Input fluid placeholder='Username' name='username' value={this.state.username}
                                                onChange={(event) => this.updateUsername(event.target.value)}/>
                                </Form.Field>
                                <Form.Field required>
                                    <Form.Input fluid placeholder='Email' name='email' value={this.state.email}
                                                onChange={(event) => this.updateEmail(event.target.value)}/>
                                </Form.Field>

                                <Form.Field required>
                                    <Form.Input fluid type='password' placeholder='Password' name='password1'
                                                value={this.state.password1}
                                                onChange={(event) => this.updatePassword(event.target)}/>
                                </Form.Field>
                                <Form.Field required>
                                    <Form.Input fluid type='password' placeholder='Confirm Password' name='password2'
                                                value={this.state.password2}
                                                onChange={(event) => this.updatePassword(event.target)}/>
                                </Form.Field>
                                <Button color='blue' fluid type='submit' size='large'>Register</Button>
                            </Segment>
                            {/*These queries should be run everytime this component is loaded*/}
                            {this.state.username ? this.runUsernameExists() : ""}
                            {this.state.email ? this.runEmailExists() : ""}
                            <Message error list={this.state.errorMessage}/>
                        </Form>
                    </Grid.Column>
                </Grid>

            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        currentUserToken: state.getUserInfo.currentUserToken
    };
}

function mapDispatchToProps(dispatch) {
    return {
        currentUserActions: bindActionCreators(currentUserActions, dispatch)
    };
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(createToken(IndividualRegistration)));

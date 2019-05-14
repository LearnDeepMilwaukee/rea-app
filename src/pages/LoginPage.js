import React from 'react';
import {Form, Button, Grid, Header, Segment, Message} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import createToken from "../queries/User/createToken.js";
import * as currentUserActions from '../redux/actions/currentUserActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { withRouter} from 'react-router-dom';

/**
 * Allows user to login to the site
 * Adapted from the Semantic UI for React Login Form Demo
 *
 * Author: Aaron Murphy
 */
class LoginPage extends React.Component {

    state = {
        username: '',
        password: '',
        submittedUsername: '',
        submittedPassword: '',
        loginFailed: false,
        loginSuccess: false
    };

    handleChange = (e, {name, value}) => {
        this.setState({[name]: value});
    };

    handleSubmit = () => {
        const {username, password} = this.state;
        this.setState({submittedUsername: username, submittedPassword: password});

        let mutationVariables = {
            username: username,
            password: password
        };
        console.log(this.props);
        this.props.createToken({variables: mutationVariables}).then((response) => {
            console.log("State is");
            console.log(this.state);
            let token = response.data.createToken.token;
            this.props.currentUserActions.setCurrentUserToken(token);
            if (this.props.currentUserToken !== "N/A") {
                this.setState({loginFailed: false});
                // DISPLAY SUCCESS / REDIRECT
                this.setState({loginSuccess: true});
            }
        }).catch((error) => {
            if (error.message.includes("'NoneType' object has no attribute")) {
                //Incorrect login, give the user a heads up that the login details are wrong
                this.setState({loginFailed: true});
            }
            console.log(error);
        });
    };

    componentDidUpdate() {
        if (this.state.loginSuccess) {
            this.props.history.push("/");
            window.location.reload();
        }
    }

    render() {
        const {username, password} = this.state;
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
                                Log-in to Makerspace
                            </Header>
                            <Form size='large' onSubmit={this.handleSubmit} error={this.state.loginFailed}>
                                <Segment stacked>
                                    <Form.Field required>
                                        <Form.Input fluid placeholder='Username' name='username' value={username}
                                                    onChange={this.handleChange}/>
                                    </Form.Field>
                                    <Form.Field required>
                                        <Form.Input fluid type='password' placeholder='Password' name='password'
                                                    value={password}
                                                    onChange={this.handleChange}/>
                                    </Form.Field>
                                    <Button color='blue' fluid type='submit' size='large'>Login</Button>
                                </Segment>
                                <Message error header='Login attempt failed!'
                                         list={["Please check your credentials!"]}/>
                            </Form>
                        </Grid.Column>
                </Grid>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentUserToken: state.getUserInfo.currentUserToken,
        currentUserId: state.getUserInfo.currentUserId,
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
)(createToken(LoginPage)));
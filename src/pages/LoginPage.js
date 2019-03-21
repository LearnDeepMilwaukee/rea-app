import React from 'react';
import {Form, Button, Grid, Header} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import createToken from "../queries/createToken.js";
import * as currentUserActions from '../redux/actions/currentUserActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class LoginPage extends React.Component {

    state = {
        username: '',
        password: '',
        submittedUsername: '',
        submittedPassword: ''
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
            let token = response.data.createToken.token;
            this.props.currentUserActions.setCurrentUserToken(token);
            if(this.props.currentUserToken !== "N/A"){
                // DISPLAY SUCCESS / REDIRECT
            }
            // console.log(token);
        }).catch((error) => {
            console.log("Caught an error");
            if (error.message.includes("'NoneType' object has no attribute")) {
                //Incorrect login, give the user a heads up that the login details are wrong
            }
            console.log(error);
        });
    };


    render() {
        const {username, password} = this.state;
        return (
            <div>
                <Grid textAlign='center' style={{height: '100%'}} verticalAlign='middle' columns={1} centered>
                    <Grid.Row>
                        <Grid.Column style={{maxWidth: 450}}>
                            <Header as='h2' textAlign='center'>
                             Log-in to Makerspace
                         </Header>
                            <Form size='large' onSubmit={this.handleSubmit}>
                                <Form.Field required>
                                    <Form.Input fluid placeholder='Username' name='username' value={username}
                                            onChange={this.handleChange}/>
                                </Form.Field>
                                <Form.Field required>
                                    <Form.Input fluid type='password' placeholder='Password' name='password' value={password}
                                            onChange={this.handleChange}/>
                                </Form.Field>
                                <Button type='submit'>Submit</Button>
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(createToken(LoginPage));
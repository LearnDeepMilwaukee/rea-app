import React from 'react';
import {Form, Button} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import createToken from "../queries/createToken.js";

class LoginPage extends React.Component {

    state = {
        username: '',
        password: '',
        submittedUsername: '',
        submittedPassword: ''
    };

    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value });
    };

    handleSubmit = () => {
        const { username, password } = this.state;

        this.setState({ submittedUsername: username, submittedPassword: password });
        console.log(this.state);

        let mutationVariables = {
            username: username,
            password: password
        };

        console.log(this.props);
        this.props.createTokenMutation({variables: mutationVariables}).then((response) => {
            let token = response.data.createToken.token;
            console.log(response);
            //console.log(token);
        }).catch((error) => {
             console.log(error);
        });
    };


    render() {
        const { username, password } = this.state;
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Field required>
                        <label>Username</label>
                        <Form.Input width={4} placeholder='Username' name='username' value={username} onChange={this.handleChange}/>
                    </Form.Field>
                    <Form.Field required>
                        <label>Password</label>
                        <Form.Input width={4} type='password' placeholder='Password' name='password' value={password} onChange={this.handleChange}/>
                    </Form.Field>
                    <Button type='submit'>Submit</Button>
                </Form>
            </div>
        );
    }
}




export default createToken(LoginPage);
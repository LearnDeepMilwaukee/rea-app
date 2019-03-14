import React from 'react';
import {Form, Button} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

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

        this.setState({ submittedName: username, submittedPassword: password });
        console.log(this.state);
    };


    render() {
        const { username, password } = this.state;
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Field required>
                        <label>Username</label>
                        <Form.Input placeholder='Username' name='username' value={username} onChange={this.handleChange}/>
                    </Form.Field>
                    <Form.Field required>
                        <label>Password</label>
                        <Form.Input type='password' placeholder='Password' name='password' value={password} onChange={this.handleChange}/>
                    </Form.Field>
                    <Button type='submit'>Submit</Button>
                </Form>
            </div>
        );
    }
}




export default LoginPage;
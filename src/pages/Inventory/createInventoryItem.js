import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Form, Button, Grid, Header, Segment, Image, Label, Icon} from 'semantic-ui-react'

let default_image = require("../../resources/default_resource_img.jpg");

class CreateInventoryItem extends React.Component {
    state = {
        image : default_image
    };
    handleSubmit = () => {
        console.log("Current Org Id")
    };
    onImageSelected = (event) => {
        var file = event.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            this.setState({image:reader.result});
            // this.setState({path: reader.result});
        };
        reader.onerror = (error) => {
            console.log("Error", error);
        };
    };
    render() {
        return (
            <div className='createItem'>
                <style>{`
                body > div,
                body > div > div,
                body > div > div > div.createItem {
                    height: 100%;
                }
            `}
                </style>
                <Grid textAlign='center' style={{height: '100%'}} verticalAlign='middle'>>
                    <Grid.Column style={{maxWidth: 450}}>
                        <Header as='h2' textAlign='center'>
                            Create an Item
                        </Header>
                        <Form size='large' onSubmit={this.handleSubmit}>
                            <Segment stacked>
                                <Form.Field>
                                    <Form.Input fluid placeholder='Tracking Identifier' name='Tracking Identifier'
                                                onChange={this.handleChange}/>
                                </Form.Field>
                                <Form.Field>
                                    <Form.Input fluid placeholder='Image' name='Image'
                                                onChange={this.handleChange}/>
                                </Form.Field>
                                <Form.Field>
                                    <Form.Input fluid placeholder='Note' name='note'
                                                onChange={this.handleChange}/>
                                </Form.Field>
                                <Form.Field>
                                    <Grid>
                                        <Grid.Column floated='left' width={7}>
                                            <Form.Input fluid placeholder='Quantity' name='quantity' right
                                                        onChange={this.handleChange}/>
                                        </Grid.Column>
                                        <Grid.Column floated='right' width={9}>
                                            <Form.Input fluid placeholder='Units' name='Units' left
                                                        onChange={this.handleChange}/>
                                        </Grid.Column>
                                    </Grid>
                                </Form.Field>
                                <Form.Field>

                                    <Image src={this.state.image} size='small' centered/>


                                </Form.Field>

                                <Form.Field centered >
                                    <Label as="label" htmlFor="imageButton" size="large" width="6">
                                        Upload Image
                                    </Label>
                                    <input id="imageButton" hidden type="file" accept="image/*" onChange={(event) => this.onImageSelected(event)}/>
                                </Form.Field>


                                <Button color='blue' fluid type='submit' size='large'>Create</Button>
                            </Segment>

                        </Form>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        currentOrgId: state.getUserInfo.currentOrgId,
    };
}


export default withRouter(connect(
    mapStateToProps
)(CreateInventoryItem));
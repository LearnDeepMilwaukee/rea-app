import React from 'react';
import createOrganization from "../queries/createOrganization.js";
import GetOrganizationTypes from "../queries/getAllOrganizationTypes.js";
import {isNullOrUndefined, isUndefined} from "util";
import createPlace from "../queries/createPlace.js";
import {Form, Label, Grid} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'

export const OrgTypeList = GetOrganizationTypes(({orgTypeList, loading, error}) => {
    let options = [];
    if (!isNullOrUndefined(orgTypeList)) {
        orgTypeList.forEach(function (element) {
            options.push({key: element.id, text: element.name, value: element.id})
        })
    }
    return (
        loading ? <p>Loading...</p> : (
            error ? <p style={{color: "#F00"}}>API error</p> : (
                <Form.Select fluid options={options} placeholder="Type" required/>
            )
        )
    );
});

const StateList = () => {
    let states = ["Alabama", "Arkansas", "Arizona", "Alaska", "California", "Colorado",
        "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana",
        "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
        "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
        "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
        "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virgina",
        "Washington", "West Virginia", "Wisconsin", "Wyoming"];
    let options = [];
    states.forEach(function (element) {
        options.push({key: element, text: element, value: element})


    });
    return (

        <Form.Select fluid options={options} placeholder="Select a State" required />

    );
};

export const OrganizationRegistration = () => {
    return (
        <div>
            <Form.Group>

                <Grid columns={2} padded>
                    <Grid.Row>
                        <Grid.Column width={3}>
                            <Label size='big'>Organization Name</Label>
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <Form.Input fluid placeholder="Enter you Organization's name here" required width={4}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={3}>
                            <Label size='big'>Organization Type</Label>
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <OrgTypeList
                                token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNvbm5vciIsImlhdCI6MTU1MTg0ODI3MSwicGFzc3dvcmQiOiI3YzA4ODliOWU5ZmNjYzAxZDIzMDcwNzljNDk5OTcyNDFlNTZlNzU0IiwiaWQiOjZ9.unIuk6g8HcmyIuF1sONrLAiftApTlcuqMWWLO6DtqUQ"/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={3}>
                            <Label size='big'>Street Address</Label>
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <Form.Input fluid placeholder="Street Address" required/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={3}>
                            <Label size='big'>State</Label>
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <StateList/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={3}>
                            <Label size='big'>City</Label>
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <Form.Input fluid placeholder="City" required/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={3}>
                            <Label size='big'>Zipcode</Label>
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <Form.Input fluid placeholder="Zipcode" required/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={3}>
                            <Label size='big'>Description</Label>
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <Form.Input fluid placeholder="Enter a description for your Organization" required/>
                        </Grid.Column>
                    </Grid.Row>

                </Grid>
            </Form.Group>
        </div>

    )
};

export default OrganizationRegistration;

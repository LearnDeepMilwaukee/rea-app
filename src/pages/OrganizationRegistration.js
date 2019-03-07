import React from 'react';
import createOrganization from "../queries/createOrganization.js";
import GetOrganizationTypes from "../queries/getAllOrganizationTypes.js";
import {isNullOrUndefined, isUndefined} from "util";
import createPlace from "../queries/createPlace.js";
import {Form} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'

export const OrgTypeList = GetOrganizationTypes(({orgTypeList, loading, error}) => {
    let options = [];
    if(!isNullOrUndefined(orgTypeList)){
        orgTypeList.forEach(function(element) {
            options.push({key: element.id, text: element.name, value: element.id})
        })
    }
    return (
        loading ? <p>Loading...</p> : (
            error ? <p style={{color: "#F00"}}>API error</p> : (
                <Form.Select fluid label='Organization Type' options={options} placeholder="Type" required/>
            )
        )
    );
});

export const OrganizationRegistration = () => {
    return (
        <div>
            <Form.Group>
                <Form.Input fluid label='Organization Name' placeholder="Enter your Organization's name here" required />
                <OrgTypeList token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNvbm5vciIsImlhdCI6MTU1MTg0ODI3MSwicGFzc3dvcmQiOiI3YzA4ODliOWU5ZmNjYzAxZDIzMDcwNzljNDk5OTcyNDFlNTZlNzU0IiwiaWQiOjZ9.unIuk6g8HcmyIuF1sONrLAiftApTlcuqMWWLO6DtqUQ"/>
                <Form.Input fluid label='Street Address' placeholder="Street Address" required />
                <Form.Input fluid label='City' placeholder="City" required />
                <Form.Input fluid label='Zipcode' placeholder="Zipcode" required />
                <Form.TextArea label='Organization Description' placeholder='Enter your description here' />

            </Form.Group>
        </div>

    )
};

export default OrganizationRegistration;

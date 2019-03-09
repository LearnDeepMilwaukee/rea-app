import React from 'react';
import getAllOrganizations from "../queries/getAllOrganizations.js"
import {Item, Button} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import {isNullOrUndefined} from "util"
import {getDistanceBetweenPoints} from "../utilities.js";

let default_image = require("../resources/defaultImage.jpg");
let msoeCC = {latitude: 43.044004, longitude: -87.909020};
const orgCard = (agent) => (
    <Item>
        <Item.Image src={isNullOrUndefined(agent.image) || agent.image === "" ? default_image : agent.image}/>

        <Item.Content>
            <Item.Header as='h1' >{agent.name}</Item.Header>

            <Item.Description>
                <p floated='left'>{isNullOrUndefined(agent.primaryLocation) ? "" : agent.primaryLocation.address}</p>
                <p floated='right'>{isNullOrUndefined(agent.primaryLocation) ? "" : "Distance: "+getDistanceBetweenPoints(agent.primaryLocation, msoeCC)+" mi"}</p>
            </Item.Description>
            <Item.Extra>
                <Button floated='right' color='blue' size='large'>Connect</Button>
            </Item.Extra>
        </Item.Content>
    </Item>
)

const OrgList = getAllOrganizations(({organizationList, loading, error}) => {
    if (loading) {
        console.log("LOADING");
        return (
            <strong>Loading...</strong>
        );
    } else if (error) {
        console.log(error);

        return (
            <p style={{color: "#F00"}}>API error</p>
        );
    } else {
        console.log(organizationList);
        const cardsArray = organizationList.map(org => (
            orgCard(org)
        ));
        return (
            <div>
                <Item.Group divided>
                    {cardsArray}
                </Item.Group>
            </div>
        );
    }
});

class BasePage extends React.Component {
    render() {
        return (
            <div>
                <OrgList
                    token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNvbm5vciIsImlhdCI6MTU1MTg0ODI3MSwicGFzc3dvcmQiOiI3YzA4ODliOWU5ZmNjYzAxZDIzMDcwNzljNDk5OTcyNDFlNTZlNzU0IiwiaWQiOjZ9.unIuk6g8HcmyIuF1sONrLAiftApTlcuqMWWLO6DtqUQ"/>
            </div>
        )
    }
}




export default BasePage;
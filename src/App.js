import React, {Component} from 'react';
import {ApolloProvider} from "react-apollo";
import ApolloClient from "apollo-boost";
import getAllOrganizations from "./getAllOrganizations.js";
import {Item} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import {isNullOrUndefined} from "util";

const client = new ApolloClient({uri: "http://localhost:8000/api/graph"});
let default_image = require("./defaultuserimg.jpg");
const orgCard = (agent) => (
    <Item>
        <Item.Image src={isNullOrUndefined(agent.image) || agent.image === "" ? default_image : agent.image}/>

        <Item.Content>
            <Item.Header as='p'>{agent.name}</Item.Header>
            <Item.Meta>
                <span>{isNullOrUndefined(agent.primaryLocation) ? "" : agent.primaryLocation.address}</span>
            </Item.Meta>
            <Item.Description>{agent.note}</Item.Description>

        </Item.Content>
    </Item>
);

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

class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <OrgList
                    token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNvbm5vciIsImlhdCI6MTU1MTg0ODI3MSwicGFzc3dvcmQiOiI3YzA4ODliOWU5ZmNjYzAxZDIzMDcwNzljNDk5OTcyNDFlNTZlNzU0IiwiaWQiOjZ9.unIuk6g8HcmyIuF1sONrLAiftApTlcuqMWWLO6DtqUQ"/>
            </ApolloProvider>
        );
    }
}

export default App;

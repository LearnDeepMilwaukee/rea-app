import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import {withRouter} from 'react-router-dom';
import {Form, Button, Grid, Header, Segment, Image, Label, Message} from 'semantic-ui-react'
import createEconomicEvent from "../../queries/EconomicEvent/CreateEconomicEvent";
import getMyAgent from "../../queries/Agent/getMyAgent";
import GetUnits from "../../queries/Unit/getAllUnits";
import createResourceClassification from "../../queries/ResourceClassification/createResourceClassification";


let default_image = require("../../resources/default_resource_img.jpg");
let units = "";
let unitExists = undefined;
let mutationVars = [];

const GetMyAgent = getMyAgent(({agent, loading, error}) => {

    if (!loading && !error) {
        mutationVars["providerId"] = agent.id;
    }
    return (
        <div/>
    );
});

const UnitExist = GetUnits(({unitList, loading, error}) => {
    console.log("calling");
    if (!loading && !error) {
        for (let i = 0; i < unitList.length; i++) {
            if (units.toLowerCase() === unitList[i].name.toLowerCase()) {
                unitExists = true;
                return <div/>;
            }
        }
        unitExists = false;
    }
    return <div/>;
});


class CreateInventoryItem extends React.Component {
    state = {
        image: default_image,
        orgId: this.props.match.params.orgId,
        name: "",
        notes: "",
        quantity: "",
        units: "",
        userRan: false
    };




    createItem = () => {
        let createdItem = false;
        console.log(mutationVars);
        while (!createdItem) {
            //Case where the unit already exists in the backend
            if(unitExists === true){
                createdItem = true;

                this.props.createResourceClassification({variables: mutationVars}).then((response) => {
                    mutationVars["affectedResourceClassifiedAsId"] = response.data.createResourceClassification.resourceClassification.id;
                    this.props.createEconomicEvent({variables: mutationVars}).then((response) => {
                        console.log("Created");
                        return <Message visible content="The item has been created"/>;
                        // let economicEvent = response.data.createEconomicEvent.economicEvent;

                    }).catch((error) => {
                        console.log(error);
                    });
                }).catch((error) => {
                    console.log(error)
                });
            }

            //Case where the unit doesn't exists in the backend
            else if(unitExists === false){
                createdItem = true;

                this.props.createResourceClassification({variables: mutationVars}).then((response) => {
                    mutationVars["affectedResourceClassifiedAsId"] = response.data.createResourceClassification.resourceClassification.id;
                    this.props.createEconomicEvent({variables: mutationVars}).then((response) => {
                        return <Message visible content="The item has been created"/>;
                        // let economicEvent = response.data.createEconomicEvent.economicEvent;

                    }).catch((error) => {
                        console.log(error);
                    });
                }).catch((error) => {
                    console.log(error)
                });
            }

        }

    };
    handleSubmit = () => {

        mutationVars["receiverId"] = this.state.orgId;
        mutationVars["createResource"] = true;
        mutationVars["resourceImage"] = this.state.image;
        mutationVars["affectedUnitId"] = 4;
        mutationVars["resourceNote"] = this.state.notes;
        mutationVars["action"] = "produce";
        mutationVars["affectedNumericValue"] = this.state.quantity;
        mutationVars["resourceTrackingIdentifier"] = this.state.name;
        mutationVars["name"] = this.state.name;
        mutationVars["scopeId"] = this.state.orgId;
        mutationVars["unit"] = this.state.units;

        this.setState({userRan: true});
        this.createItem();

    };
    handleChange = (e, {name, value}) => {
        this.setState({[name]: value});
        if (name === "units") {
            units = value;
        }
    };

    onImageSelected = (event) => {
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            this.setState({image: reader.result});
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
                    (currentAgentId === -1 ? <GetMyAgent/> :
                    <div/>
                    )

                </style>
                <Grid textAlign='center' style={{height: '100%'}} verticalAlign='middle'>
                    <Grid.Column style={{maxWidth: 450}}>
                        <Header as='h2' textAlign='center'>
                            Create an Item
                        </Header>
                        <Form size='large' onSubmit={this.handleSubmit}>
                            <Segment stacked>
                                <Form.Field>
                                    <Form.Input fluid placeholder='Tracking Identifier' name='name'
                                                value={this.state.name}
                                                onChange={this.handleChange}/>
                                </Form.Field>
                                <Form.Field>
                                    <Form.Input fluid placeholder='Notes' name='notes' value={this.state.notes}
                                                onChange={this.handleChange}/>
                                </Form.Field>
                                <Form.Field>
                                    <Grid>
                                        <Grid.Column floated='left' width={7}>
                                            <Form.Input fluid placeholder='Quantity' name='quantity' right="true"
                                                        value={this.state.quantity}
                                                        onChange={this.handleChange}/>
                                        </Grid.Column>
                                        <Grid.Column floated='right' width={9}>
                                            <Form.Input fluid placeholder='Units' name='units' left="true"
                                                        value={this.state.units}
                                                        onChange={this.handleChange}/>
                                        </Grid.Column>
                                    </Grid>
                                </Form.Field>
                                <Form.Field>
                                    <Image src={this.state.image} size='small' centered/>
                                </Form.Field>

                                <Form.Field>
                                    <Grid centered>
                                        <Grid.Column width={6}>
                                            <Label as="label" htmlFor="imageButton" size="large" width={6}>
                                                Upload Image
                                            </Label>
                                            <input id="imageButton" hidden type="file" accept="image/*"
                                                   onChange={(event) => this.onImageSelected(event)}/>
                                        </Grid.Column>

                                    </Grid>

                                </Form.Field>
                                <Button color='blue' fluid type='submit' size='large'>Create</Button>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
                {this.state.userRan ? <UnitExist/> : <div/>}
            </div>
        );

    }
}


export default withRouter(createResourceClassification(createEconomicEvent(CreateInventoryItem)));
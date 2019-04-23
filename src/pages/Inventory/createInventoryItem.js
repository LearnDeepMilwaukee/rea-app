import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import {withRouter} from 'react-router-dom';
import {Form, Button, Grid, Header, Segment, Image, Label, Message} from 'semantic-ui-react'
import createEconomicEvent from "../../queries/EconomicEvent/CreateEconomicEvent";
import getMyAgent from "../../queries/Agent/getMyAgent";
import GetUnits from "../../queries/Unit/getAllUnits";
import createResourceClassification from "../../queries/ResourceClassification/createResourceClassification";
import createUnit from "../../queries/Unit/createUnit";

let default_image = require("../../resources/default_resource_img.jpg");
let units = "";
let mutationVars = [];
let createItemUnitExists;
let createItemUnitDoesNotExist;

const GetMyAgent = getMyAgent(({agent, loading, error}) => {

    if (!loading && !error) {
        mutationVars["providerId"] = agent.id;
    }
    return (
        <div/>
    );
});


const UnitExist = GetUnits(({unitList, loading, error}) => {
    if (!loading && !error) {
        console.log(units);
        for (let i = 0; i < unitList.length; i++) {
            console.log(unitList[i].name);
            if (units.toLowerCase() === unitList[i].name.toLowerCase()) {
                console.log("Exists");
                return createItemUnitExists();
            }
        }
        return createItemUnitDoesNotExist();
    }
    return <div/>
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

    componentDidMount() {
        createItemUnitExists = this.createItemUnitExists;
        createItemUnitDoesNotExist = this.createItemUnitDoesNotExist;
    }

    createItemUnitExists = () => {
        this.props.createResourceClassification({variables: mutationVars}).then((response) => {
            mutationVars["affectedResourceClassifiedAsId"] = response.data.createResourceClassification.resourceClassification.id;
            this.props.createEconomicEvent({variables: mutationVars}).then((response) => {
                console.log("Created");
                return <Message visible content="The item has been created"/>;

            }).catch((error) => {
                console.log(error);
                return <Message error visible content="There was an error when creating the item"/>;
            });
        }).catch((error) => {
            console.log(error);
            return <Message error visible content="There was an error when creating the item"/>;
        });
    };

    createItemUnitDoesNotExist = () => {
        let unitMutationVars = [];
        unitMutationVars["name"] = this.state.units;
        unitMutationVars["symbol"] = this.state.units;
        console.log(unitMutationVars);
        this.props.createUnit({variables: unitMutationVars}).then((response) => {
            console.log(response);
            this.createItemUnitExists();
        }).catch((error) => {
            console.log(error);
            return <Message error visible content="There was an error when creating the item"/>;
        });
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
                {this.state.userRan ? <UnitExist/> : <div/>}

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
            </div>
        );

    }
}


export default withRouter(createUnit(createResourceClassification(createEconomicEvent(CreateInventoryItem))));
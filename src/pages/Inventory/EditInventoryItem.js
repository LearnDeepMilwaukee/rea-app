import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import {withRouter} from 'react-router-dom';
import {Form, Button, Grid, Header, Segment, Image, Label, Message, Modal} from 'semantic-ui-react'
import createEconomicEvent from "../../queries/EconomicEvent/CreateEconomicEvent";
import GetUnits from "../../queries/Unit/getAllUnits";
import createResourceClassification from "../../queries/ResourceClassification/createResourceClassification";
import createUnit from "../../queries/Unit/createUnit";
import updateEconomicResource from "../../queries/EconomicResource/updateEconominResource";
import getMyAgent from "../../queries/Agent/getMyAgent";


let default_image = require("../../resources/default_resource_img.jpg");
let units = "";
let mutationVars = [];
let editItem;
let running = false;

const GetMyAgent = getMyAgent(({agent, loading, error}) => {

    if (!loading && !error) {
        mutationVars["providerId"] = agent.id;
    }
    return (
        <div/>
    );
});

const UnitExist = GetUnits(({unitList, loading, error}) => {
    running = true;
    if (!loading && !error) {
        for (let i = 0; i < unitList.length; i++) {
            if (units.toLowerCase() === unitList[i].name.toLowerCase()) {
                return <div>{editItem()}</div>
            }
        }
    }

    return <div/>
});

class EditInventoryItem extends React.Component {
    state = {
        image: default_image,
        orgId: this.props.orgId,
        name: "",
        notes: "",
        quantity: "",
        units: "",
        userRan: false,
        messageToDisplay: "",
        error: false,
        success: false
    };

    constructor(props) {
        super(props);
        if (this.props.resource !== undefined) {
            this.state = {
                name: this.props.resource.trackingIdentifier,
                notes: this.props.resource.note,
                quantity: this.props.resource.currentQuantity.numericValue,
                units: this.props.resource.currentQuantity.unit.name,
                image: this.props.resource.image
            };

            if(this.props.resource.image === undefined){
                this.setState({image: default_image});
            }
            units = this.props.resource.currentQuantity.unit.name;
        }

    }

    componentDidMount() {
        editItem = this.editItem;
    }

    editItem = () => {

        this.props.createEconomicEvent({variables: mutationVars}).then(() => {

                mutationVars = [];

                //Apply mutation vars for updateEconomicResource
                mutationVars["id"] = this.props.resource.id;
                mutationVars["image"] = this.state.image;
                mutationVars["trackingIdentifier"] = this.state.name;
                mutationVars["note"] = this.state.notes;


                this.props.updateEconomicResource({variables: mutationVars}).then(() => {
                    running = false;
                    mutationVars = [];
                    this.setState({error: false, messageToDisplay: "Item successfully updated", success: true});
                    return <div/>;
                }).catch((error) => {
                    running = false;
                    console.log(error);
                    this.setState({error: true, messageToDisplay: "There was an error when editing the item"});
                    return <div/>;
                });
        }).catch((error) => {
                running = false;
                console.log(error);
                this.setState({error: true, messageToDisplay: "There was an error when editing the item"});
                return <div/>;
            });
    };

    handleSubmit = () => {

        editItem = this.editItem;

        if(isNaN(Number(this.state.quantity))){
            this.setState({error: true, messageToDisplay: "Quantity must be a number!"})
        }else{
            var change = this.state.quantity - this.props.resource.currentQuantity.numericValue;

            mutationVars["receiverId"] = this.props.orgId;
            mutationVars["createResource"] = false;
            mutationVars["resourceImage"] = this.props.resource.image;
            mutationVars["affectedUnitId"] = 4;
            mutationVars["resourceNote"] = this.props.resource.notes;
            mutationVars["action"] = "produce";
            mutationVars["affectedNumericValue"] = change;
            mutationVars["resourceTrackingIdentifier"] = this.props.resource.trackingIdentifier;
            mutationVars["name"] = this.props.resource.trackingIdentifier;
            mutationVars["scopeId"] = this.props.orgId;
            mutationVars["unit"] = this.state.units;
            mutationVars["affectsId"] = this.props.resource.id;
            mutationVars["affectedResourceClassifiedAsId"] = this.props.resource.resourceClassifiedAs.id;

            this.setState({userRan: true});
        }

    };

    handleChange = (e, {name, value}) => {
        this.setState({[name]: value});
        if (name === "units") {
            units = value;
        }
        if (this.state.success) {
            this.setState({success: false})
        }
        if (this.state.error) {
            this.setState({error: false})
        }
    };

    onImageSelected = (event) => {
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            this.setState({image: reader.result, error: false});
        };
        reader.onerror = (error) => {
            this.setState({error: true, messageToDisplay: "There was an error when processing the image"});
            console.log(error);
        };
    };

    onClose = () => {
        window.location.reload();
    };

    render() {
        return (
            <Modal trigger={<Button className="ui right floated primary">Edit</Button>} basic closeIcon centered onClose={this.onClose}>
                <Modal.Content>
            <div className='editItem'>
                <style>{`
                body > div,
                body > div > div,
                body > div > div > div.createItem {
                    height: 100%;
                }
            `}
                    {mutationVars["providerId"] === undefined ? <GetMyAgent/> :
                        <div/>
                    }


                </style>
                {this.state.userRan && !running ? <UnitExist/> : <div/>}
                <Grid textAlign='center' style={{height: '100%'}} verticalAlign='middle'>
                    <Grid.Column style={{maxWidth: 450}}>
                        <Header as='h2' textAlign='center'>
                            Edit Item
                        </Header>
                        <Form size='large' onSubmit={this.handleSubmit}>
                            <Segment stacked>
                                <Form.Field>
                                    <Form.Input fluid placeholder='Name' name='name'
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
                                            <Form.Input fluid disabled placeholder='Units' name='units' left="true"
                                                        value={this.state.units}
                                                        onChange={this.handleChange}/>
                                        </Grid.Column>
                                    </Grid>
                                </Form.Field>
                                <Form.Field>
                                    <Image src={this.state.image} size='small' centered onError={i => i.target.src = default_image}/>
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
                                <Button color='blue' fluid type='submit' size='large'>Save</Button>
                            </Segment>
                        </Form>

                        {this.state.error ? <Message color="red" error visible content={this.state.messageToDisplay}/> :
                            <div/>}
                        {this.state.success ? <Message color="green" visible content={this.state.messageToDisplay}/> :
                            <div/>}
                    </Grid.Column>
                </Grid>
            </div>
                </Modal.Content>
            </Modal>
        );

    }
}

export default withRouter(createUnit(createResourceClassification(createEconomicEvent(updateEconomicResource(EditInventoryItem)))));
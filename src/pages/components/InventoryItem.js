import * as React from "react";
import {Item, Button} from "semantic-ui-react";
import {isNullOrUndefined} from "util"

let default_image = require("../../resources/defaultImage.jpg");



class InventoryItem extends React.Component{



    constructor(item) {
        super();
    }

    render() {
        console.log("Item:")
        console.log(this.props)

        return(
                <Item>
                    <Item.Image className={"ui small rounded image"} src={isNullOrUndefined(this.item.image) || this.item.image === "" ? default_image : this.item.image} onError={i => i.target.src=default_image}/>
                    <Item.Content>
                        <Item.Header as='h1' >{this.item.trackingIdentifier}</Item.Header>
                        <Item.Description>
                            <p>{(this.props.itemData.note === "") ? "(no description available)" : this.item.note}</p>
                            <p>Quantity: {this.item.currentQuantity.numericValue} {this.item.currentQuantity.unit.name}(s)</p>
                            <p>Added on: {this.item.createdDate}</p>
                        </Item.Description>
                        <Item.Extra>
                            <Button className="ui right floated primary">Edit</Button>
                        </Item.Extra>
                    </Item.Content>
                </Item>

    )}

}

export default InventoryItem
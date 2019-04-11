import * as React from "react";
import {Item, Button} from "semantic-ui-react";



class InventoryItem extends React.Component{
    constructor() {
        super();

    }

    render() {

        return(
                <Item classname={""}>
                    <Item.Image className={"ui small rounded image"} src={isNullOrUndefined(economicResource.image) || economicResource.image === "" ? default_image : economicResource.image} onError={i => i.target.src=default_image}/>
                    <Item.Content>
                        <Item.Header as='h1' >{economicResource.trackingIdentifier}</Item.Header>
                        <Item.Description>
                            <p>{(economicResource.note === "") ? "(no description available)" : economicResource.note}</p>
                            <p>Quantity: {economicResource.currentQuantity.numericValue} {economicResource.currentQuantity.unit.name}(s)</p>
                            <p>Added on: {economicResource.createdDate}</p>
                        </Item.Description>
                        <Item.Extra>
                            <Button className="ui right floated primary">Edit</Button>
                        </Item.Extra>
                    </Item.Content>
                </Item>

    )}

}

export default InventoryItem
import * as React from "react";
import InventoryItem from "./components/InventoryItem"
import getAllMyOrgs from "../queries/Agent/getAllMyOrgs"
import getAllEconomicResources from "../queries/EconomicResource/getAllEconomicResources"
import {Item} from "semantic-ui-react";

class SearchResults extends React.Component{
    constructor(){
        super()
    }

    getAllMyOrgs(){
        const myOrgList = getAllMyOrgs(({organizationList, loading, error}) => {
            if (loading) {
                console.log("Loading current users orgs for inv search results.")
                return (
                    <strong>Loading...</strong>
                );
            } else if (error) {
                console.log(error)
                return (
                    <p style={{color: "#F00"}}>API error</p>
                );
            } else {
                return ( organizationList )
            }
        });
    }

    getOrgsInv(orgID){

    }

    getAllInvItems(){
        console.log("Hello")
        // let myOrgList = getAllMyOrgs
        let allInvItems = getAllEconomicResources(({inventoryItems, loading, error}) => {
            console.log("hello")
            if (loading) {
                console.log("Loading inventory search results.")
                return (
                    <strong>Loading inventory search results...</strong>
                );
            } else if (error) {
                console.log(error)
                return (
                    <p style={{color: "#F00"}}>API error</p>
                );
            } else {
                const itemsArray = inventoryItems.map(item => (
                    <InventoryItem itemData={item}/>
                ))
                return (
                    <div>
                        <Item.Group divided>
                            {itemsArray}
                        </Item.Group>
                    </div>
                );
            }
        });

        // let itemCards = [0]
        // console.log('all items')
        // console.log(allInvItems)
        // for(let item in allInvItems){
        //     itemCards.push(item)
        // }

        return (
            <Item.Group divided>
                {allInvItems}
            </Item.Group>
        )
    }

    render() {
        let items = this.getAllInvItems();
        return(
            <div className={"ui container"}>
                    {items}
            </div>
        )
    }



}

export default SearchResults
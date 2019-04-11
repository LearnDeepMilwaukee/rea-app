import * as React from "react";
import InventoryItem from "./components/InventoryItem"
import getAllMyOrgs from "../queries/Agent/getAllMyOrgs";
import {filterByDistance, filterByType, sortByDistance, sortByName} from "../utilities";
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
        let myOrgList = getAllMyOrgs
    }

    render() {




        return(
            <div className={"ui container"}>
                <div className="ui divided items">
                    <InventoryItem/>
                    <InventoryItem/>
                    <InventoryItem/>
                </div>
            </div>
        )
    }



}

export default SearchResults
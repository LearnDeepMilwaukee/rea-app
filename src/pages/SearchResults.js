import * as React from "react";
import InventoryItem from "./components/InventoryItem"

class SearchResults extends React.Component{
    constructor(){
        super()
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
import * as React from "react";


class InventoryItem extends React.Component{
    constructor() {
        super();

    }

    render() {

        return(
            <div className="item">
                <div className="image">
                    <img src="https://bobandsuewilliams.com/images/random-18.jpg"/>
                </div>
                <div className="content">
                    <a className="header">Watchmen</a>
                    <div className="meta">
                        <span className="cinema">IFC</span>
                    </div>
                    <div className="description">
                        <p></p>
                    </div>
                    <div className="extra">
                        <div className="ui right floated primary button">
                            Buy tickets
                            <i className="right chevron icon"></i>
                        </div>
                    </div>
            </div>
        </div>


    )}

}

export default InventoryItem
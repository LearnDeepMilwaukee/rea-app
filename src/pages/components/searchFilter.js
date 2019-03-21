import * as React from "react";
import * as pageTheme from "../oldReaapp/catalogStyle.scss";
import * as themable from "react-themeable";
import {sortByName, sortByDistance, getDistanceBetweenPoints, filterByType, filterByDistance} from "../oldReaapp/utilities"




class OrgFilter extends React.Component{


    constructor() {
        super();
        this.state = {
            sorting: "alphabetical",
            typeFilter: "All",
            distanceFilter: 50,
            load: true,
            nameFilter: "",
            myOrgsFilter: false,
            pubOrgsFilter: true
        };
    }

    onSortFilterChange = function (value) {
        this.setState({sorting: value});
    };

    onTypeFilterChange = function (value) {
        this.setState({typeFilter: value});
    };

    //Override is here for the distance slider so that it updates the value as well.
    onDistanceFilterChange = function (event, override) {
        if (event.key === 'Enter' || override) {
            this.setState({distanceFilter: event.target.value});
        }
    };

    handleReset = function (env) {
        env.setState({
            distanceFilter: 50,
            sorting: "alphabetical",
            typeFilter: "All",
            nameFilter: "",
            myOrgsFilter: false,
            pubOrgsFilter: true
        });

    };
    onNameChange = function (event) {
        if (event.key === 'Enter') {
            this.setState({nameFilter: event.target.value});
        }
    };
    onMyOrgsChange = function (value) {
        this.setState({myOrgsFilter: value});
    };
    onPubOrgsChange = function (value) {
        this.setState({pubOrgsFilter: value});
    };

    notImplementedFunction = function () {
        alert("This feature is not yet implemented");
    };

    render() {
        let page_theme = themable(pageTheme);


        return (
            <div className="ui grid" >
                <div className="row">
                    <div className="two wide column">
                        <input id={'orgName'} type="text" onKeyPress={(event) => this.onNameChange(event)}
                               defaultValue={this.state.nameFilter}/>
                    </div>
                    <div className="column">

                    </div>
                    <div className="column">
                        <label {...page_theme(9, "max-distance-label")}>Max Distance(mi):</label>
                        <input onKeyPress={(event) => {
                            this.onDistanceFilterChange(event, false)
                        }} type={'number'} min={1} name={'maxDistText'} defaultValue={this.state.distanceFilter}
                               style={{width: '50px'}}/>
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        <label>Public</label>
                        <input type="checkbox" checked={this.state.pubOrgsFilter} onClick={(event) => {
                            this.checked = !this.checked;
                            this.onPubOrgsChange(event.target.checked)
                        }}/>
                    </div>
                    <div className="column">
                        <label>My Orgs</label>
                        <input type="checkbox" checked={this.state.myOrgsFilter} onClick={(event) => {
                            this.checked = !this.checked;
                            this.onMyOrgsChange(event.target.checked)
                        }}/>
                    </div>
                    <div className="column">
                        <label>1 mi</label>
                        <input type={'range'} name={'maxDistRange'} min={1} max={100} onMouseUp={(event) => {
                            this.onDistanceFilterChange(event, true)
                        }} defaultValue={this.state.distanceFilter}/>
                        <label>100 mi</label>
                    </div>
                    <div className="column">
                        <label>Type:</label><br/>
                        <select onChange={(event) => this.onTypeFilterChange(event.target.value)} style={{width: '100px'}}>
                            <option selected={this.state.typeFilter === 'All'} value={'All'}>All</option>
                            <option selected={this.state.typeFilter === 'School'} value={'School'}>School</option>
                            <option selected={this.state.typeFilter === 'Church'} value={'Church'}>Church</option>
                            <option selected={this.state.typeFilter === 'For-profit Company'} value={'For-Profit Company'}>
                                For-profit Company
                            </option>
                            <option selected={this.state.typeFilter === 'dividual'} value={'Individual'}>Individual</option>
                            <option selected={this.state.typeFilter === 'Organization'} value={'Organization'}>Organization
                            </option>
                            <option selected={this.state.typeFilter === 'Library'} value={'Library'}>Library</option>
                            <option selected={this.state.typeFilter === 'Makerspace'} value={'Makerspace'}>Makerspace</option>
                            <option selected={this.state.typeFilter === 'Network'} value={'Network'}>Network</option>
                            <option selected={this.state.typeFilter === 'Non-profit Company'} value={'Non-profit Company'}>
                                Non-profit Company
                            </option>
                        </select>
                    </div>
                    <div className="coulumn">
                        <label>Sort:</label>
                        <select onChange={(event) => this.onSortFilterChange(event.target.value)}>
                            <option selected={this.state.sorting === 'alphabetical'} value={'alphabetical'}>Alphabetical</option>
                            <option selected={this.state.sorting === 'distance'} value={'distance'}>Distance</option>
                        </select>
                    </div>
                    <div className="column">
                        <button {...page_theme(13, "negative-button")} onClick={(event) => {
                            this.handleReset(this, event.target.value)
                        }}>Reset filters
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default OrgFilter;
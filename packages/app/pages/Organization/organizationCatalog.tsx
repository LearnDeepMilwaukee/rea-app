// React component for the frontside of the card
import has = Reflect.has;
import * as React from "react";
import * as themable from "react-themeable";
import CardFront from "./orgCardFront";
import * as cardTheme from "./cardStyle.scss";
import * as pageTheme from "./catalogStyle.scss";
import {sortByName, sortByDistance, getDistanceBetweenPoints, filterByType, filterByDistance} from "./utilities"
import getAllOrganizations from "../../../ui-bindings/Organization/getAllOrganizations";
import {error, isNullOrUndefined} from "util";


class SearchResults extends React.Component {

  constructor() {
    super();
    this.state = {
      sorting: "alphabetical",
      typeFilter: "All",
      distanceFilter: 50,
      load: true,
      nameFilter: "",
      myOrgsFilter:false,
      pubOrgsFilter: true
    };
  }

  onSortFilterChange = function (value){
    console.log(value);
    this.setState({sorting:value});
  };

  onTypeFilterChange = function(value) {
    console.log(value);
    this.setState({typeFilter:value});
  };

  onDistanceFilterChange = function(value) {
    this.setState({distanceFilter:value});
  };

  handleReset = function(value) {
    console.log("CLCIKEDCKED");
    // Update state here
    // this.setState({distanceFilter: 50,sorting:"alphabetical",typeFilter:"All", nameFilter: "", myOrgsFilter: false, pubOrgsFilter:true});

  };
  onNameChange = function (value) {
    console.log(value);
    this.setState({nameFilter:value});
  };
  onMyOrgsChange = function (value) {
    console.log("myOrgs: " + value.toString());
    this.setState({myOrgsFilter:value});
  };
  onPubOrgsChange = function (value) {
    console.log("pubOrgs: " + value.toString());
    this.setState({pubOrgsFilter:value});
  };



  render() {
    console.log("Start");
    console.log(this.state);
    let page_theme = themable(pageTheme);
    let msoeCC = {latitude:43.044004,longitude:-87.909020};
    const OrgList = getAllOrganizations(({organizationList, loading, error}) => {

      if (loading) {
        return (
          <strong>Loading...</strong>
        );
      } else if (error) {
        return (<p style={{color: "#F00"}}>API error</p>);
      } else {
        let filteredOrgs = [];

        for(let org of organizationList){
          if(isNullOrUndefined(this.state.nameFilter) || org.name.includes(this.state.nameFilter)){
            filteredOrgs.push(org);
            // console.log("Matching Org: " + org.name);
          }
        }
          filteredOrgs = filterByDistance(filteredOrgs,this.state.distanceFilter,msoeCC);
          if(this.state.typeFilter !== "All") {
            filteredOrgs = filterByType(filteredOrgs, this.state.typeFilter);
          }
          if(this.state.sorting === "alphabetical"){
            filteredOrgs = sortByName(filteredOrgs);
          }
          else if(this.state.sorting === "distance"){
            filteredOrgs = sortByDistance(filteredOrgs,msoeCC);
          }

        const cardsArray = filteredOrgs.map(card => (
          <div><span {...page_theme(4,"org-card-button")}>
            <CardFront card={card} distance={isNullOrUndefined(card.primaryLocation) ? null : getDistanceBetweenPoints(card.primaryLocation,msoeCC).toFixed(3)}/>
            <button {...page_theme(3,"primary-button")}>connect</button>
          </span>
          </div>
        ));
        if(cardsArray.length == 0){
          cardsArray = <p {...page_theme(10,"no-results")}> No search results</p>;
        }

        return (
          <div {...page_theme(1,"page")}>
            <h2 {...page_theme(8,"org-category")}>All orgs</h2>
            <div {...page_theme(4,"search-container")}>
              <div {...page_theme(5,"search-filter-group")}>

                <input autoFocus type="text" onChange={(event) => this.onNameChange(event.target.value)} defaultValue={this.state.nameFilter}/>
                <label>My Orgs</label>
                <input type="checkbox" checked={this.state.myOrgsFilter} onClick={(event) => {this.checked = !this.checked; this.onMyOrgsChange(event.target.checked)}}/>
                <label>Public</label>
                <input type="checkbox" checked={this.state.pubOrgsFilter} onClick={(event) => {this.checked = !this.checked; this.onPubOrgsChange(event.target.checked)}}/>
                <div {...page_theme(6,"search-dist-group")}>
                  <label {...page_theme(9,"max-distance-label")}>Max Distance(mi):</label>
                  <input onChange={(event) => this.onDistanceFilterChange(event.target.value)} type={'text'} name={'maxDistText'} value={50} style={{width:'40px'}}/>
                  <div>
                    <input type={'range'} name={'maxDistRange'}/>
                  </div>
                <div{...page_theme(7,"search-filter-group")}>
                  <label>Type:</label><br/>
                  <select onChange={(event) => this.onTypeFilterChange(event.target.value)} style={{width:'100px'}}>
                    <option selected = {this.state.typeFilter === 'All'} value={'All'}>All</option>
                    <option selected = {this.state.typeFilter === 'School'} value={'School'}>School</option>
                    <option selected = {this.state.typeFilter === 'Church'} value={'Church'}>Church</option>
                    <option selected = {this.state.typeFilter === 'For-profit Company'} value={'For-Profit Company'}>For-profit Company</option>
                    <option selected = {this.state.typeFilter === 'dividual'} value={'Individual'}>Individual</option>
                    <option selected = {this.state.typeFilter === 'Organization'} value={'Organization'}>Organization</option>
                    <option selected = {this.state.typeFilter === 'Library'} value={'Library'}>Library</option>
                    <option selected = {this.state.typeFilter === 'Makerspace'} value={'Makerspace'}>Makerspace</option>
                    <option selected = {this.state.typeFilter === 'Network'} value={'Network'}>Network</option>
                    <option selected = {this.state.typeFilter === 'Non-profit Company'} value={'Non-profit Company'}>Non-profit Company</option>
                  </select>
                </div>
                <div {...page_theme(8,"search-filter-group")}>
                  <label>Sort:</label>
                  <select onChange={(event) => this.onSortFilterChange(event.target.value)}>
                    <option selected = {this.state.sorting === 'alphabetical'} value={'alphabetical'}>Alphabetical</option>
                    <option selected = {this.state.sorting === 'distance'} value={'distance'}>Distance</option>
                  </select>
                </div>

                </div>



                </div >

                <div {...page_theme(12,"search-filter-group")}>
                  <button {...page_theme(13,"negative-button")} onClick={this.handleReset}>reset filters</button>
                </div>
              </div>
            <div>
              {cardsArray}
            </div>
          </div>
        );
      }
    });

    return (
      <div>
        <OrgList cardData={}/>
      </div>
    )
  }
}

export default SearchResults;

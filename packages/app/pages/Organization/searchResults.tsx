// React component for the frontside of the card
import has = Reflect.has;
import * as React from "react";
import * as themable from "react-themeable";
import CardFront from "./orgCardFront";
import * as cardTheme from "./cardStyle.scss";
import * as pageTheme from "./searchStyle.scss";
import {sortByName, sortByDistance, getDistanceBetweenPoints, filterByType, filterByDistance} from "./utilities.tsx"
import getAllOrganizations from "../../../ui-bindings/Organization/getAllOrganizations";
import {isNullOrUndefined} from "util";


class SearchResults extends React.Component {

  constructor() {
    super();
    this.state = {
      sorting: "alphabetical",
      typeFilter: "All",
      load: true
    };
  }

  onChange = (value) => {
    this.setState({sorting:value});
  };

  onTypeFilterChange = (value) => {
    this.setState({typeFilter:value});
  };

  render() {

    let card_theme = themable(cardTheme);
    let page_theme = themable(pageTheme);
    let search = new URLSearchParams(this.props.location.search);
    let orgname = search.get("searchParams");
    let msoeCC = {latitude:43.044004,longitude:-87.909020};

    console.log("Params:" + orgname);

    const OrgList = getAllOrganizations(({organizationList, loading, error}) => {

      if (loading) {
        return (
          <strong>Loading...</strong>
        );
      } else if (error) {
        return (<p style={{color: "#F00"}}>API error</p>);
      } else {
        let filteredOrgs = [];
        for (let org of organizationList) {
          if (org.name.includes(orgname)) {
            filteredOrgs.push(org);
            console.log("Matching Org: " + org.name);
          }
        }
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
            <button {...page_theme(3,"connect-button")}>Connect</button>
          </span>
          </div>
        ));

//{...card_theme(0,"card")}
        return (
          <div {...page_theme(1,"page")}>
            <div {...page_theme(1,"search-container")}>
              <h2>All orgs</h2>
              <div><form>
                       <input type="text" name="name"/></form>
                       <input type={'checkbox'} name={'myOrgsFilter'}/>
                       <label>My Orgs</label>
                       <input type={'checkbox'} name={'publicOrgsFilter'}/>
                       <label>Public</label>
                       <input type={'checkbox'} name={'placeholderFilter'}/>
              </div>

              <div>
                <div>
                  <label>Max Distance:</label>
                  <input type={'text'} name={'maxDistText'}/>
                </div>
                <div>
                  <input type={'range'} name={'maxDistRange'}/>
                </div>

              </div>
                <div>
                  <label>Type:</label>
                  <select onChange={(event) => this.onTypeFilterChange(event.target.value)}>
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
                <div>
                  <label>Sort:</label>
                     <select onChange={(event) => this.onChange(event.target.value)}>
                       <option selected = {this.state.sorting === 'alphabetical'} value={'alphabetical'}>Alphabetical</option>
                       <option selected = {this.state.sorting === 'distance'} value={'distance'}>Distance</option>
                     </select>
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

// React component for the frontside of the card
import * as React from "react";
import * as themable from "react-themeable";
import CardFront from "./orgCard";
import * as pageTheme from "./catalogStyle.scss";
import {sortByName, sortByDistance, getDistanceBetweenPoints, filterByType, filterByDistance} from "./utilities"
import getAllOrganizations from "../../queries/Organization/getAllOrganizations";
import {isNullOrUndefined} from "util";
import OrgFilter from "../components/searchFilter";


class SearchResults extends React.Component {

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

  notImplementedFunction = function () {
    alert("This feature is not yet implemented");
  };


  render() {
    let page_theme = themable(pageTheme);
    let msoeCC = {latitude: 43.044004, longitude: -87.909020};
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
          if (isNullOrUndefined(this.state.nameFilter) || org.name.includes(this.state.nameFilter)) {
            filteredOrgs.push(org);
            console.log("Org matching filter " + this.state.nameFilter + ": " + org.name);
          }
        }
        if (this.state.distanceFilter != '') {
          filteredOrgs = filterByDistance(filteredOrgs, this.state.distanceFilter, msoeCC);
        }
        if (this.state.typeFilter !== "All") {
          filteredOrgs = filterByType(filteredOrgs, this.state.typeFilter);
        }
        if (this.state.sorting === "alphabetical") {
          filteredOrgs = sortByName(filteredOrgs);
        }
        else if (this.state.sorting === "distance") {
          filteredOrgs = sortByDistance(filteredOrgs, msoeCC);
        }

        const cardsArray = filteredOrgs.map(card => (
            <div className="ui divided items">
            <CardFront card={card}
                       distance={isNullOrUndefined(card.primaryLocation) ? null : getDistanceBetweenPoints(card.primaryLocation, msoeCC).toFixed(1)}/>
            {/*<button {...page_theme(3, "primary-button")} onClick={this.notImplementedFunction}>Connect</button>*/}
            </div>
        ));
        if (cardsArray.length == 0) {
          cardsArray = <p {...page_theme(10, "no-results")}> No search results</p>;
        }

        return (
          <div id={'baseElement'}{...page_theme(1, "page")}>
            <h2 {...page_theme(8, "org-category")}>All orgs</h2>
              <OrgFilter style={{width:'50%'}}/>
              {cardsArray}
          </div>
        );
      }
    });

    return (
      <div>
        <OrgList/>
      </div>
    )
  }
}

export default SearchResults;

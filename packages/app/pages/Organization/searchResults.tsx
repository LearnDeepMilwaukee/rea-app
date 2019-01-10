// React component for the frontside of the card
import has = Reflect.has;
import * as React from "react";
import * as themable from "react-themeable";
import CardFront from "./orgCardFront";
import * as cardTheme from "./cardStyle.scss";
import * as pageTheme from "./searchStyle.scss";
import {sortByName} from "./sorting.tsx"
import {sortByDistance} from "./sorting.tsx"
import {getDistanceBetweenPoints} from "./sorting.tsx"
import getAllOrganizations from "../../../ui-bindings/Organization/getAllOrganizations";
import {isNullOrUndefined} from "util";


class SearchResults extends React.Component {

  constructor() {
    super();
    this.state = {
      sorting: "alphabetical",
      load: true
    };
  }

  onChange = (value) => {
    this.setState({sorting:value});
  };

  render() {

    let card_theme = themable(cardTheme);
    let page_theme = themable(pageTheme);
    let search = new URLSearchParams(this.props.location.search);
    let orgname = search.get("searchParams");
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
        for (let org of organizationList) {
          if (org.name.includes(orgname)) {
            filteredOrgs.push(org);
            console.log("Matching Org: " + org.name);
          }
        }
          if(this.state.sorting === "alphabetical"){
            filteredOrgs = sortByName(filteredOrgs);
          }
          else if(this.state.sorting === "distance"){
            filteredOrgs = sortByDistance(filteredOrgs,msoeCC);
          }

        const cardsArray = filteredOrgs.map(card => (
          <div><span>
            <CardFront card={card} distance={isNullOrUndefined(card.primaryLocation) ? null : getDistanceBetweenPoints(card.primaryLocation,msoeCC).toFixed(3)}/>
            <button {...page_theme(3,"connect-button")}>Connect</button>
          </span>
          </div>
        ));

//{...card_theme(0,"card")}
        return (
          <div>
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
                  <select>
                    <option value={'school'}>School</option>
                    <option value={'church'}>Church</option>
                    <option value={'for-profit company'}>For-profit Company</option>
                    <option value={'individual'}>Individual</option>
                    <option value={'organization'}>Organization</option>
                    <option value={'library'}>Library</option>
                    <option value={'makerspace'}>Makerspace</option>
                    <option value={'network'}>Network</option>
                    <option value={'non-profit'}>Non-profit</option>
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

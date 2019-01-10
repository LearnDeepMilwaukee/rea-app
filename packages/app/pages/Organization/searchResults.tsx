// React component for the frontside of the card
import has = Reflect.has;
import * as React from "react";
import * as themable from "react-themeable";
import CardFront from "./orgCardFront";
import * as cardTheme from "./cardStyle.scss";
import * as pageTheme from "./searchStyle.scss";


import getAllOrganizations from "../../../ui-bindings/Organization/getAllOrganizations";


class SearchResults extends React.Component {


  render() {

    let card_theme = themable(cardTheme);
    let page_theme = themable(pageTheme);
    let search = new URLSearchParams(this.props.location.search);
    let orgname = search.get("searchParams");
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
        const cardsArray = filteredOrgs.map(card => (
          <div><span>
            <CardFront card={card}/>
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
                  <select>
                    <option value={'alphabetical'}>Alphabetical</option>
                    <option value={'distance'}>Distance</option>
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

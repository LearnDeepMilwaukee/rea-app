// React component for the frontside of the card
import has = Reflect.has;
import * as React from "react";
import * as themable from "react-themeable";
import CardFront from  "./orgCardFront";
import * as cardTheme from "./cardStyle.scss";
import * as pageTheme from "./searchStyle.scss";

import getAllOrganizations from "../../../ui-bindings/Organization/getAllOrganizations";




class SearchResults extends React.Component {



  render() {

    let card_theme = themable(cardTheme);
    let page_theme = themable(pageTheme);
    let search = new URLSearchParams(this.props.location.search);
    let orgname = search.get("searchParams");
    console.log("Params:"+orgname);

    const OrgList = getAllOrganizations(({ organizationList, loading, error}) => {

      if (loading) {
        return(
              <strong>Loading...</strong>
            );
    } else if (error) {
        return(
          <p style={{color: "#F00"}}>API error</p>
        );
    } else {
        let filteredOrgs = [];
        for(let org of organizationList){
            if (org.name.includes(orgname)){
              filteredOrgs.push(org);
              console.log("Matching Org: " + org.name);
            }
        }
        const cardsArray = filteredOrgs.map(card => (
          <div>
            <CardFront card={card}/>
          </div>
        ));
        return(
          <div>
            {cardsArray}
          </div>
        );
    }
    });

    return(
      <div >
          <OrgList cardData={} />
      </div>
    )
  }
}

export default SearchResults;

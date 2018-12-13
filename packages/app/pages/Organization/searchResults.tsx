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
          <CardFront card={card}/>
        ));
        return(
          <div>
            <div>{cardsArray}</div>
          </div>
        );
    }
    });

    return(
      <div {...page_theme(0,".page")} className='hcontainer'>
        <span><div> </div>
        <div {...card_theme(1,".card")} className='card-container'  display="inline-block">
          <OrgList cardData={} />
        </div></span>
      </div>
    )
  }
}

export default SearchResults;

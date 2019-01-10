// React component for the frontside of the card
import has = Reflect.has;
import * as React from "react";
import * as themable from "react-themeable";
import CardFront from  "./orgCardFront";
import * as cardTheme from "./cardStyle.scss";
import * as pageTheme from "./searchStyle.scss";
import {sortByName} from "./sorting.tsx"
import {sortByDistance} from "./sorting.tsx"

import getAllOrganizations from "../../../ui-bindings/Organization/getAllOrganizations";




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
    console.log("Params:"+orgname);

    const OrgList = getAllOrganizations(({ organizationList, loading, error}) => {

      if (loading) {
        return(
              <strong>Loading...</strong>
            );
    } else if (error) {
        return(<p style={{color: "#F00"}}>API error</p>);
    } else {
        let filteredOrgs = [];
        for(let org of organizationList){
            if (org.name.includes(orgname)){
              filteredOrgs.push(org);
            }
        }
          if(this.state.sorting === "alphabetical"){
            filteredOrgs = sortByName(filteredOrgs);
          }
          else if(this.state.sorting === "distance"){
            let baseLocation = [-87.909020,43.044004];
            filteredOrgs = sortByDistance(filteredOrgs,baseLocation);
          }

        const cardsArray = filteredOrgs.map(card => (
          <div>
            <CardFront card={card}/>
          </div>
        ));

//{...card_theme(0,"card")}
        return(
          <div>
            <div>
              <h2>All orgs</h2>
              <span>
                   <div>
                     <input type={'text'} name={'SearchBox'}  placeholder={'Search'}/><br/>
                     <span>
                       <input type={'checkbox'} name={'myOrgsFilter'}/>
                       <label>My Orgs</label>
                       <input type={'checkbox'} name={'publicOrgsFilter'}/>
                       <label>Public</label>
                       <input type={'checkbox'} name={'placeholderFilter'}/>
                       <label>Placeholder</label>
                      </span>
                   </div>
                   <div>
                     <span>
                        <label>Max Distance:</label>
                        <input type={'text'} name={'maxDistText'}/>
                     </span>
                     <span>
                       <label>0 mi</label>
                        <input type={'range'} name={'maxDistRange'} value={30}/>
                       <label>100 mi</label>
                     </span>
                   </div>
                   <div>
                     <label>Type:</label>
                     <select>
                       <option value={'school'}>School</option>
                     </select>
                   </div>
                   <div>
                     <label>Sort:</label>
                     <select onChange={(event) => this.onChange(event.target.value)}>
                       <option selected = {this.state.sorting === 'alphabetical'} value={'alphabetical'}>Alphabetical</option>
                       <option selected = {this.state.sorting === 'distance'} value={'distance'}>Distance</option>
                     </select>
                   </div>
              </span>
            </div>
            <div>
            {cardsArray}
            </div>
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

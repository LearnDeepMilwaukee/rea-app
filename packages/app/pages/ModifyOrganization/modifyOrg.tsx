import * as React from "react";
import "./modifyOrg.css"
import getOrganizationById from "../../../ui-bindings/Organization/getOrganizationById";

export const Org = (props) => {
  let organization = props.organization;
  return(
    <div>
      <div>id: {organization.id}</div>
      <div>name: {organization.name}</div>
      <div>type: {organization.type}</div>
      <div>image: {organization.image}</div>
      <div>note: {organization.note}</div>
      <br/>
    </div>
  );
};

const OrgField = (props) => {
  return(
    <div>
      <form onSubmit={props.onSubmitAction}>
        Pick the Organization to modify: <input type="text" name="value" onChange={props.setOrg}/>
        <input type="submit" value="query"/>
      </form>
    </div>
  );
};

export const GetSingleOrg = getOrganizationById(({ organization, loading, error }) => {

  if (loading) {
    return(
      <strong>Loading...</strong>
    );
  } else if (error) {
    return(
      <p style={{color: "#F00"}}>API error</p>
    );
  } else {
    return(
      <div>
        <Org organization={organization}/>
      </div>
    );
  }
});

class App extends React.Component {

  state = {
    getOneOrgId: null,
    setOneOrgId: null
  };

  // Runs every time the input field changes
  getOrgById = (event) => {
    this.setState({setOneOrgId: parseInt(event.target.value, 10)});
  };

  // Runs when "submit" is selected
  stopRefresh = (event) => {
    // Sets the value to query to the current value of the input field
    this.setState({getOneOrgId: this.state.setOneOrgId});
    event.preventDefault();
  };

  render() {
    const {getOneOrgId} = this.state;
    return (
      <div>
        <h2>Pick an Organization by ID: </h2>
        <br/>
        <OrgField setOrg={this.getOrgById} onSubmitAction={this.stopRefresh}/>
        {getOneOrgId ? <GetSingleOrg orgId={getOneOrgId}/> : <div>Enter a value</div>}
      </div>
    );
  }
}

export default App;



/*
import * as React from "react";
import * as themeable from "react-themeable";
import { SFC } from "react";
import InventoryModal from "../../../ui-views/organisms/InventoryModal";
import * as _ from "underscore";
import getOrganizationById from "../../../ui-bindings/Organization/getOrganizationById";

export const GetSingleOrganization = getOrganizationById(({ organization, loading, error }) => {

  if (loading) {
    return(
      <strong>Loading...</strong>
    );
  } else if (error) {
    return(
      <p style={{color: "#F00"}}>API error</p>
    );
  } else {
    return(
      <div>
        <Organization organization={organization}/>
      </div>
    );
  }
});

/**
 * The inventory page, which contains the basic page structure
 * (menu, sidebar, sub-menus, and the entire inventory list)
 * @param {any} agent The Agent who's inventory is displayed
 * @param {any} theme The page's theme that should be used to style
 */
/*
class Inventory extends React.Component {


  private agent;
  private theme;

  constructor(props) {
    super(props);
    this.agent = props.agent;
    this.theme = props.theme;
  }



  render() {
    let currentTheme = themeable(this.theme);
    let org = this.props.organization;
    let name = org.name;
    let type = org.type;
    let image = org.image;
    let note = org.note;

    return (
      <div>
        <h4>
          <div>
            <form>
              <input type="text" name="orgName" value={name}/>

              Enter an Id: <input type="text" name="value"/>
              <input type="submit" value="query"/>
            </form>
          </div>
        </h4>
      </div>
    );
  }
}

export default Inventory;

*/

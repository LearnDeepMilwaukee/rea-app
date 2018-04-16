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

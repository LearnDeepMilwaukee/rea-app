import * as React from "react";
import * as themeable from "react-themeable";
import { SFC } from "react";
import InventoryModal from "../../../ui-views/organisms/InventoryModal";
import * as _ from "underscore";
import getOrganizationById from "../../../ui-bindings/Organization/getOrganizationById";

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

    return (
      <div>
        <h4>
          Test
        </h4>
      </div>
    );
  }
}

export default Inventory;

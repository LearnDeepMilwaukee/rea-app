import * as React from "react";
import * as themeable from "react-themeable";
import { SFC } from "react";
import InventoryModal from "../../../ui-views/organisms/InventoryModal";
import * as _ from "underscore";

interface Props {
  theme: Object
}

/**
 * The current inventory item query results.
 * More information is stored in the databse,
 * but it is not being queried
 */
interface Item {
  resourceClassifiedAs: {
    name: string
  },
  trackingIdentifier: string,
  currentQuantity: {
    numericValue: number,
    units: string
  }
}

/**
 * A single inventory entry displayed in the column
 * of inventory items. Contains basic information
 * about what the item is and quantity
 */
class InventoryCard extends React.Component {

  private state;

  public constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  public render() {
    let item = this.props.item;
    let type = item.resourceClassifiedAs.name;
    let title = item.trackingIdentifier;
    let quantity = item.currentQuantity.numericValue;
    let currentTheme = themeable(this.props.theme);

    return (
      <div>
        <InventoryModal
          theme={this.props.theme}
          show={this.state.showModal}
          item={item}
          onClose={() => this.closeDetails()}
        />
        <li {...currentTheme(0, "list_item")} >
          <span {...currentTheme(1, "item_type")} onClick={() => this.openDetails(item)}>{type}</span>
          <h3 {...currentTheme(2, "item_title")}>{title}</h3>
          <h4 {...currentTheme(3, "item_qty")}>{quantity === -1 ? <span>🚀</span> : quantity}</h4>
        </li>
      </div>
    )
  }

  /**
   * Handler to open the modal
   * @param {Item} item The item to display details on
   */
  private openDetails(item: Item) {
    this.setState({showModal: true});
  }

  /**
   * Handler to close the details modal
   */
  private closeDetails() {
    this.setState({showModal: false});
  }
}

const InventoryPage = ({resources, page, theme}) => {
  let currentTheme = themeable(theme);
  let pageResources = resources.slice(page * 25, (page + 1) * 25);

  return (
    <section {...currentTheme(5, "sidebar_inventory", "active")} >
      <ul {...currentTheme(8, "sidebar_list")} >
        {pageResources.map((item, i) => (
          <InventoryCard theme={theme} item={item} key={i}/>
        ))}
      </ul>

    </section>
  );
};

/**
 * The inventory page, which contains the basic page structure
 * (menu, sidebar, sub-menus, and the entire inventory list)
 * @param {any} agent The Agent who's inventory is displayed
 * @param {any} theme The page's theme that should be used to style
 */
class Inventory extends React.Component {

  state = {
    page: 0
  };

  private agent;
  private theme;

  constructor(props) {
    super(props);
    this.agent = props.agent;
    this.theme = props.theme;
  }

  updatePage = (page) => {
    this.setState({page});
  };

  render() {
    let currentTheme = themeable(this.theme);
    let numPages = Math.ceil(this.agent.ownedEconomicResources.length / 25);
    let page = this.state.page;

    return (
      <aside {...currentTheme(1, "sidebar")} >
        <div {...currentTheme(2, "sidebar_menu")} >
          <h4 {...currentTheme(4, "menu_title")} >
            Inventory List <span>{this.agent.ownedEconomicResources.length}</span>
          </h4>
        </div>

        <PageNumbers numPages={numPages} current={page} updatePage={this.updatePage} theme={this.theme} />
        <InventoryPage resources={this.agent.ownedEconomicResources} page={page} theme={this.theme}/>
        <PageNumbers numPages={numPages} current={page} updatePage={this.updatePage} theme={this.theme} />
      </aside>
    );
  }
}

/**
 * Lists page numbers with actions to change the current page
 * @param numPages The number of pages to display
 * @param current The current page of inventory displayed
 * @param updatePage The action to call when a page number is clicked
 * @param theme The theming element
 */
const PageNumbers = ({numPages, current, updatePage, theme}) => {
  let currentTheme = themeable(theme);

  return (
    <span {...currentTheme(1, "page_list")} >
      Page:&nbsp;&nbsp;
      {
        _.times(numPages, (i) => (
          <span  key={i} onClick={() => updatePage(i)} >
            <span {...currentTheme(2, "page_number", (current === i ? "current_page" : ""))}>{i + 1}</span>,&nbsp;&nbsp;
          </span>
        ))
      }
    </span>
  );
};

export default Inventory;

/**
 * @author Donal Moloney <Moloneyda@msoe.edu>
 * @version 1.0.0
 * @since 10 Oct 2019
 */
import * as React from "react";
import * as Router from "react-router";
import * as Modal from "react-modal";
import { Link } from "react-router";
import deleteQuery from "../../../ui-bindings/Organization/deleteQuery";

/**
 * Pop up that requires the user to confirm if they want ot delete the item or not
 */
class DeleteModal extends React.Component {
  private state;

  /**
   * Styling for modal
   */
  private popupModalStyle = {
    overlay : {
      position          : "fixed",
      top               : 0,
      left              : 0,
      right             : 0,
      bottom            : 0,
      backgroundColor   : "rgba(255, 255, 255, 0.75)"
    },
    content : {
      position                   : "absolute",
      top                        : "50%",
      left                       : "50%",
      width                      : "50%",
      leftMargin                 : "auto",
      rightMargin                : "auto",
      transform                  : "translate(-50%, -50%)",
      border                     : "1px solid #ccc",
      background                 : "#fff",
      overflow                   : "auto",
      WebkitOverflowScrolling    : "touch",
      borderRadius               : "4px",
      outline                    : "none",
      padding                    : "20px"
    }
  };

  /**
   * Delete modals constructor
   * @param props
   */
  public constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  /**
   * This renders the modal
   * @returns {any}
   */
  public render() {
    let title = "Warning";

    return (
      <div>
        //   <Modal
        //     isOpen={id}
        // style={this.popupModalStyle}
        // >
        <DeleteOrganizationModal theme={this.props.theme}
                                 show={this.state.showModal}
                                 item={item}
                                 onClose={() => this.closeDetails()}
        //Todo how do you show this as the name
        <h1> {...currentTheme(1, "Are you sure you want to delete: ")} item</h1>
        <button {...currentTheme(1, "item_type")} onClick={() => this.deleteInventoryItem(item)}>{type}</button>
        <button {...currentTheme(1, "item_type")} onClick={() => this.closeModal()}>{type}</button>
      </div>
  );
  }
/**
 * Class that when clicked shows the popup if the user wants to delete a modal or not
 */
class DeleteOrg extends React.Component {

  private state = {
    showModal: (this.props.orgId !== undefined)
  };
  buttonFunction = (event) => this.openModal();

  // Opens model when clicked
  openModal = () => {
  };

  render() {
    return (
      <div>
        <input type="button" name="deleteButton"
               value={"Delete"} onChange={this.buttonFunction=>this.openConfirmationModal()}/>
      </div>
    );
  }
  /**
   * Handler to open the modal
   * @param {Item} item The item to display details on
   */
  private openConfirmationModal(item: Item) {
    this.setState({showModal: true});
  }
// Creates the delete button on the screen

}
export default DeleteOrganizationButton;

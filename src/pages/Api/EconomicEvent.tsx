/**
 * This exposes a page which allows a view of all Economic Events in the database,
 * and allows to query for a single one by ID
 *
 * @package: REA app
 * @author:  Connor Hibbs <chibbs96@gmail.com>
 * @since:   2018-01-25
 */

import * as React from "react";
import allEconomicEvents from "../../queries/EconomicEvent/getAllEconomicEvents";
import economicEventById from "../../queries/EconomicEvent/getEconomicEventById";

/**
 * Binds to the database passing in any variables defined in props. Then maps
 * the response from the database to a component that can be rendered on the screen
 */
const EconomicEventById = economicEventById( ({economicEvent, loading, error}) => {
  if (loading) {
    return <h3>Loading...</h3>;
  } else if (error) {
    return <h3>Error!</h3>;
  }

  return <SingleEconomicEvent economicEvent={economicEvent} />
});

/**
 * A single economic event being drawn on the screen
 */
export const SingleEconomicEvent = (props) => {
  let economicEvent = props.economicEvent;

  let inputOfId = economicEvent.inputOf ? economicEvent.inputOf.id : "Missing";
  let outputOfId = economicEvent.outputOf ? economicEvent.outputOf.id : "Missing";

  let providerId = economicEvent.provider ? economicEvent.provider.id : "Missing";
  let receiverId = economicEvent.receiver ? economicEvent.receiver.id : "Missing";

  let scopeId = economicEvent.scope ? economicEvent.scope.id : "Missing";

  let quantity = economicEvent.affectedQuantity;
  let numericValue = quantity ? quantity.numbericValue : "Number Missing";
  let unit = quantity.unit ? quantity.unit.name : "Unit Missing";

  return (
    <div>
      ID: {economicEvent.id} <br/>
      Action: {economicEvent.action} <br/>
      Notes: {economicEvent.note} <br/>

      Input Of [ID]: {inputOfId} <br/>
      Output Of [ID]: {outputOfId} <br/>

      Provider [ID]: {providerId} <br/>
      Receiver [ID]: {receiverId} <br/>

      Scope [ID]: {scopeId} <br/>

      Affected Quantity:
      {numericValue} {unit} <br/>

      Start: {economicEvent.start} <br/>
      URL: {economicEvent.url} <br/>

      Request Distribution? {economicEvent.requestDistribution} <br/>
      User is Authorized to Update? {economicEvent.userIsAuthorizedToUpdate} <br/>
      User is Authorized to Delete? {economicEvent.userIsAuthorizedToDelete} <br/>
    </div>
  );
};

/**
 * Binds to the database to get all economic events. Then maps
 * the response from the database to a component that can be rendered on the screen
 */
const EconomicEventList = allEconomicEvents( ({economicEvents, loading, error}) => {
  if (loading) {
    return <h2>Loading...</h2>
  } else if (error) {
    return <h2>Error!</h2>
  }

  return (
    <div>
      {
        economicEvents.map(economicEvent => (
          <div>
            ======================================================<br/>
            <SingleEconomicEvent economicEvent={economicEvent} />
            ======================================================<br/>
          </div>
        ))
      }
    </div>
  );
});

/**
 * Main component for the page. Contains a search box and a list of
 * all available Economic Events
 */
class EconomicEvent extends React.Component {

  // declare the state and what variables are used
  state = {
    eventId: 57
  };

  // function to handle the search action on the search box
  handleClick = (event) => {
    // do not submit the form in the URL
    event.preventDefault();

    // fetch the economic event number from the input box
    let eventId = document.getElementById("idForm").value;

    // save the economic event id in the state
    this.setState({eventId: eventId});
  };

  // Draw the component on the screen
  render() {
    return (
      <div>
        <h1>Economic Events</h1>

        <h3>Search by ID:</h3>
        <form onSubmit={this.handleClick}>
          <input type="text" id="idForm" defaultValue="57"/>
        </form>

        <h4>Results</h4>
        ======================================================<br/>
        <EconomicEventById eventId={this.state.eventId} />
        ======================================================<br/>

        <h3>All Economic Events</h3>
        <EconomicEventList />
      </div>
    );
  }
}

export default EconomicEvent;

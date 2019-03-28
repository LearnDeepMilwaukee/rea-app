/**
 * Contains a form to allow the user to enter the data needed for an
 * Economic Event. The page then executes the mutation and creates the
 * item in the database.
 *
 * @author Connor Hibbs <chibbs96@gmail.com>
 * @date Feb 18, 2018
 */

import * as React from "react";

import createEconomicEvent from "../../queries/EconomicEvent/CreateEconomicEvent";
import { SingleEconomicEvent } from "./EconomicEvent";

/**
 * This is the primary component on the page. Its body contains a form that
 * has a field for all of the data that an EconomicEvent needs to be created.
 *
 * It also has some functions to turn that data into valid arguments to the mutation,
 * and a function to execute the mutation.
 *
 * Upon return (asynchronously), the data is displayed under the form
 */
class CreateEconomicEvent extends React.Component {

  /**
   * The economicEvent holds data returned from the mutation,
   * and transformation from underined to a value triggers the page refresh
   */
  state = {
    economicEvent: undefined
  };

  /**
   * This function responds to the submit button in the form. It uses the function
   * "formToJSON" below to transform the form data into valid JSON to give to the mutation.
   *
   * The mutation is called, and a promise is registered for when the data comes back. Upon
   * completion, the Component's state is set with the new data, which triggers a rerender
   * of the page
   *
   * @param event The event that triggered this function (Submit being clicked)
   */
  handleClick = (event) => {
    event.preventDefault();

    let variables = this.formToJSON(document.getElementById("form").elements);
    variables.token = this.props.token; // add the token in afterwards

    // perform the mutation
    this.props.mutate({ variables }).then( (response) => {
      let economicEvent = response.data.createEconomicEvent.economicEvent;
      this.setState({economicEvent: economicEvent});

    }).catch( (error) => {
      console.log(error);
    });
  };

  /**
   * This function uses the elements in the form to obtain the variables needed
   * for the mutation. It iterates over all of the form elements and extracts the name
   * and value properties.
   *
   * It validates the value properties and can transform them if they are of the
   * wrong type, based off of characteristics of the value and the type attribute
   * of the element.
   *
   * @param elements An array of the elements in the form
   * @returns A properly formatted JSON object with all of the name, value pairs from the form
   */
  formToJSON = elements => [].reduce.call(elements, (data, element) => {
    let value = element.value;

    if (value.toLowerCase() === "true") {
      value = true;
    } else if (value.toLowerCase() === "false") {
      value = false;
    } else if (isNaN(value) === false && element.type === "number") {
      value = Number(value);
    }

    if (element.name && element.value) {
      data[element.name] = value;
    }

    return data;
  }, {} /* <-- default value is an empty object */);

  /**
   * Draws the page
   */
  render() {
    return (
      <div>
        <h1>Create Economic Event</h1>

        <form id="form" onSubmit={this.handleClick}>
          receiverId: Int,
          <input name="receiverId" type="number" defaultValue="8"/>
          <br/><br/>
          fulfillsCommitmentId: Int,
          <input name="fulfillsCommitmentId" type="number" defaultValue="1"/>
          <br/><br/>
          createResource: Boolean,
          <input name="createResource" type="text" defaultValue="true"/>
          <br/><br/>
          inputOfId: Int,
          <input name="inputOfId" type="number" defaultValue="2"/>
          <br/><br/>
          url: String,
          <input name="url" type="text" defaultValue="http://www.msoe.edu"/>
          <br/><br/>
          resourceImage: String,
          <input name="resourceImage" type="text" defaultValue="https://getuikit.com/v2/docs/images/placeholder_600x400.svg"/>
          <br/><br/>
          affectedUnitId: Int,
          <input name="affectedUnitId" type="number" defaultValue="4"/>
          <br/><br/>
          affectsId: Int,
          <input name="affectsId" type="number" defaultValue="4"/>
          <br/><br/>
          providerId: Int,
          <input name="providerId" type="number" defaultValue="4"/>
          <br/><br/>
          resourceNote: String,
          <input name="resourceNote" type="text" defaultValue="This is a test resource from the CreateEconomicEvent form"/>
          <br/><br/>
          note: String,
          <input name="note" type="text" defaultValue="This is a test note from the CreateEconomicEvent form"/>
          <br/><br/>
          start: String,
          <input name="start" type="text" defaultValue="2017-1-1"/>
          <br/><br/>
          scopeId: Int,
          <input name="scopeId" type="number" defaultValue="6"/>
          <br/><br/>
          requestDistribution: Boolean,
          <input name="requestDistribution" type="text" defaultValue="true"/>
          <br/><br/>
          action: String,
          <input name="action" type="text" defaultValue="take"/>
          <br/><br/>
          affectedNumericValue: String!,
          <input name="affectedNumericValue" type="text" defaultValue="4"/>
          <br/><br/>
          outputOfId: Int,
          <input name="outputOfId" type="number" defaultValue="8"/>
          <br/><br/>
          affectedResourceClassifiedAsId: Int,
          <input name="affectedResourceClassifiedAsId" type="number" defaultValue="8"/>
          <br/><br/>
          resourceTrackingIdentifier: String
          <input name="resourceTrackingIdentifier" type="text" defaultValue="Lot Nine"/>
          <br/><br/>
          resourceCurrentLocationId: Int
          <input name="resourceCurrentLocationId" type="number" defaultValue="1"/>
          <br/><br/>

          <input type="submit" id="submit" value="Create Economic Event"/>
        </form>

        {this.state.economicEvent ? <SingleEconomicEvent economicEvent={this.state.economicEvent} /> : <p>Created Event Goes Here</p>}
      </div>
    );
  }
}

// This step is different from queries. Queries are bound at runtime with the values needed,
// but for mutation they must be bound at the beginning. The mutate() function is then returned
// which can be used to call the mutation at any point.
export default createEconomicEvent(CreateEconomicEvent);

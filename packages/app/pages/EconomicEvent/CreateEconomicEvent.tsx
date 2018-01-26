import * as React from "react";

import createEconomicEvent from "../../../ui-bindings/EconomicEvent/CreateEconomicEvent";

/**
 * Main component for the page. Contains a search box and a list of
 * all available Economic Events
 */
class CreateEconomicEvent extends React.Component {

  // declare the state and what variables are used
  state = {
    economicEvent: undefined,
    variables: undefined
  };

  handleClick = (event) => {
    event.preventDefault();
    console.log("Button clicked");

    let data = {
      affectedNumericValue: "4",
      fulfillsCommitmentId: 1,
      affectedUnitId: 4,
      affectsId: 4,
      outputOfId: 8,
      resourceImage: "Three",
      url: "Three",
      inputOfId: 2,
      receiverId: 8,
      requestDistribution: false,
      note: "This is happening from the React App",
      start: "2017-1-1",
      scopeId: 6,
      providerId: 4,
      createResource: true,
      resourceCurrentLocationId: 1,
      action: "take",
      resourceTrackingIdentifier: "Nine",
      affectedResourceClassifiedAsId: 8,
      resourceNote: "Five"
    };

    this.setState({variables: data});

    console.log("The button was clicked");
  };

  formToJSON = elements => [].reduce.call(elements, (data, element) => {
    console.log("Converting form to JSON");
    let value = element.value;

    if (value.toLowerCase() === "true") {
      value = true;
    } else if (value.toLowerCase() === "false") {
      value = false;
    } else if (isNaN(value) === false) {
      value = Number(value);
    }

    if (element.name && element.value) {
      data[element.name] = value;
    }
    return data;
  });

  // Draw the component on the screen
  render() {
    console.log("Attempting to render the page");
    return (
      <div>
        <h1>Create Economic Event</h1>

        <form id="form" onSubmit={this.handleClick}>
          receiverId: Int,
          <input name="receiverId" type="text" defaultValue="8"/>
          <br/><br/>
          fulfillsCommitmentId: Int,
          <input name="fulfillsCommitmentId" type="text" defaultValue="0"/>
          <br/><br/>
          createResource: Boolean,
          <input name="createResource" type="text" defaultValue="true"/>
          <br/><br/>
          inputOfId: Int,
          <input name="inputOfId" type="text" />
          <br/><br/>
          url: String,
          <input name="url" type="text" defaultValue="http://www.msoe.edu"/>
          <br/><br/>
          resourceImage: String,
          <input name="resourceImage" type="text" defaultValue="https://getuikit.com/v2/docs/images/placeholder_600x400.svg"/>
          <br/><br/>
          affectedUnitId: Int,
          <input name="affectedUnitId" type="text" />
          <br/><br/>
          affectsId: Int,
          <input name="affectsId" type="text" />
          <br/><br/>
          providerId: Int,
          <input name="providerId" type="text" defaultValue="8"/>
          <br/><br/>
          resourceNote: String,
          <input name="resourceNote" type="text" defaultValue="This is a test resource"/>
          <br/><br/>
          note: String,
          <input name="note" type="text" defaultValue="This is a test note"/>
          <br/><br/>
          start: String,
          <input name="start" type="text" defaultValue="2017-12-20"/>
          <br/><br/>
          scopeId: Int,
          <input name="scopeId" type="text" />
          <br/><br/>
          requestDistribution: Boolean,
          <input name="requestDistribution" type="text" defaultValue="true"/>
          <br/><br/>
          action: String,
          <input name="action" type="text" defaultValue="take"/>
          <br/><br/>
          affectedNumericValue: String!,
          <input name="affectedNumericValue" type="text" defaultValue="5"/>
          <br/><br/>
          outputOfId: Int,
          <input name="outputOfId" type="text" />
          <br/><br/>
          affectedResourceClassifiedAsId: Int,
          <input name="affectedResourceClassifiedAsId" type="text" />
          <br/><br/>
          resourceTrackingIdentifier: String
          <input name="resourceTrackingIdentifier" type="text" />
          <br/><br/>
          resourceCurrentLocationId: Int
          <input name="resourceCurrentLocationId" type="text" defaultValue="1"/>
          <br/><br/>

          <input type="submit" id="submit" value="Create Economic Event"/>
        </form>

        {this.state.variables ? <EconomicEventMutation data={this.state.variables} /> : <p>Created Event Goes Here</p>}
      </div>
    );
  }
}

/**
 * Binds to the database passing in any variables defined in props. Then maps
 * the response from the database to a component that can be rendered on the screen
 */
// const EconomicEventMutation = createEconomicEvent( ({economicEvent, loading, error}) => {
//   // if (loading) {
//   //   return <h3>Loading...</h3>
//   // } else if (error) {
//   //   return <h3>Error!</h3>
//   // }
//
//   console.log("Got back:", economicEvent, loading, error);
//   // return <SingleEconomicEvent economicEvent={economicEvent} />
//   return <p>Connor</p>
// });

const EconomicEventMutation = createEconomicEvent( (data) => {

  console.log("Got back:", data);
  // return <SingleEconomicEvent economicEvent={economicEvent} />
  return <p>Connor</p>
});

/**
 * A single economic event being drawn on the screen
 */
const SingleEconomicEvent = (props) => {
  let economicEvent = props.economicEvent;
  return (
    <div>
      ID: {economicEvent.id} <br />
      Notes: {economicEvent.note} <br/>
    </div>
  );
};

export default CreateEconomicEvent;

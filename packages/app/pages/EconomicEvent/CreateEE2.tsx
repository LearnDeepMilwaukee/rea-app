import * as React from "react";

import { mutation } from "../../../ui-bindings/EconomicEvent/CreateEconomicEvent";
import createEconomicEvent from "../../../ui-bindings/EconomicEvent/CreateEconomicEvent";
import { graphql } from "graphql";

/**
 * Main component for the page. Contains a search box and a list of
 * all available Economic Events
 */
class CreateEconomicEvent extends React.Component {

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
      note: "CreateEE2",
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

    // this.setState({variables: data});

    console.log("The button was clicked");

    // console.log("Props:", props);
    console.log("This.Props:", this.props);

    this.props.mutate({
      variables: {
        object1: "A",
        objectB: "2"
      }
    }).then( ({data}) => {
      console.log("Got Data", data);
    }).catch( (error) => {
      console.log("There was an error sending the mutation");
      console.log(error);
    });
  };

  // Draw the component on the screen
  render() {
    console.log("Attempting to render the page");
    return (
      <div>
        <h1>Create Economic Event</h1>

        <button onClick={this.handleClick}>Click Me</button>
      </div>
    );
  }
}

const Test = createEconomicEvent(CreateEconomicEvent);

export default Test;

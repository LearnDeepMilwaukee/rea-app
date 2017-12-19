import * as React from "react";
import queryAPI, { allEconomicEvents, createEconomicEvent } from "../../../ui-bindings/EconomicEvent/EconomicEventBindings";

import { FetchError } from "apollo-fetch";

/**
 * Inspiration for formToJSON from https://code.lengstorf.com/get-form-values-as-json/
 */
class EconomicEvent extends React.Component {

  constructor(private props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    document.getElementById("form").addEventListener("submit", this.handleSubmit);
  }

  readonly handleSubmit = (event) => {
    event.preventDefault();
    let form = document.getElementById("form");
    let data = this.formToJSON(form.elements);

    const queryUpdate = () => {
      queryAPI(allEconomicEvents).then(result => {
        this.setState({allEconomicEvents: result.data.viewer.allEconomicEvents});
      }).catch(error => console.log(error));
    };

    queryAPI(createEconomicEvent, data).then(() => queryUpdate()).catch(error => console.log(error));
    console.log("Data:", JSON.stringify(data));
  };

  readonly formToJSON = elements => [].reduce.call(elements, (data, element) => {

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

  }, {});

  render() {

    if (this.state.economicEvent === undefined) {
      console.log("EconomicEvent is undefined");
      return (
        <div>
          <form id="form">
            receiverId: Int,
            <input name="receiverId" type="text" />
            <br/><br/>

            fulfillsCommitmentId: Int,
            <input name="fulfillsCommitmentId" type="text" />
            <br/><br/>

            createResource: Boolean,
            <input name="createResource" type="text" />
            <br/><br/>

            inputOfId: Int,
            <input name="inputOfId" type="text" />
            <br/><br/>

            url: String,
            <input name="url" type="text" />
            <br/><br/>

            resourceImage: String,
            <input name="resourceImage" type="text" />
            <br/><br/>

            affectedUnitId: Int,
            <input name="affectedUnitId" type="text" />
            <br/><br/>

            affectsId: Int,
            <input name="affectsId" type="text" />
            <br/><br/>

            providerId: Int,
            <input name="providerId" type="text" />
            <br/><br/>

            resourceNote: String,
            <input name="resourceNote" type="text" />
            <br/><br/>

            note: String,
            <input name="note" type="text" />
            <br/><br/>

            start: String,
            <input name="start" type="text" />
            <br/><br/>

            token: String!,
            <input name="token" type="text" />
            <br/><br/>

            scopeId: Int,
            <input name="scopeId" type="text" />
            <br/><br/>

            requestDistribution: Boolean,
            <input name="requestDistribution" type="text" />
            <br/><br/>

            action: String,
            <input name="action" type="text" />
            <br/><br/>

            affectedNumericValue: String!,
            <input name="affectedNumericValue" type="text" />
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

            <input type="submit" id="submit" value="Create Economic Event"/>
          </form>
        </div>
      )
    }

    return (
      <div>
        {this.state.economicEvent.map(agentRelationshipRole => (
          <AgentRelationshipRole
            id={agentRelationshipRole.id}
            label={agentRelationshipRole.label}
            inverseLabel={agentRelationshipRole.inverseLabel}
            category={agentRelationshipRole.category}
          />
        ))}
      </div>
    )
  }
}

export default EconomicEvent;

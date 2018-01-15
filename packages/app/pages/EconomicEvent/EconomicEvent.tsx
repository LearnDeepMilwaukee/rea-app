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

    data = {"affectedNumericValue": "4", "fulfillsCommitmentId": 1, "affectedUnitId": 4, "affectsId": 4, "outputOfId": 8, "resourceImage": "Three", "url": "Three", "inputOfId": 2, "receiverId": 8, "requestDistribution": false, "note": "New item for Shorewood", "start": "2017-1-1", "scopeId": 6, "providerId": 4, "createResource": true, "resourceCurrentLocationId": 1, "action": "take", "resourceTrackingIdentifier": "Nine", "affectedResourceClassifiedAsId": 8, "resourceNote": "Five"};

    const queryUpdate = () => {
      queryAPI(allEconomicEvents).then(result => {
        this.setState({allEconomicEvents: result.data.viewer.allEconomicEvents});
      }).catch(error => console.log(error));
    };

    // queryAPI(createEconomicEvent, data).then(() => queryUpdate()).catch(error => console.log(error));

    queryAPI(createEconomicEvent, data).then(() => console.log("Query!!!")).catch(error => console.log("Error", error));




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

  readonly state;

  render() {

    if (this.state.allEconomicEvents === undefined) {
      console.log("EconomicEvent is undefined");
      return (
        <div>
          <form id="form">
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

            {/*token: String!,*/}
            {/*<input name="token" type="text" defaultValue="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNvbm5vciIsImlhdCI6MTUxMjAxNjMzNSwicGFzc3dvcmQiOiI3YzA4ODliOWU5ZmNjYzAxZDIzMDcwNzljNDk5OTcyNDFlNTZlNzU0IiwiaWQiOjZ9.ZnL7fgWfA6bCBU_BLakP_ejyAD71hLXufePExB1p-ps"/>*/}
            {/*<br/><br/>*/}

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

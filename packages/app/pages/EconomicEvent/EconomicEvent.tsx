import * as React from "react";
import queryAPI from "../../../ui-bindings/EconomicEvent/EconomicEventBindings";

import { FetchError } from "apollo-fetch";

class EconomicEvent extends React.Component {

  constructor(private props) {
    super(props);
    this.state = {};
  }

  // sendQuery(jsonOptions: Object) {
  //   let options = {};
  //   options["receiverId"] = document.getElementById("receiverId").innerHTML;
  //
  //
  //
  //   queryAPI({id: 5}).then(result => {
  //     this.setState({economicEvent: result.data.viewer.economicEvent});
  //   }).catch((error: FetchError) => {
  //     console.log("Promise Error:", error);
  //   });
  // }

  render() {

    if (this.state.economicEvent === undefined) {
      console.log("EconomicEvent is undefined");
      return (
        <div>
          <form>
            receiverId: Int,
            <input id="receiverId" type="text" />
            <br/><br/>

            fulfillsCommitmentId: Int,
            <input id="fulfillsCommitmentId" type="text" />
            <br/><br/>

            createResource: Boolean,
            <input id="createResource" type="text" />
            <br/><br/>

            inputOfId: Int,
            <input id="inputOfId" type="text" />
            <br/><br/>

            url: String,
            <input id="url" type="text" />
            <br/><br/>

            resourceImage: String,
            <input id="resourceImage" type="text" />
            <br/><br/>

            affectedUnitId: Int,
            <input id="affectedUnitId" type="text" />
            <br/><br/>

            affectsId: Int,
            <input id="affectsId" type="text" />
            <br/><br/>

            providerId: Int,
            <input id="providerId" type="text" />
            <br/><br/>

            resourceNote: String,
            <input id="resourceNote" type="text" />
            <br/><br/>

            note: String,
            <input id="note" type="text" />
            <br/><br/>

            start: String,
            <input id="start" type="text" />
            <br/><br/>

            token: String!,
            <input id="token" type="text" />
            <br/><br/>

            scopeId: Int,
            <input id="scopeId" type="text" />
            <br/><br/>

            requestDistribution: Boolean,
            <input id="requestDistribution" type="text" />
            <br/><br/>

            action: String,
            <input id="action" type="text" />
            <br/><br/>

            affectedNumericValue: String!,
            <input id="affectedNumericValue" type="text" />
            <br/><br/>

            outputOfId: Int,
            <input id="outputOfId" type="text" />
            <br/><br/>

            affectedResourceClassifiedAsId: Int,
            <input id="affectedResourceClassifiedAsId" type="text" />
            <br/><br/>

            resourceTrackingIdentifier: String
            <input id="resourceTrackingIdentifier" type="text" />
            <br/><br/>

            <br /> <br />

            {/*<input type="button" id="submit" onClick="console.log('Clicked')" value="Create Economic Event"/>*/}
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

import * as React from "react";
import queryAPI from "../../../ui-bindings/AgentSandbox/AgentSandboxBindings";
import BindAgentRelationship from "../../../ui-bindings/AgentSandbox/AgentRelationship";

import { FetchError } from "apollo-fetch";

const AgentRelationshipRole = (props) => {
  return(
    <div>
      <div>
        <p>id: {props.id}</p>
        <p>label: {props.name}</p>
        <p>inverseLabel: {props.symbol}</p>
        <p>category: {props.category}</p>
        <br/>
      </div>
    </div>
  )
};

class AgentRelationshipRoles extends React.Component {

  constructor(private props) {
    super(props);
    this.state = {};

    queryAPI({id: 5}).then(result => {
      this.setState({allAgentRelationshipRoles: result.data.viewer.allAgentRelationshipRoles});
    }).catch((error: FetchError) => {
      console.log("Promise Error:", error);
    });
  }

  render() {
    if (this.state.allAgentRelationshipRoles === undefined) {
      return <p>Loading...</p>
    }

    return (
      <div>
        {this.state.allAgentRelationshipRoles.map(agentRelationshipRole => (
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

export default AgentRelationshipRoles;

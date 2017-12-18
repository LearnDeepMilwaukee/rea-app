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
      this.setState({data: result.data});
    }).catch((error: FetchError) => {
      console.log("Promise Error:", error);
    });
  }

  render() {
    if (this.state.data === undefined) {
      return <p>Loading...</p>
    }

    let data = this.state.data.viewer.allAgentRelationshipRoles;

    return (
      <div>
        {data.map(singleRelationship => (
          <AgentRelationshipRole
            id={singleRelationship.id}
            label={singleRelationship.label}
            inverseLabel={singleRelationship.inverseLabel}
            category={singleRelationship.category}
          />
        ))}
      </div>
    )
  }
}

export default AgentRelationshipRoles;

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

// const AgentRelationship = (props) => {
//   return (
//     <div>
//       <p>id: {props.id}</p>
//       <AgentRelationshipRole props={props}/>
//     </div>
//   )
// };

class AgentRelationshipRoles extends React.Component {

  constructor(private props) {
    super(props);
    this.state = {};

    queryAPI({id: 5}).then(result => {
      let {data, error, extensions} = result;
      this.setState({data: data});
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
        <p>It loaded!</p>
        {data.map(singleRelationship => (
          <div>
            <p>{singleRelationship.id}</p>
            <p>{singleRelationship.label}</p>
            <p>{singleRelationship.inverseLabel}</p>
            <p>{singleRelationship.category}</p>
          </div>
        ))}
      </div>
    )
  }
}

class AgentSandbox extends React.Component {
  constructor(private props) {
    super (props);
  }

  render() {
    return (
      <div>
        <p>AgentRelationshipRole</p>
        <AgentRelationshipRoles />
        <br />
      </div>
    )
  }
}

export default AgentSandbox;

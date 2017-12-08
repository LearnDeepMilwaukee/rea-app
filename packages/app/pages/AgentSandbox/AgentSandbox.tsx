import * as React from "react";
import BindAgent from "../../../ui-bindings/AgentSandbox/AgentSandboxBindings";

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

const AgentRelationshipRoleList = BindAgent(   (  { roles, loading, error}: Props) => {
  return (
    loading ? <strong>Loading...</strong> : (
      error ? <p style={{ color: "#F00" }}>API error</p> : (
        <div >
          <div>
            {/*{roles.map( (arr) => (*/}
              <AgentRelationshipRole
                id={roles.id}
                label={roles.label}
                inverseLabel={roles.inverseLabel}
                category={roles.category}
              />
            // ))}
          </div>
        </div>
      )
    )
  );
}      );

class AgentSandbox extends React.Component {
  constructor(private props) {
    super (props);
  }

  render() {
    return (
      <div>
        <AgentRelationshipRoleList />
      </div>
    )
  }
}

export default AgentSandbox;

/**
 * This exposes a page which allows a view of all Agent Relationship Roles in the database,
 * and allows to query for a single one by ID
 *
 * @package: REA app
 * @author:  Connor Hibbs <chibbs96@gmail.com>
 * @since:   2018-01-25
 */

import * as React from "react";
import allAgentRelationshipRoles from "../../queries/AgentRelationshipRole/getAllAgentRelationshipRoles";
import agentRelationshipRoleById from "../../queries/AgentRelationshipRole/getAgentRelationshipRoleById";

const AgentRelationshipRole = (props) => {
  let role = props.agentRelationshipRole;

  return(
    <div>
      <p>id: {role.id}</p>
      <p>label: {role.name}</p>
      <p>inverseLabel: {role.symbol}</p>
      <p>category: {role.category}</p>
      <br/>
    </div>
  );
};

const AgentRelationshipRolesList = allAgentRelationshipRoles( ({agentRelatonshipRoles, loading, error}) => {
  if (loading) {
    return <h2>Loading...</h2>;
  } else if (error) {
    return <h2>Error!</h2>;
  }

  return (
    <div>
      {
        agentRelatonshipRoles.map(agentRelationshipRole => (
          <div>
            ======================================================<br/>
            <AgentRelationshipRole agentRelationshipRole={agentRelationshipRole} />
            ======================================================<br/>
          </div>
        ))
      }
    </div>
  );
});

const AgentRelationshipRoleById = agentRelationshipRoleById( ({agentRelationshipRole, loading, error}) => {
  if (loading) {
    return <h3>Loading...</h3>;
  } else if (error) {
    return <h3>Error!</h3>;
  }

  return <AgentRelationshipRole agentRelationshipRole={agentRelationshipRole} />;
});

class AgentRelationshipRoles extends React.Component {

  state = {
    roleId: undefined
  };

  // function to handle the search action on the search box
  handleClick = (event) => {
    event.preventDefault();
    let roleId = document.getElementById("idForm").value;
    this.setState({roleId: roleId});
  };

  // Draw the component on the screen
  render() {
    return (
      <div>
        <h1>Agent Relationship Role</h1>

        <h3>Search by ID:</h3>
        <form onSubmit={this.handleClick}>
          <input type="text" id="idForm"/>
        </form>

        <h4>Results</h4>
        ======================================================<br/>
        {this.state.roleId ? <AgentRelationshipRoleById roleId={this.state.roleId} /> : <p>No matches</p>}
        ======================================================<br/>

        <h3>All Agent Relationship Roles</h3>
        <AgentRelationshipRolesList />
      </div>
    );
  }
}

export default AgentRelationshipRoles;

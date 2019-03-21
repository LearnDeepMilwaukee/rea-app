import { connect } from "react-redux";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import agentRelationshipRole from "./AgentRelationshipRoleInterface";

const query = gql`
query($token: String){
  viewer(token: $token) {
    allAgentRelationshipRoles {
      ...agentRelationshipRole
    }
  }
}
${agentRelationshipRole}
`;

export default compose(
  connect(state => ({
    variables: {
      token: state.getUserInfo.currentUserToken
    }
  })),

  graphql(query, {
    options: (props) => ({
      variables: {
        ...props.variables
      }
    }),

    props: (
      {
        data: {
          viewer,
          loading,
          error
        }
      }) => ({
        agentRelatonshipRoles: viewer ? viewer.allAgentRelationshipRoles : null,
        loading,
        error
      }
    ),
  })
);

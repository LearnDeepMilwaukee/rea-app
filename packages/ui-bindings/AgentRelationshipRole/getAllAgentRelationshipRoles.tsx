import { connect } from "react-redux";
import { gql, graphql, compose } from "react-apollo";
import { AppState } from "@vflows/store/types";
import { getActiveLoginToken } from "@vflows/store/selectors/auth";
import agentRelationshipRole from "./AgentRelationshipRole";

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
      token: getActiveLoginToken(state)
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

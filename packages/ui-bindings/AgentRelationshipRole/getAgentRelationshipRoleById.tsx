import { connect } from "react-redux";
import { gql, graphql, compose } from "react-apollo";
import { AppState } from "@vflows/store/types";
import { getActiveLoginToken } from "@vflows/store/selectors/auth";
import agentRelationshipRole from "./AgentRelationshipRole";

const query = gql`
query($token: String, $id: Int){
  viewer(token: $token) {
    agentRelationshipRole(id: $id) {
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
        ...props.variables,
        id: props.roleId
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
        agentRelationshipRole: viewer ? viewer.agentRelationshipRole : null,
        loading,
        error
      }
    ),
  })
);

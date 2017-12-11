import { connect } from "react-redux"
import { gql, graphql, compose } from "react-apollo"
import { AppState } from "@vflows/store/types"
import { getActiveLoginToken } from "@vflows/store/selectors/auth"

import { AgentRelationshipRole, agentRelationshipRole } from "./AgentSandboxBindings";

/**
 * This is the GraphQL query. The entire thing is wrapped
 * in tick marks (``) with the gql took from react-apollo.
 *
 * The parentheses allow for arguments to be accepted into
 * the query. In this case, it needs a user token to
 * authenticate you to use the database.
 */
const query = gql`
query($token: String){
  viewer(token: $token) {
    allAgentRelationships {
      id
      # relationship {
      #   ...agentRelationshipRole
      # }
    }
  }
}
${agentRelationshipRole}
`;

/**
 * This is the part of the binding that connects to the
 * database, authenticates you, and allows the query to be
 * executed.
 *
 * It takes two arguments. The first is the function to
 * connect to the database / API and can take in variables
 * which will be _attempted_ to fit into the query.
 *
 * The second is the query object which defines what can go
 * into the query, and the expected format of the data that
 * comes out of the query. In the last props section, you
 * can define the JSON object it should return to the front end
 */
export default compose(
  connect((state: Appstate) => ({
    variables: {
      token: getActiveLoginToken(state)
    },
  })),

  graphql(query, {
    options: (props) => ({ variables: {
      ...props.variables,
    }}),
    props: ({ownProps, data: {viewer, loading, error, refetch }}) => (
      console.log("Viewer:", viewer),
      console.log("AgentRelationship:", viewer.agentRelationship),
      {
        loading,
        error,
        refetchAgent: refetch,
        agentRelationships: viewer ? viewer.agentRelationship : null,
      }
    ),
  })
);

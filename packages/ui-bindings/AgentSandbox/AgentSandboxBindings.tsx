import { connect } from "react-redux"
import { gql, graphql, compose } from "react-apollo"
import { AppState } from "@vflows/store/types"
import { getActiveLoginToken } from "@vflows/store/selectors/auth"

export const agentRelationshipRole = gql`
fragment agentRelationshipRole on AgentRelationshipRole {
  id
  label
  inverseLabel
  category
}`;

/**
 * This is a Typescript interface. It works the same
 * way as an interface in Java,  * except this defines
 * attributes instead of methods. You can use it in
 * Typescript to make your variables strongly
 * typed and give the compiler a way to help you
 */
export interface AgentRelationshipRole {
  id: number
  label: String
  inverseLabel: String
  category: number
}

// # ...agentRelationshipRole

/**
 * This is the GraphQL query. The entire thing is wrapped
 * in tick marks (``) with the gql took from react-apollo.
 *
 * The parentheses allow for arguments to be accepted into
 * the query. In this case, it needs a user token to
 * authenticate you to use the database.
 */
const query = gql`
query($id: String = "4", $token: String) {
  viewer(token: $token) {
    allAgentRelationshipRoles(id: $id) {
      id
      label
      inverseLabel
      category
    }
  }
}
`;

// ${agentRelationshipRole}

export default compose(
  connect((state: Appstate) => ({
    variables: {
      token: getActiveLoginToken(state),
      // id: 4
    },
  })),

  graphql(query, {
    options: (props) => ({ variables: {
      ...props.variables,
    }}),
    props: ({ownProps, data: {viewer, loading, error, refetch }}) => (
      {
        loading,
        error,
        refetchAgent: refetch,
        roles: viewer ? viewer.allAgentRelationshipRoles : null,
      }
    ),
  })
);

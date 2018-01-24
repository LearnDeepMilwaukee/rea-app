import { connect } from "react-redux"
import { gql, graphql, compose } from "react-apollo"
import { AppState } from "@vflows/store/types"
import { getActiveLoginToken } from "@vflows/store/selectors/auth"
import { createApolloFetch } from "apollo-fetch";
import { create } from "domain";

export interface Args {
  id: number
}

export const query = gql`
query($token: String, $id: Int) {
  viewer(token: $token) {
    economicEvent(id: $id) {
      id
      note
    }
  }
}
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
          id: props.eventId
        }
      })
    })
  );
}


//
// export default compose(
//   connect((state: Appstate) => ({
//     variables: {
//       token: getActiveLoginToken(state)
//     },
//   })),
//
//   graphql(createEconomicEvent, {
//     options: (props) => ({ variables: {
//         ...props.variables,
//       }}),
//     props: ({ownProps, data: {viewer, loading, error, refetch }}) => (
//       console.log("Viewer:", viewer),
//         console.log("AgentRelationship:", viewer.agentRelationship),
//         {
//           loading,
//           error,
//           refetchAgent: refetch,
//           agentRelationships: viewer ? viewer.agentRelationship : null,
//         }
//     ),
//   })
// );

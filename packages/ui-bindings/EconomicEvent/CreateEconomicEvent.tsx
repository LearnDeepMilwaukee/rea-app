import { connect } from "react-redux"
import { gql, graphql, compose } from "react-apollo"
import { AppState } from "@vflows/store/types"
import { getActiveLoginToken } from "@vflows/store/selectors/auth"
import { createApolloFetch } from "apollo-fetch";
import { create } from "domain";

/**
 * This is the GraphQL query. The entire thing is wrapped
 * in tick marks (``) with the gql took from react-apollo.
 *
 * The parentheses allow for arguments to be accepted into
 * the query. In this case, it needs a user token to
 * authenticate you to use the database.
 */
const query = gql`
  mutation(
    $receiverId: Int,
    $fulfillsCommitmentId: Int,
    $createResource: Boolean,
    $inputOfId: Int,
    $url: String,
    $resourceImage: String,
    $affectedUnitId: Int,
    $affectsId: Int,
    $providerId: Int,
    $resourceNote: String,
    $note: String,
    $start: String,
    $token: String!,
    $scopeId: Int,
    $requestDistribution: Boolean,
    $action: String,
    $affectedNumericValue: String!,
    $outputOfId: Int,
    $affectedResourceClassifiedAsId: Int,
    $resourceTrackingIdentifier: String,
    $resourceCurrentLocationId: Int
  ){
    createEconomicEvent (
      receiverId: $receiverId,
      fulfillsCommitmentId: $fulfillsCommitmentId,
      createResource: $createResource,
      inputOfId: $inputOfId,
      url: $url,
      resourceImage: $resourceImage,
      affectedUnitId: $affectedUnitId,
      affectsId: $affectsId,
      providerId: $providerId,
      resourceNote: $resourceNote,
      note: $note,
      start: $start,
      token: $token,
      scopeId: $scopeId,
      requestDistribution: $requestDistribution,
      action: $action,
      affectedNumericValue: $affectedNumericValue,
      outputOfId: $outputOfId,
      affectedResourceClassifiedAsId: $affectedResourceClassifiedAsId,
      resourceTrackingIdentifier: $resourceTrackingIdentifier,
      resourceCurrentLocationId: $resourceCurrentLocationId
    ) {
      economicEvent {
        id
        note
      }
    }
  }
`;

function createEconomicEvent(args: Object) {
  return compose(
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
      })
    })
  );
}

export default createEconomicEvent;




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

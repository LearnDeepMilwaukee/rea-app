import { connect } from "react-redux"
import { gql, graphql, compose } from "react-apollo"
import { AppState } from "@vflows/store/types"
import { getActiveLoginToken } from "@vflows/store/selectors/auth"

const mutation = gql`
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

// let connectFunction = connect(state => ({
//   variables: {
//     token: getActiveLoginToken(state)
//   }
// }));
//
// let graphQLQueryOptions = (props) => (console.log("Received", props, "for the mutation"), {
//   variables: {
//     ...props.variables,
//     ...props.data
//   },
// });
//
// let graphQLQueryProps = (ownProps, { data: { createEconomicEvent, loading, error } }) =>
//   (console.log("Inside props", error), {
//     economicEvent: createEconomicEvent ? createEconomicEvent.economicEvent : null,
//     loading,
//     error
//   });
//
// export default compose(
//   connect(state => ({
//     variables: {
//       token: getActiveLoginToken(state)
//     }
//   })),
//
//   graphql(mutation, {
//     options: graphQLQueryOptions,
//     props: graphQLQueryProps,
//   })
// );

export default compose(
  connect(state => ({
    variables: {
      token: getActiveLoginToken(state)
    }
  })),

  graphql(mutation, {
    options: (props) => (console.log("Received", props, "for the mutation"), {
      variables: {
        ...props.variables,
        ...props.data
      },
    }),
  // }), // TODO delete
    props:
      ({
         data: {
           createEconomicEvent,
           loading,
           error
         }
       }) =>
        (console.log("Inside props", error), {
          // economicEvent: createEconomicEvent ? createEconomicEvent.economicEvent : null,
          // loading,
          error
        }),
  })
);

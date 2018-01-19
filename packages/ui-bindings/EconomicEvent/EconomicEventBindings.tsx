import { connect } from "react-redux"
import { gql, graphql, compose } from "react-apollo"
import { AppState } from "@vflows/store/types"
import { getActiveLoginToken } from "@vflows/store/selectors/auth"
import { createApolloFetch } from "apollo-fetch";
import { create } from "domain";

let fetch = createApolloFetch({uri: "http://localhost:8000/api/graph"});

/**
 * This is the GraphQL query. The entire thing is wrapped
 * in tick marks (``) with the gql took from react-apollo.
 *
 * The parentheses allow for arguments to be accepted into
 * the query. In this case, it needs a user token to
 * authenticate you to use the database.
 */
export const createEconomicEvent = gql`
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

export const allEconomicEvents = gql`
query($token: String) {
  viewer(token: $token) {
    allEconomicEvents {
      id
      note
    }
  }
}
`;

// const queryAPI = (query = allEconomicEvents, options?: Object) => {
//   console.log("Received", options, "as options");
//
//   let variables = {
//     ...options,
//     "token": ""
//   };
//
//   connect(state => ({
//     variables: {
//       token: getActiveLoginToken(state)
//     }
//   }));
//
//   variables.token = this.props.token;
//
//   console.log("Querying with variables:", variables);
//
//   fetch({ query }).then(result => {
//     console.log("Received back ", result.data);
//   }).catch(error => console.log("We received fetch error", error));
//
//   return "There was a query";
// };

// export default queryAPI;

// export default compose(
//   connect(state => ({
//     myFilterString: myFilterStringSelector(state)
//   })),
//   graphql(query, {
//     options: ({ myFilterString }) => ({
//       variables: { filter: myFilterString },
//       fetchPolicy: 'cache-and-network'
//     })
//   })
// )(MyComponent);

const orgQuery = gql`
query($token: String) {
  viewer(token: $token) {
    allOrganizations {
      id
      name
      image
      note
      type
      __typename
    }
  }
}
`;

export function allOrgs(args?, query = orgQuery) {
  // console.log("Querying for", component);
  // queryAPI(component, orgQuery, args);

  return compose(
    connect(state => ({
      variables: {
        token: getActiveLoginToken(state)
      }
    })),

    graphql(orgQuery, {
      options: (props) => ({
        variables: {
          ...props.variables
        }
      })
    })
  );
}

export function queryAPI(query, args) {
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

// export allOrgs;
// export default DoShit;

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

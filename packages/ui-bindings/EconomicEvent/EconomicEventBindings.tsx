// import { connect } from "react-redux"
//  import { gql, graphql, compose } from "react-apollo"
import { AppState } from "@vflows/store/types"
import { getActiveLoginToken } from "@vflows/store/selectors/auth"
import { createApolloFetch } from "apollo-fetch";

let fetch = createApolloFetch({uri: "http://localhost:8000/api/graph"});

/**
 * This is the GraphQL query. The entire thing is wrapped
 * in tick marks (``) with the gql took from react-apollo.
 *
 * The parentheses allow for arguments to be accepted into
 * the query. In this case, it needs a user token to
 * authenticate you to use the database.
 */
export const createEconomicEvent = `
mutation(
  $token: String,
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
  $token: String,
  $scopeId: Int,
  $requestDistribution: Boolean,
  $action: String,
  $affectedNumericValue: String,
  $outputOfId: Int,
  $affectedResourceClassifiedAsId: Int,
  $resourceTrackingIdentifier: String
){
  viewer(token: $token) {
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
			resourceTrackingIdentifier: $resourceTrackingIdentifier
		) {}
  }
}
`;

export const allEconomicEvents = `
query($token: String) {
  viewer(token: $token) {
    allEconomicEvents {
      id
      note
    }
  }
}
`;

const queryAPI = (query = allEconomicEvents, options?: Object) => {
  console.log("Received", options, "as options");

  let variables = {
    ...options,
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNvbm5vciIsImlhdCI6MTUxMjAxNjMzNSwicGFzc3dvcmQiOiI3YzA4ODliOWU5ZmNjYzAxZDIzMDcwNzljNDk5OTcyNDFlNTZlNzU0IiwiaWQiOjZ9.ZnL7fgWfA6bCBU_BLakP_ejyAD71hLXufePExB1p-ps"
  };

  console.log("Querying with variables:", variables);

  return fetch({
    query,
    variables
  });
};

export default queryAPI;

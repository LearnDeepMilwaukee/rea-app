/**
 * Contains the query and Apollo connection to create
 * a new Economic Event
 *
 * @author Connor Hibbs <chibbs96@gmail.com>
 * @date Feb 18, 2018
 */

import { connect } from "react-redux";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import EconomicEventFragment from "./EconomicEvent.tsx";

/**
 * This is the graphQL mutation that will create the Economic Event.
 * Notice that this can be entered into the query window gor GraphiQL
 * and it will execute. The query is defined as a Javascript template
 * using the back ticks `` instead of quotes. It brings in all variables
 * by defining them with the $ in the header, and then references them
 * in the query. The variables are injected using Apollo before it is
 * sent. Notice at the end the ${EconomicEventFragment}. This is bringing
 * in the fragment defined at ./EconomicEvent.tsx. By using the fragment,
 * we don't need to redefine what we want back from an EconomicEvent. The
 * syntax for inserting the fragment, ${}, is part of the Javascript
 * template and is not unique to Apollo. To use the fragment, notice
 * that you just reference the name of the fragment, as it was defined in
 * EconomicEvent, preceded by ...
 */
export const mutation = gql`
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
        ...economicEventInterface
      }
    }
  }
${EconomicEventFragment}
`;

/**
 * Compose returns a function that allows a React component to be
 * "decorated" by this mutation. It puts the mutation form into the
 * props of that component, and then it can be executed with the
 * correct variables once they are known.
 *
 * The compose function can accept any number of sub functions, and
 * executes them in reverse order. So graphql is executed before connect.
 */
export default compose(
  /**
   * Connect reaches out to the app data store and fetches
   * the active login token (using the current app state) and
   * injects that as the token variable in the mutation.
   */
  connect(state => ({
    token: state.getUserInfo.currentUserToken
  })),
  /**
   * The graphql function wraps the GraphQL mutation defined above
   * as an Apollo recognized mutation.
   */
  graphql(mutation)
);

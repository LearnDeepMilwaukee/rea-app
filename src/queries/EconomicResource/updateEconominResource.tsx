/**
 * Contains the mutation to update the properties of an economic resource.
 * This cannot update quantity, that must be done by createEconomicEvent
 *
 * @author Aaron Murphy <murphyad@msoe.edu>
 * @date May 9th, 2019
 */

import { connect } from "react-redux";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import EconomicEventFragment from "./EconomicEvent.tsx";

export const mutation = gql`
  mutation(
    $token: String!,
    $id: Int!,
    $trackingIdentifier: String,
    $note: String,
    $image: String
  ){
    updateEconomicResource (
      token: $token,
      id: $id,
      trackingIdentifier: $trackingIdentifier,
      note: $note,
      image: $image
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
    graphql(mutation,{name:"updateEconomicResource"})
);

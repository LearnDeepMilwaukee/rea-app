/**
 * Gets an Economic Event by its ID
 *
 * @author Connor Hibbs <chibbs96@gmail.com>
 * @date Feb 18, 2018
 */

import { connect } from "react-redux";
import { gql, graphql, compose } from "react-apollo";
import { AppState } from "@vflows/store/types";
import { getActiveLoginToken } from "@vflows/store/selectors/auth";
import { create } from "domain";
import economicEventInterface from "./EconomicEvent.tsx";

export const query = gql`
query($token: String, $id: Int) {
  viewer(token: $token) {
    economicEvent(id: $id) {
      ...economicEventInterface
    }
  }
}
${economicEventInterface}
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
        // passes in the eventId prop as the id variable
        id: props.eventId
      }
    }),

    // Flattens the data: {} object
    props: (
      {
        data: {
          viewer,
          loading,
          error
        }
      }) => ({
        economicEvent: viewer ? viewer.economicEvent : null,
        loading,
        error
      }
    ),
  })
);

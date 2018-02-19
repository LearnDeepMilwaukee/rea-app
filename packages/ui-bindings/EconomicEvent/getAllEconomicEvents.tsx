/**
 * Gets all of the Economic Events in the database
 *
 * @author Connor Hibbs <chibbs96@gmail.com>
 * @date Feb 18, 2018
 */

import { connect } from "react-redux";
import { gql, graphql, compose } from "react-apollo";
import { AppState } from "@vflows/store/types";
import { getActiveLoginToken } from "@vflows/store/selectors/auth";
import economicEventInterface from "./EconomicEvent.tsx";

const query = gql`
query($token: String) {
  viewer(token: $token) {
    allEconomicEvents {
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
        ...props.variables
        // Could include more variables here.
        // Variables are passed in through props
      }
    }),

    // Flattens the data: {} object and stores the elements in props
    props: (
      {
        data: {
          viewer,
          loading,
          error
        }
      }) => ({
        economicEvents: viewer ? viewer.allEconomicEvents : null,
        loading,
        error
      }
    ),
  })
);

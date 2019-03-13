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

/**
 * Compose returns a function that allows a component to be
 * "decorated" by the results of the query. It inserts the
 * data returned into the props of the component it is decorating.
 */
export default compose(
  /**
   * The connect function reaches out to the Redux data store
   * and fetches the token for the currently logged in user,
   * and injects it into the query
   */
  connect(state => ({
    variables: {
      token: getActiveLoginToken(state)
    }
  })),

  /**
   * The graphql function wraps the query from above into an
   * Apollo query. It accepts other options here as well, such as
   * configuring any variables needed and what to do with the data
   * it receives back.
   */
  graphql(query, {

    /**
     * First, the "options" child of the optional config info.
     * This accepts the props of the component it is decorating.
     * This is how it pulls variables out. If the variables are in
     * the props, it can recognize them by the name provided and inject
     * them into the GraphQL query. In this case, we are pulling in
     * and flattening all of the variables defined in the prop's
     * "variable" object. We are referencing the id specifically because
     * it is located in a different part of the props.
     */
    options: (props) => ({
      variables: {
        ...props.variables,
        // passes in the eventId prop as the id variable
        id: props.eventId
      }
    }),

    /**
     * The props child of the optional config info allows the data to be
     * remapped before going into the props. Since GraphQL returns data
     * excatly as it was requested, it would return "data" ->"viewer" ->
     * "economicEvent" -> {The data we actually want}. We are able to flatten
     * data into the viewer, loading, and error, and then further flatten the
     * viewer so the final data being sent back is {economicEvent, loading, error}.
     *
     * This makes it easier to grab the data after the call.
     */
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

/**
 * A method to get a single Plan
 *
 * @package: REA app
 * @author:  Ryan Guinn <guinnrd@msoe.edu>
 * @since:   2018-2-19
 */

import { connect } from "react-redux";
import { gql, graphql, compose } from "react-apollo";

import { AppState } from "@vflows/store/types.js";
import { getActiveLoginToken } from "@vflows/store/selectors/auth.js";

import { planInterface } from "./planInterface";

const query = gql`
query($token: String, $PlanId: Int) {
  viewer(token: $token) {
    plan(id: $PlanId){
      ...planInterface
    }
  }
}
${planInterface}
`;

export default compose(
  // bind input data from the store
  connect((state: AppState) => ({
    variables: {
      token: getActiveLoginToken(state),
    },
  })),

  graphql(query, {
    // read query vars into query from input data above
    options: (props) => (
      {
        variables: {
          ...props.variables,
          PlanId: props.planId
        }
      }),

    // transform output data
    props: ({ ownProps, data: { viewer, loading, error } }) => (
      {
        loading,
        error,
        plan: viewer ? viewer.plan : null,
      }),
  })
);

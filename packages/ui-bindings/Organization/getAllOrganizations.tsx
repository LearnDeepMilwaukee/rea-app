/**
 * A method to get a list of all Organizations
 *
 * @package: REA app
 * @author:  Steven Fontaine <fontainesw@msoe.edu>
 * @since:   2018-02-11
 */

import { connect } from "react-redux";
import { gql, graphql, compose } from "react-apollo";

import { AppState } from "@vflows/store/types.js";
import { getActiveLoginToken } from "@vflows/store/selectors/auth.js";

import { organizationInterface } from "./organizationInterface";

const query = gql`
query($token: String) {
  viewer(token: $token) {
    allOrganizations{
      ...organizationInterface
    }
  }
}
${organizationInterface}
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
    options: (props) => ({ variables: {
        ...props.variables,
      } }),
    // transform output data
    props: ({ ownProps, data: { viewer, loading, error, refetch } }) => (
      {
        loading,
        error,
        refetchAgent: refetch,  // :NOTE: call this in the component to force reload the data
        organizationList: viewer ? viewer.allOrganizations : null,
      }),
  })
);
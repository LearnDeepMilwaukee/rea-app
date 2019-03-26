/**
 * A method to get a list of all Organization types
 *
 * @package: REA app
 * @author:  Connor Hibbs
 * @since:   2018-04-22
 */

import { connect } from "react-redux";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";

const query = gql`
query($token: String) {
  viewer(token: $token) {
    allOrganizationClassifications {
      id
      name
    }
  }
}`;

export default compose(
  // bind input data from the store
  connect((state) => ({
    variables: {
      token: state.getUserInfo.currentUserToken,
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
        organizationClassifications: viewer ? viewer.allOrganizationClassifications : null,
      }),
  })
);

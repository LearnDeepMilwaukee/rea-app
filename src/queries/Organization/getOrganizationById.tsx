/**
 * A method to get a single Organization
 *
 * @package: REA app
 * @author:  Steven Fontaine <fontainesw@msoe.edu>
 * @since:   2018-1-26
 */

import { connect } from "react-redux";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";

import { organizationInterface } from "./organizationInterface";

const query = gql`
query($token: String, $OrganizationId: Int) {
  viewer(token: $token) {
    organization(id: $OrganizationId){
      ...organizationInterface
    }
  }
}
${organizationInterface}
`;

export default compose(
  // bind input data from the store
  connect((state) => ({
    variables: {
      token: state.getUserInfo.currentUserToken,
    },
  })),

  graphql(query, {
    // read query vars into query from input data above
    options: (props) => (
      {
        variables: {
          ...props.variables,
          OrganizationId: props.organizationId
        }
      }),

    // transform output data
    props: ({ ownProps, data: { viewer, loading, error } }) => (
      {
        loading,
        error,
        organization: viewer ? viewer.organization : null,
      }),
  })
);

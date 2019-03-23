/**
 * A method to get all OrganizationTypes
 *
 * @package: REA app
 * @author:  Ryan Guinn <guinnrd@msoe.edu>
 * @since:   2018-02-04
 */

import { connect } from "react-redux";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";

import { orgTypeInterface } from "./orgTypeInterface";

const query = gql`
query($token: String) {
  viewer(token: $token) {
    organizationTypes{
      ...orgTypeInterface
    }
  }
}
${orgTypeInterface}
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
    options: (props) => ({ variables: {
      ...props.variables,
    } }),
    // transform output data
    props: ({ ownProps, data: { viewer, loading, error, refetch } }) => (
      {
        loading,
        error,
        refetchAgent: refetch,  // :NOTE: call this in the component to force reload the data
        orgTypeList: viewer ? viewer.organizationTypes : null,
      }),
  })
);

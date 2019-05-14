/**
 * A method to get a list of all Organizations
 *
 * @package: REA app
 * @author:  Steven Fontaine <fontainesw@msoe.edu>
 * @since:   2018-02-11
 */

import {connect} from "react-redux";
import {graphql, compose} from "react-apollo";
import gql from "graphql-tag";

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
  connect((state) => ({
    variables: {
      token: state.getUserInfo.currentUserToken
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

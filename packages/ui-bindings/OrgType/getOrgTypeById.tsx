/**
 * A method to get a single OrgType
 *
 * @package: REA app
 * @author:  Ryan Guinn <guinnrd@msoe.edu>
 * @since:   2018-02-04
 */

import { connect } from "react-redux";
import { gql, graphql, compose } from "react-apollo";

import { AppState } from "@vflows/store/types.js";
import { getActiveLoginToken } from "@vflows/store/selectors/auth.js";

import { orgTypeInterface } from "./orgTypeInterface";

const query = gql`
query($token: String, $OrgTypeId: Int) {
  viewer(token: $token) {
    orgType(id: $OrgTypeId){
      ...orgTypeInterface
    }
  }
}
${orgTypeInterface}
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
          OrgTypeId: props.orgTypeId
        }
      }),

    // transform output data
    props: ({ ownProps, data: { viewer, loading, error } }) => (
      {
        loading,
        error,
        orgType: viewer ? viewer.orgType : null,
      }),
  })
)

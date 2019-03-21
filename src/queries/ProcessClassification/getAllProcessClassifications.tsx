/**
 * Used to call the "allProcessClassifications" query from ViewerQuery
 *
 * @package: REA app
 * @author: Nicholas Roth <Lou3797>
 * @since: 2018-1-28
 */

import { connect } from "react-redux";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";


import { processClassificationInterface } from "./processClassificationInterface";

/**
 * The query call
 */
const query = gql`
query($token: String) {
  viewer(token: $token) {
    allProcessClassifications{
      ...processClassificationInterface
    }
  }
}
${processClassificationInterface}
`;

export default compose(
  // Bind input data from the store
  connect((state) => ({
    variables: {
      token: state.getUserInfo.currentUserToken,
    },
  })),

  graphql(query, {
    // Read query vars into query from input data above
    options: (props) => ({ variables: {
      ...props.variables,
    } }),
    // Transform output data
    props: ({ ownProps, data: { viewer, loading, error, refetch } }) => (
      {
        loading,
        error,
        refetchAgent: refetch,  // :NOTE: call this in the component to force reload the data
        processClassifications: viewer ? viewer.allProcessClassifications : null,
      }),
  })
)

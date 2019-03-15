/**
 * Used to call the "ProcessClassifications(id)" query from ViewerQuery
 *
 * @package: REA app
 * @author: Nicholas Roth <Lou3797>
 * @since: 2018-1-28
 */

import { connect } from "react-redux";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import { AppState } from "@vflows/store/types.js";
import { getActiveLoginToken } from "@vflows/store/selectors/auth.js";

import { processClassificationInterface } from "./processClassificationInterface";

/**
 * The query call
 */
const query = gql`
query($token: String, $processClassificationId: Int) {
  viewer(token: $token) {
    processClassification(id: $processClassificationId){
      ...processClassificationInterface
    }
  }
}
${processClassificationInterface}
`;

export default compose(
  // Bind input data from the store
  connect((state: AppState) => ({
    variables: {
      token: getActiveLoginToken(state),
    },
  })),

  graphql(query, {
    // Read query vars into query from input data above
    options: (props) => (
      {
        variables: {
          ...props.variables,
          processClassificationId: props.processClassificationId
        }
      }),

    // Transform output data
    props: ({ ownProps, data: { viewer, loading, error } }) => (
      {
        loading,
        error,
        processClassification: viewer ? viewer.processClassification : null,
      }),
  })
)

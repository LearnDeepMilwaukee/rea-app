/**
 *
 * @package:
 * @author:
 * @since:
 */

import { connect } from "react-redux";
import { gql, graphql, compose } from "react-apollo";

import { AppState } from "@vflows/store/types.js";
import { getActiveLoginToken } from "@vflows/store/selectors/auth.js";

import { processClassificationInterface } from "./processClassification";

const query = gql`
query($token: String, ProcessClassificationId: Int) {
  viewer(token: $token) {
    processClassification(id: $ProcessClassificationId){
      ...processClassificationInterface
    }
  }
}
${processClassificationInterface}
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
          ProcessClassificationId: props.processClassificationId
        }
      }),

    // transform output data
    props: ({ ownProps, data: { viewer, loading, error } }) => (
      {
        loading,
        error,
        processClassification: viewer ? viewer.processClassification : null,
      }),
  })
)

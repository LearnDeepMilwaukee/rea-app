/**
 * A method to get a single Process
 *
 * @package: REA app
 * @author:  Steven Fontaine <fontainesw@msoe.edu>
 * @since:   2018-1-26
 */

import { connect } from "react-redux";
import { gql, graphql, compose } from "react-apollo";

import { AppState } from "@vflows/store/types.js";
import { getActiveLoginToken } from "@vflows/store/selectors/auth.js";

import { processInterface } from "./processInterface";

const query = gql`
query($token: String, $ProcessId: Int) {
  viewer(token: $token) {
    process(id: $ProcessId){
      ...processInterface
    }
  }
}
${processInterface}
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
          ProcessId: props.processId
        }
      }),

    // transform output data
    props: ({ ownProps, data: { viewer, loading, error } }) => (
      {
        loading,
        error,
        process: viewer ? viewer.process : null,
      }),
  })
);

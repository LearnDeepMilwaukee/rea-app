/**
 * A method to get all Agent Relationships
 *
 * @package: REA app
 * @author:  Steven Fontaine <fontainesw@msoe.edu>
 * @since:   2018-02-02
 */

import { connect } from "react-redux";
import { gql, graphql, compose } from "react-apollo";

import { AppState } from "@vflows/store/types.js";
import { getActiveLoginToken } from "@vflows/store/selectors/auth.js";

import { agentRelationshipInterface } from "./agentRelationshipInterface";

const query = gql`
query($token: String) {
  viewer(token: $token) {
    allAgentRelationships{
      ...agentRelationshipInterface
    }
  }
}
${agentRelationshipInterface}
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
        agentRelationshipList: viewer ? viewer.allAgentRelationships : null,
      }),
  })
);

/**
 * A method to get one Agent Relationship given its Id
 *
 * @package: REA app
 * @author:  Steven Fontaine <fontainesw@msoe.edu>
 * @since:   2018-02-03
 */

import { connect } from "react-redux";
import { gql, graphql, compose } from "react-apollo";

import { AppState } from "@vflows/store/types.js";
import { getActiveLoginToken } from "@vflows/store/selectors/auth.js";

import { agentRelationshipInterface } from "./agentRelationshipInterface";

const query = gql`
query($token: String, $AgentRelationshipId: Int) {
  viewer(token: $token) {
    agentRelationship(id: $AgentRelationshipId){
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
        AgentRelationshipId: props.agentRelationshipId
      } }),
    // transform output data
    props: ({ ownProps, data: { viewer, loading, error, refetch } }) => (
        {
          loading,
          error,
          refetchAgent: refetch,  // :NOTE: call this in the component to force reload the data
          agentRelationship: viewer ? viewer.agentRelationship : null,
        }),
  })
)

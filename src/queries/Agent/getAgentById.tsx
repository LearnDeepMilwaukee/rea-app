/**
 * A method to get a single Agent
 *
 * @package: REA app
 * @author:  Steven Fontaine <fontainesw@msoe.edu>
 * @since:   2018-1-26
 */

import { connect } from "react-redux";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";

import { agentInterface } from "./agentInterface";

const query = gql`
query($token: String, $AgentId: Int) {
  viewer(token: $token) {
    agent(id: $AgentId){
      ...agentInterface
    }
  }
}
${agentInterface}
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
          AgentId: props.agentId
        }
      }),

    // transform output data
    props: ({ ownProps, data: { viewer, loading, error } }) => (
      {
        loading,
        error,
        agent: viewer ? viewer.agent : null,
      }),
  })
);

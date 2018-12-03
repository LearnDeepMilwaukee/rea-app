/**
 * Contains the query and Apollo connection to create
 * a new Inactive User
 *
 * @author Michael Larson <larsonme@msoe.edu
 * @date December 3, 2018
 */


import { connect } from "react-redux";
import { gql, graphql, compose } from "react-apollo";
import { getActiveLoginToken } from "@vflows/store/selectors/auth";
import { coreAgentFields } from '../_fragments/Agent'

export const mutation = gql`
  mutation(
    $token: String!,
    $username: String!,
    $email: String!
    $pswd: String!
  ) {
    $token: String!,
    $username: String!,
    $email: String!
    $pswd: String!
    ) {
      inactiveUser {
        ...coreAgentFields
        email
        username
        pswd
      }
    }
  }
${coreAgentFields}
`;

export default compose(
  connect(state => ({
    token: getActiveLoginToken(state)
  })),
  graphql(mutation)
);

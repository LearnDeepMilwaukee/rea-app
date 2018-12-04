/**
 * Contains the query and Apollo connection to create
 * a new Inactive User
 *
 * @author Michael Larson <larsonme@msoe.edu
 * @date December 3, 2018
 */


import {connect} from "react-redux";
import {gql, graphql, compose} from "react-apollo";
import {getActiveLoginToken} from "@vflows/store/selectors/auth";

export const query = gql`
  query(
    $token: String!,
    $username: String!,
    $email: String!,
    $pswd: String!
  ) {
  viewer(token: $token){
    createInactiveUser (
      username: $username,
      email: $email,
      pswd: $pswd
    ) {
      inactiveUser {
        email
        username
        pswd
      }
    }
  }
 }
`;

export default compose(
  connect(state => ({
    token: getActiveLoginToken(state)
  })),
  graphql(query)
);

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
import {AppState} from "@vflows/store/types.js";
import { inactiveUserInterface } from "./inactiveUserInterface";


export const query = gql`
  query($token: String, $username: String, $email: String, $pswd: String) {
    viewer(token: $token) {
      createInactiveUser(username: $username, email: $email, pswd: $pswd){
         token
      }
    }
  }
  ${inactiveUserInterface}
`;

export default compose(
  connect(state => ({
    token: getActiveLoginToken(state)
  })),
  graphql(query, {
    // read query vars into query from input data above

    options: (props) => (
      {
        variables: {
          username: props.username,
          email: props.email,
          pswd: props.pswd
        }
      }),

    props: (
      {
        data: {
          viewer,
          loading,
          error
        }
      }) => ({
        token: viewer ? viewer.token : null,
        loading,
        error
      }
    ),
  })
);

/**
 * Contains the query and Apollo connection to determine if an email is already in the database
 *
 * @author Michael Larson <larsonme@msoe.edu
 * @date December 10, 2018
 */


import {connect} from "react-redux";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import {AppState} from "@vflows/store/types.js";


export const query = gql`
  query($token: String!, $email: String!) {
    viewer(token: $token) {
      emailExists(email: $email)
    }
  }
`;

export default compose(
  graphql(query, {
    // read query vars into query from input data above

    options: (props) => (
      {

        variables: {
          token: props.token,
          email: props.email,
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
        emailExists: viewer ? viewer.emailExists : false,
        loading,
        error
      }
    ),
  })
);

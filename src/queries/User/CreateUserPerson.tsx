/**
 * Contains the query and Apollo connection to create
 * a new Inactive User
 *
 * @author Michael Larson <larsonme@msoe.edu
 * @date December 3, 2018
 */


import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";


export const query = gql`
  query($token: String!, $username: String!, $email: String!, $pswd: String!, $phone: String, $name: String!, $image: String) {
    viewer(token: $token) {
      createUserPerson(username: $username, email: $email, pswd: $pswd, phone: $phone, name: $name, image: $image)
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
          username: props.username,
          email: props.email,
          pswd: props.pswd,
          phone: props.phone,
          name: props.name,
          image: props.image
        }
      }),

    props: (
      {
        data: {
          viewer,
          error,
        }
      }) => ({
        createUserPersonVar: viewer ? viewer.createUserPerson : null,
        error,
      }
    ),
  })
);

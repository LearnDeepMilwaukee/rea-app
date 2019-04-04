import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";


export const query = gql`
  query($token: String!, $username: String!) {
    viewer(token: $token) {
      usernameExists(username: $username)
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
                usernameExists: viewer ? viewer.usernameExists : false,
                loading,
                error
            }
        ),
    })
);

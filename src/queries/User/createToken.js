import {graphql, compose} from "react-apollo";
import gql from "graphql-tag";

export const mutation = gql`
  mutation(
    $username: String!,
    $password: String!
  ) {
        createToken (
            username: $username,
            password: $password
        ) {
            token
        }
    }
`;

export default compose(
    graphql(mutation, {name:"createToken"}),
);
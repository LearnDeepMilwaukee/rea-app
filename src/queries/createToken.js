import {graphql, compose} from "react-apollo";
import gql from "graphql-tag";

export const mutation = gql`
  mutation(
    $username: String!,
    $password: String!
  ) {
    createOrganization (
      username: $username,
      password: $password
    ) {
      token
      }
    }
`;

export default compose(
    graphql(mutation, {
        // read query vars into query from input data above
        options: (props) => ({
            variables: {
                username: props.username,
                password: props.password
            }
        }),
        // transform output data
        props: ({ownProps, data: {viewer, loading, error, refetch}}) => (
            {
                loading,
                error,
                refetchAgent: refetch,  // :NOTE: call this in the component to force reload the data
                organizationList: viewer ? viewer.allOrganizations : null,
            }), name:"createToken",
    })
);
import {graphql, compose} from "react-apollo";
import gql from "graphql-tag";

export const mutation = gql`
  mutation(
    $token: String!,
    $type: String!,
    $name: String!,
    $image: String,
    $note: String,
    $primaryLocationId: Int
  ) {
    createOrganization (
      token: $token,
      type: $type,
      name: $name
      image: $image,
      note: $note,
      primaryLocationId: $primaryLocationId
    ) {
      organization {
        id,
        name
      }
    }
  }
`;

export default compose(
    graphql(mutation, {
        // read query vars into query from input data above
        options: (props) => ({
            variables: {
                token: props.token,
            }
        }),
        // transform output data
        props: ({ownProps, data: {viewer, loading, error, refetch}}) => (
            {
                loading,
                error,
                refetchAgent: refetch,  // :NOTE: call this in the component to force reload the data
                organizationList: viewer ? viewer.allOrganizations : null,
            }), name:"createOrganizationMutation",
    })
);

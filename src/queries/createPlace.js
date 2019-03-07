import {graphql, compose} from "react-apollo";
import gql from "graphql-tag";

export const mutation = gql`
  mutation(
    $token: String!,
    $name: String!,
    $latitude: Float!,
    $note: String,
    $address: String!,
    $longitude: Float!
  ) {
    createPlace (
      token: $token,
      name: $name,
      latitude: $latitude,
      note: $note,
      address: $address,
      longitude: $longitude
    ){
      place{
        id
      }
    }
  }`;

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
            }), name:"createLocationMutation",
    })
);

import {graphql, compose} from "react-apollo";
import gql from "graphql-tag";

const query = gql`
query($token: String) {
  viewer(token: $token) {
    organizationTypes{
    id,
    name
    }
  }
}
`;

export default compose(
    graphql(query, {
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
                orgTypeList: viewer ? viewer.organizationTypes : null,
            }),
    })
);
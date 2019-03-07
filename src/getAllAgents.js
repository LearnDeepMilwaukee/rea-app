import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";




const query = gql`
query($token: String) {
  viewer(token: $token) {
    allAgents{
     id,
     name
    }
  }
}
`;

export default compose(

    graphql(query, {
        // read query vars into query from input data above
        options: (props) => ({ variables: {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNvbm5vciIsImlhdCI6MTU1MTg0ODI3MSwicGFzc3dvcmQiOiI3YzA4ODliOWU5ZmNjYzAxZDIzMDcwNzljNDk5OTcyNDFlNTZlNzU0IiwiaWQiOjZ9.unIuk6g8HcmyIuF1sONrLAiftApTlcuqMWWLO6DtqUQ",
        } }),
        // transform output data
        props: ({ ownProps, data: { viewer, loading, error, refetch } }) => (
            {
                loading,
                error,
                refetchAgent: refetch,  // :NOTE: call this in the component to force reload the data
                agent: viewer ? viewer.allAgents : null,
            }),
    })
);
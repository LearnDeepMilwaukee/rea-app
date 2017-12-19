// import { connect } from "react-redux"
//  import { gql, graphql, compose } from "react-apollo"
import { AppState } from "@vflows/store/types"
import { getActiveLoginToken } from "@vflows/store/selectors/auth"
import { createApolloFetch } from "apollo-fetch";

let fetch = createApolloFetch({uri: "http://localhost:8000/api/graph"});

/**
 * This is the GraphQL query. The entire thing is wrapped
 * in tick marks (``) with the gql took from react-apollo.
 *
 * The parentheses allow for arguments to be accepted into
 * the query. In this case, it needs a user token to
 * authenticate you to use the database.
 */
export const createEconomicEvent = `
mutation($token: String){
  viewer(token: $token) {
    createEconomicEvent (
    
    
    )
  }
}
`;

export const allEconomicEvents = `
query($token: String) {
  viewer(token: $token) {
    allEconomicEvents {
      id
      note
    }
  }
}
`;

const queryAPI = (query = allEconomicEvents, options?: Object) => {
  console.log("Received", options, "as options");
  return fetch({
    query,
    variables: {
      ...options,
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNvbm5vciIsImlhdCI6MTUxMjAxNjMzNSwicGFzc3dvcmQiOiI3YzA4ODliOWU5ZmNjYzAxZDIzMDcwNzljNDk5OTcyNDFlNTZlNzU0IiwiaWQiOjZ9.ZnL7fgWfA6bCBU_BLakP_ejyAD71hLXufePExB1p-ps"
    }
  });
};

export default queryAPI;

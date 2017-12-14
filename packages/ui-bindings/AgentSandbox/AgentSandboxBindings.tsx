import { connect } from "react-redux"
import { gql, graphql, compose } from "react-apollo"
import { AppState } from "@vflows/store/types"
import { getActiveLoginToken } from "@vflows/store/selectors/auth"
import { createApolloFetch } from "apollo-fetch";

let fetch = createApolloFetch({uri: "localhost:8080/api"});

/**
 * Fragment example to illustrate designing re-usable
 * components. In this example. the properties of the
 * AgentRelationshipRole. This fragment can be expanded
 * in the query.
 */
// export const agentRelationshipRole = `
// fragment agentRelationshipRole on AgentRelationshipRole {
//   id
//   label
//   inverseLabel
//   category
// }`;

/**
 * This is the GraphQL query. The entire thing is wrapped
 * in tick marks (``) with the gql took from react-apollo.
 *
 * The parentheses allow for arguments to be accepted into
 * the query. In this case, it needs a user token to
 * authenticate you to use the database.
 */
const query = `
query($id: Int, $token: String){
  viewer(token: $token) {
    agentRelationshipRole(id: $id) {
      id
      label
      inverseLabel
      category
    }
  }
}`;
// #${agentRelationshipRole}

// /**
//  * This is a Typescript interface. It works the same
//  * way as an interface in Java, except this defines
//  * attributes instead of methods. You can use it in
//  * Typescript to make your variables strongly
//  * typed and give the compiler a way to help you
//  */
// export interface AgentRelationshipRole {
//   id: number
//   label: String
//   inverseLabel: String
//   category: number
// }

// const variables = {
//   token: getActiveLoginToken(state),
//   id: 5
// };

// // Actually query the database with the variables we need
// fetch({query, variables}).then(result => {
//   // Different way of extracting data, error, and extensions from result
//   const {data, error, extensions} = result;
// }).catch(error => {
//   // Print out any errors that are encountered
//   console.log("Network Error:", error);
// })

/**
 * This is the part of the binding that connects to the
 * database, authenticates you, and allows the query to be
 * executed.
 *
 * It takes two arguments. The first is the function to
 * connect to the database / API and can take in variables
 * which will be _attempted_ to fit into the query.
 *
 * The second is the query object which defines what can go
 * into the query, and the expected format of the data that
 * comes out of the query. In the last props section, you
 * can define the JSON object it should return to the front end
 */
// export default compose(
//   connect((state: Appstate) => ({
//     variables: {
//       token: getActiveLoginToken(state),
//       id: 4
//     },
//   })),
//
//   graphql(query, {
//     options: (props) => ({ variables: {
//       ...props.variables,
//     }}),
//     props: ({ownProps, data: {viewer, loading, error, refetch }}) => (
//       {
//         loading,
//         error,
//         refetchAgent: refetch,
//         roles: viewer ? viewer.agentRelationshipRole : null,
//       }
//     ),
//   })
// );

function queryAPI(options: Object) {
  return fetch(query, {...options, token: getActiveLoginToken(AppState)});
}

export default queryAPI;

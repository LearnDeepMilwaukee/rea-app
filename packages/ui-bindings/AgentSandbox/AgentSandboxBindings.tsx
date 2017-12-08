import { connect } from "react-redux"
import { gql, graphql, compose } from "react-apollo"
import { AppState } from "@vflows/store/types"
import { getActiveLoginToken } from "@vflows/store/selectors/auth"

export const agentRelationshipRole = gql`
fragment agentRelationshipRole on AgentRelationshipRole {
  id
  label
  inverseLabel
  category
}`;

/**
 * This is a Typescript interface. It works the same
 * way as an interface in Java,  * except this defines
 * attributes instead of methods. You can use it in
 * Typescript to make your variables strongly
 * typed and give the compiler a way to help you
 */
export interface AgentRelationshipRole {
  id: number
  label: String
  inverseLabel: String
  category: number
}

// # ...agentRelationshipRole

/**
 * This is the GraphQL query. The entire thing is wrapped
 * in tick marks (``) with the gql took from react-apollo.
 *
 * The parentheses allow for arguments to be accepted into
 * the query. In this case, it needs a user token to
 * authenticate you to use the database.
 */
const query = gql`
query($id: Int = 5, $token: String){
  viewer(token: $token) {
    agentRelationshipRole(id: $id) {
      id
      label
      inverseLabel
      category
    }
  }
}
`;

/*
const query = gql`
query($id: Int = 4, $token: String) {
  #viewer(token: $token) {
    agentRelationshipRole(id: $id) {
      id
      label
      inverseLabel
      category
    }
  #}
}
`;
 */

// ${agentRelationshipRole}




//
// const introspectiveQuery = gql`
// query IntrospectionQuery {
//   __schema {
//     queryType {
//       name
//     }
//     mutationType {
//       name
//     }
//     subscriptionType {
//       name
//     }
//     types {
//     ...FullType
//     }
//     directives {
//       name
//       description
//       args {
//       ...InputValue
//       }
//       onOperation
//       onFragment
//       onField
//     }
//   }
// }
// ${FullType}
// ${InputValue}
// `;
//
// const FullType = gql`
// fragment FullType on __Type {
//   kind
//   name
//   description
//   fields(includeDeprecated: true) {
//     name
//     description
//     args {
//     ...InputValue
//     }
//     type {
//     ...TypeRef
//     }
//     isDeprecated
//     deprecationReason
//   }
//   inputFields {
//   ...InputValue
//   }
//   interfaces {
//   ...TypeRef
//   }
//   enumValues(includeDeprecated: true) {
//     name
//     description
//     isDeprecated
//     deprecationReason
//   }
//   possibleTypes {
//   ...TypeRef
//   }
// }
// ${InputValue}
// ${TypeRef}
// `;
//
// const InputValue = gql`
// fragment InputValue on __InputValue {
//   name
//   description
//   type {
//   ...TypeRef
//   }
//   defaultValue
// }
// ${TypeRef}
// `;
//
// const TypeRef = gql`
// fragment TypeRef on __Type {
//   kind
//   name
//   ofType {
//     kind
//     name
//     ofType {
//       kind
//       name
//       ofType {
//         kind
//         name
//       }
//     }
//   }
// }
// `;
//
//






export default compose(
  connect((state: Appstate) => ({
    variables: {
      token: getActiveLoginToken(state),
      id: 4
    },
  })),

  graphql(query, {
    options: (props) => ({ variables: {
      ...props.variables,
    }}),
    props: ({ownProps, data: {viewer, loading, error, refetch }}) => (
      console.log(loading, error),
      {
        loading,
        error,
        refetchAgent: refetch,
        roles: viewer ? viewer.agentRelationshipRole : null,
      }
    ),
  })
);

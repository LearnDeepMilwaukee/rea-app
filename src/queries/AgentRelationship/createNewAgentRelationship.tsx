/**
 * Contains the query and Apollo connection to create a new Organization relationship
 *
 * @author Donal Moloney <Moloneda@msoe.edu>
 * @date 4/5/19
 */

import { connect } from "react-redux";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import { agentRelationshipInterface } from "./agentRelationshipInterface";

export const mutation = gql`
  mutation(
      $objectId: Int!,
      $relationshipId: Int!,
      $token: String!,
      $subjectId: Int!,
      $note: String
  ){
   createAgentRelationship(
      objectId: $objectId,
      relationshipId: $relationshipId,
      token: $token,
      subjectId: $subjectId,
      note: $note
  ){
    agentRelationship{
        ...agentRelationshipInterface
    }
  }
}
${agentRelationshipInterface}
`;

// export default compose(
//     connect(state => ({
//         token: state.getUserInfo.currentUserToken
//     })),
//     graphql(mutation, {
//         name: "createAgentRelationship"
//     })
// );
export default compose(
    /**
     * Connect reaches out to the app data store and fetches
     * the active login token (using the current app state) and
     * injects that as the token variable in the mutation.
     */
    connect(state => ({
        token: state.getUserInfo.currentUserToken
    })),
    /**
     * The graphql function wraps the GraphQL mutation defined above
     * as an Apollo recognized mutation.
     */
    graphql(mutation)
);
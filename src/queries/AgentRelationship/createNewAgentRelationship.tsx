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
  $note:String,
  $subjectId: Int!,
  $relationshipId: Int!,
  $token: String!,
  $objectId: Int!
){
  createAgentRelationship(
    note: $note,
    subjectId: $subjectId,
    relationshipId: $relationshipId,
    token: $token,
    objectId: $objectId
  ){
    agentRelationship{
        ...agentRelationshipInterface
    }
  }
}
${agentRelationshipInterface}
`;

export default compose(
    connect(state => ({
        token: state.getUserInfo.currentUserToken
    })),
    graphql(mutation, {
        name: "createAgentRelationship"
    })
);

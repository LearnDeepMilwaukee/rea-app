/**
 * Contains the query and Apollo connection to create a new Organization relationship
 *
 * @author Donal Moloney <Moloneyda@msoe.edu>
 * @date 4/5/19
 */

import { connect } from "react-redux";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import { getActiveLoginToken } from "@vflows/store/selectors/auth";
import { agentRelationshipInterface } from "./agentRelationshipInterface";
//The 105 pertains to the backend represents default agent that has to be overwritten or error is thrown
export const mutation = gql`
  mutation(
    $note: String,
    $subjectId: Int = 105,
    $relationshipId: Int = 1,
    $token: String!,
    $objectId: Int = 105
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
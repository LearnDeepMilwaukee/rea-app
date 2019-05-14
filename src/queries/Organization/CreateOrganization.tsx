/**
 * Contains the query and Apollo connection to create
 * a new Organization
 *
 * @author Connor Hibbs <chibbs96@gmail.com>
 * @date April 22, 2018
 */

import { connect } from "react-redux";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import { organizationInterface } from "./organizationInterface";

export const mutation = gql`
  mutation(
    $token: String!,
    $type: String!,
    $name: String!,
    $image: String,
    $note: String
  ) {
    createOrganization (
      token: $token,
      type: $type,
      name: $name,
      image: $image,
      note: $note
    ) {
      organization {
        ...organizationInterface
      }
    }
  }
${organizationInterface}
`;

export default compose(
  connect(state => ({
    token: state.getUserInfo.currentUserToken
  })),
  graphql(mutation,{name:"createOrgMutation"})
);

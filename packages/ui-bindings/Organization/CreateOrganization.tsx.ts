/**
 * Contains the query and Apollo connection to create
 * a new Organization
 *
 * @author Connor Hibbs <chibbs96@gmail.com>
 * @date April 22, 2018
 */

import { connect } from "react-redux";
import { gql, graphql, compose } from "react-apollo";
import { AppState } from "@vflows/store/types";
import { getActiveLoginToken } from "@vflows/store/selectors/auth";
import { organizationInterface } from "./organizationInterface";

export const mutation = gql`
  mutation(
    $token: String!,
    $type: String!,
    $name: String!
  ) {
    createOrganization (
      token: $token,
      type: $type,
      name: $name
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
    token: getActiveLoginToken(state)
  })),
  graphql(mutation)
);

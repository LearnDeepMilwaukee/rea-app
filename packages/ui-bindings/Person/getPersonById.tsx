/**
 * Method to call the person(id) query on Viewer
 *
 * @package: REA app
 * @author:  Nicholas Roth <Lou3797>
 * @since:   2018-02-08
 */

import { connect } from "react-redux";
import { gql, graphql, compose } from "react-apollo";

import { AppState } from "@vflows/store/types.js";
import { getActiveLoginToken } from "@vflows/store/selectors/auth.js";

import { personInterface } from "./personInterface";

const query = gql`
query($token: String, $PersonId: Int) {
  viewer(token: $token) {
    person(id: $PersonId){
      ...personInterface
    }
  }
}
${personInterface}
`;

export default compose(
  // Bind input data from the store
  connect((state: AppState) => ({
    variables: {
      token: getActiveLoginToken(state),
    },
  })),

  graphql(query, {
    // Read query vars into query from input data above
    options: (props) => (
      {
        variables: {
          ...props.variables,
          PersonId: props.personId
        }
      }),

    // Transform output data
    props: ({ ownProps, data: { viewer, loading, error } }) => (
      {
        loading,
        error,
        person: viewer ? viewer.person : null,
      }),
  })
)

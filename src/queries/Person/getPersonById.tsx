/**
 * Method to call the person(id) query on Viewer
 *
 * @package: REA app
 * @author:  Nicholas Roth <Lou3797>
 * @since:   2018-02-08
 */

import { connect } from "react-redux";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";

import { personInterface } from "./personInterface";

const query = gql`
query($token: String, $personId: Int) {
  viewer(token: $token) {
    person(id: $personId){
      ...personInterface
    }
  }
}
${personInterface}
`;

export default compose(
  // Bind input data from the store
  connect((state) => ({
    variables: {
      token: state.getUserInfo.currentUserToken,
    },
  })),

  graphql(query, {
    // Read query vars into query from input data above
    options: (props) => (
      {
        variables: {
          ...props.variables,
          personId: props.personId
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

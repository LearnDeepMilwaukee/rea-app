/**
 * A method to get one EconomicResources
 *
 * @package: REA app
 * @author:  Steven Fontaine <fontainesw@msoe.edu>
 * @since:   2018-02-11
 */

import { connect } from "react-redux";
import { gql, graphql, compose } from "react-apollo";

import { AppState } from "@vflows/store/types.js";
import { getActiveLoginToken } from "@vflows/store/selectors/auth.js";

import { economicResourceInterface } from "./economicResourceInterface";

const query = gql`
query($token: String, $EconomicResourceId: Int) {
  viewer(token: $token) {
    economicResource(id: $EconomicResourceId){
      ...economicResourceInterface
    }
  }
}
${economicResourceInterface}
`;

export default compose(
  // bind input data from the store
  connect((state: AppState) => ({
    variables: {
      token: getActiveLoginToken(state),
    },
  })),

  graphql(query, {
    // read query vars into query from input data above
    options: (props) => ({ variables: {
        ...props.variables,
        EconomicResourceId: props.economicResourceId
      } }),
    // transform output data
    props: ({ ownProps, data: { viewer, loading, error, refetch } }) => (
      {
        loading,
        error,
        refetchAgent: refetch,  // :NOTE: call this in the component to force reload the data
        economicResource: viewer ? viewer.economicResource : null,
      }),
  })
);

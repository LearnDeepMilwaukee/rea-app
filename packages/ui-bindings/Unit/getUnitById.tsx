/**
 * A method to get a single Unit
 *
 * @package: REA app
 * @author:  Steven Fontaine <fontainesw@msoe.edu>
 * @since:   2017-12-04
 */

import { connect } from 'react-redux';
import { gql, graphql, compose} from 'react-apollo';

import { AppState } from '@vflows/store/types.tsx';
import { getActiveLoginToken } from '@vflows/store/selectors/auth.tsx';

import { unitInterface } from "./unit";

const query = gql`
query($token: String, $UnitId: Int) {
  viewer(token: $token) {
    unit(id: $UnitId){
      ...unitInterface
    }
  }
}
${unitInterface}
`

export default compose(
  // bind input data from the store
  connect((state: AppState) => ({
    variables: {
      token: getActiveLoginToken(state),
    },
  })),

  graphql(query, {
    // read query vars into query from input data above
    options: (props) => (
      {
          variables: {
          ...props.variables,
            UnitId: props.unitId
        }
        }),

    // transform output data
    props: ({ ownProps, data: { viewer, loading, error } }) => (
        {
          loading,
          error,
          unit: viewer ? viewer.unit : null,
        }),
  })
)

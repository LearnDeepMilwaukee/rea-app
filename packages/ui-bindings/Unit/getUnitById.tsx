/**
 * A method to get all Units
 *
 * @package: REA app
 * @author:  Steven Fontaine <fontainesw@msoe.edu>
 * @since:   2017-12-04
 */

import { connect } from 'react-redux'
import { gql, graphql, compose } from 'react-apollo'

import { AppState } from '@vflows/store/types'
import { getActiveLoginToken } from '@vflows/store/selectors/auth'

import { unitInterface } from "./unit";

const query = gql`
query($token: String) {
  viewer(token: $token) {
    Unit(id: 4){
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
    options: (props) => ({ variables: {
        ...props.variables,
        //unitId: props.unitId
      } }),
    // transform output data
    props: ({ ownProps, data: { viewer, loading, error, refetch } }) => (
      console.log("viewer: ", viewer, "\nerror: ", error),
        {
          loading,
          error,
          refetchAgent: refetch,  // :NOTE: call this in the component to force reload the data
          unitList: viewer ? viewer.allUnits : null,
        }),
  })
)

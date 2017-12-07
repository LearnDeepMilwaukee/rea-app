/**
 * A method to get a Unit
 *
 * @package: REA app
 * @author:  Steven Fontaine <fontainesw@msoe.edu>
 * @since:   2017-12-04
 */

import { connect } from 'react-redux'
import { gql, graphql, compose } from 'react-apollo'

import { AppState } from '@vflows/store/types'
import { getActiveLoginToken } from '@vflows/store/selectors/auth'

export const unitInterface = gql`
fragment unitInterface on Unit {
  id
  name
  symbol
}`


const query = gql`
query($token: String) {
  viewer(token: $token) {
    allUnits{
      ...unitInterface
    }
  }
}
${unitInterface}
`

export interface Unit {
  id: number
  name: String
  symbol: String
}

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

/**
 * A method to get all Units
 *
 * @package: REA app
 * @author:  Steven Fontaine <fontainesw@msoe.edu>
 * @since:   2017-12-04
 */

import { connect } from 'react-redux'
import { gql, graphql, compose} from 'react-apollo'

import { AppState } from '@vflows/store/types'
import { getActiveLoginToken } from '@vflows/store/selectors/auth'

import { quantityValueInterface } from "./quantityValue";

const query = gql`
query($token: String, $QuantityValueId: Int) {
  viewer(token: $token) {
    quantityValue(id: $QuantityValueId){
      ...quantityValueInterface
    }
  }
}
${quantityValueInterface}
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
          QuantityValueId: props.quantityValueId
        }
      }),

    // transform output data
    props: ({ ownProps, data: { viewer, loading, error } }) => (
      console.log('viewer: ', viewer),
      console.log('error: ', error),
      {
        loading,
        error,
        quantityValue: viewer ? {numericValue: viewer.quantityValue.numericValue, unitId: viewer.quantityValue.unit.id} : null,
      }),
  })
)

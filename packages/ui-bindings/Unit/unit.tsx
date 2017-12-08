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

export interface Unit {
  id: number
  name: String
  symbol: String
}

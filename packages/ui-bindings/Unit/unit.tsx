import { gql } from 'react-apollo'

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

import { gql } from 'react-apollo'
import {Unit} from "../Unit/unit";

export const quantityValueInterface = gql`
fragment quantityValueInterface on QuantityValue {
  numericValue
  unit{
    id
  }
}`

export interface QuantityValue {
  numericValue: number
  unit: Unit
}

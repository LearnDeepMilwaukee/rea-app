/**
 * A This file defines common interfaces for the Unit object
 *
 * @package: REA app
 * @author:  Steven Fontaine <fontainesw@msoe.edu>
 * @since:   2017-12-04
 */

import gql from "graphql-tag";
import { Unit } from "../Unit/unitInterface";

export const quantityValueInterface = gql`
fragment quantityValueInterface on QuantityValue {
  numericValue
  unit{
    id
  }
}`;

export interface QuantityValue {
  numericValue: number
  unit: Unit
}

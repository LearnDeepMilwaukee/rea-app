/**
 * A This file defines common interfaces for the EconomicResource object
 *
 * @package: REA app
 * @author:  Steven Fontaine <fontainesw@msoe.edu>
 * @since:   2018-02-05
 */

import { gql } from "react-apollo";
import { QuantityValue } from "../QuantityValue/quantityValueInterface";

export const economicResourceInterface = gql`
fragment economicResourceInterface on EconomicResource {
  id
  resourceClassifiedAs{
    id
  }
  trackingIdentifier
  image
  currentQuantity{
    id
  }
  note
  category
  transfer{
    id
  }
}`;

export interface EconomicResource {
  id: number
  resourceClassifiedAs: number // TODO Replace with ResourceClassification
  trackingIdentifier: String
  image: string
  currentQuantity: QuantityValue
  note: string
  category: string
  transfer: [number] // TODO Replace with Transfer
}

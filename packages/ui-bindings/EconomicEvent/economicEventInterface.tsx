/**
 * A This file defines common interfaces for the EconomicEvent object
 *
 * @package: REA app
 * @author:  Ryan Guinn <guinnrd@msoe.edu>
 * @since:   2018-03-18
 */

import { gql } from "react-apollo";
import { Agent } from "../Agent/agentInterface";
import { Process } from "../Process/processInterface";
import { EconomicResource } from "../EconomicResource/economicResourceInterface";
import { QuantityValue } from "../QuantityValue/quantityValueInterface";

export const economicEventInterface = gql`
fragment economicEventInterface on EconomicEvent {
  id
  action
  inputOf{
    id
  }
  outputOf{
    id
  }
  provider{
    id
  }
  receiver{
    id
  }
  scope{
    id
  }
  affects{
    id
  }
  affectedQuantity{
    id
  }
  start
  url
  requestDistribution
  note
  fulfills{
    id
  }
}`;

export interface EconomicEvent {
  id: number
  action: string
  inputOf: Process
  outputOf: Process
  provider: Agent
  receiver: Agent
  scope: Agent
  affects: EconomicResource
  affectedQuantity: QuantityValue
  start: string
  url: string
  requestDistribution: boolean
  note: string
  fulfills: any // TODO: replace with [Fulfillment]
}

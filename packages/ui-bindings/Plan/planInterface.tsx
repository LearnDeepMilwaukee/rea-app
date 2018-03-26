/**
 * A This file defines common interfaces for the Plan object
 *
 * @package: REA app
 * @author:  Ryan Guinn <guinnrd@msoe.edu>
 * @since:   2018-02-19
 */

import { gql } from "react-apollo";
import { Agent } from "../Agent/agentInterface";
import { Process } from "../Process/processInterface";
import { EconomicEvent } from "../EconomicEvent/econmicEventInterface";

export const planInterface = gql`
fragment planInterface on Plan {
  id
  name
  plannedOn
  due
  note
  scope{
    id
  }
  planProcesses{
    id
  }
  workingAgents{
    id
  }
  plannedNonWorkInputs{
    id
  }
  plannedOutputs{
    id
  }
  nonWorkInputs{
    id
  }
  outputs{
    id
  }
}`;

export interface Plan {
  id: number
  name: string
  plannedOn: string
  due: string
  note: string
  scope: [Agent]
  planProcesses: [Process]
  workingAgents: [Agent]
  plannedNonWorkInputs: any // TODO: replace with [Commitment]
  plannedOutputs: any // TODO: replace with [Commitment]
  nonWorkInputs: [EconomicEvent]
  outputs: [EconomicEvent]
}

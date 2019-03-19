/**
 * A This file defines common interfaces for the Process object
 *
 * @package: REA app
 * @author:  Steven Fontaine <fontainesw@msoe.edu>
 * @since:   2018-02-12
 */

import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import { Agent } from "../Agent/agentInterface";
import { Plan } from "../Plan/planInterface";
import EconomicEvent from "../../app/pages/EconomicEvent/EconomicEvent";

export const processInterface = gql`
fragment processInterface on Process {
  id
  name
  scope{
    id
  }
  plannedStart
  plannedDuration
  isStarted
  isFinished
  processClassifiedAs{
    id
  }
  note
  inputs{
    id
  }
  outputs{
    id
  }
  unplannedEconomicEvents{
    id
  }
  committedInputs{
    id
  }
  committedOutputs{
    id
  }
  nextProcesses{
    id
  }
  previousProcesses{
    id
  }
  workingAgents{
    id
  }
  processPlan{
    id
  }
}`;

export interface Process {
  id: number
  name: string
  scope: Agent
  plannedStart: string
  plannedDuration: string
  isStarted: boolean
  isFinished: boolean
  processClassifiedAs: any // TODO: change to process classification
  note: string
  inputs: any // TODO: replace with [EconomicEvent]
  outputs: any // TODO: replace with [EconomicEvent]
  unplannedEconomicEvents: any // TODO: replace with [EconomicEvent]
  committedInputs: any // TODO: replace with [Commitment]
  committedOutputs: any // TODO: replace with [Commitment]
  nextProcesses: [Process]
  previousProcesses: [Process]
  workingAgents: [Agent]
  processPlan: Plan
}
